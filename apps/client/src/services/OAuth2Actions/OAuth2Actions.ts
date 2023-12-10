import config from "../../config";
import { SbhsApiEndpoint } from "../../consumers/sbhsApi/schemas";
import HTTPError from "../../errors/HTTPError";
import NetworkError from "../../errors/NetworkError";
import { AuthActions } from "../../interfaces/AuthActions";
import { FetchWrapper } from "../../interfaces/FetchWrapper";
import { Notifier } from "../../interfaces/Notifier";
import { AuthState, AuthStatus } from "../../stores/auth";
import {
  OAuth2Client,
  generateCodeVerifier,
  OAuth2Token,
} from "@badgateway/oauth2-client";
import { QueryClient } from "@tanstack/react-query";

const generateRandomString = () => {
  const array = new Uint32Array(28);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
    ""
  );
};

interface AuthStore {
  setState: (state: Partial<AuthState>) => void;
  getState: () => AuthState;
}

class OAuth2Actions implements AuthActions {
  constructor(
    private authStore: AuthStore,
    private queryClient: QueryClient,
    private oauthClient: OAuth2Client,
    private fetchWrapper: FetchWrapper,
    private toast: Notifier
  ) {}

  public login = async () => {
    const codeVerifier = await generateCodeVerifier();
    const pkceState = generateRandomString();

    this.authStore.setState({
      codeVerifier,
      pkceState,
      status: AuthStatus.PENDING,
    });

    if (import.meta.env.MODE == "test") return;

    window.location.assign(
      await this.oauthClient.authorizationCode.getAuthorizeUri({
        redirectUri: config.redirect_uri,
        state: pkceState,
        codeVerifier,
        scope: ["all-ro"],
      })
    );
  };

  public resolve = async () => {
    // Get query string
    const query = Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    );

    // Error check
    if (query.error) {
      this.toast.notify({
        title: "Error",
        message: query.error_description,
        status: "error",
      });
      this.authStore.setState({
        status: AuthStatus.LOGGED_OUT,
        pkceState: "",
        codeVerifier: "",
      });
      return;
    }

    // If the server returned an authorization code, attempt to exchange it for an access token
    if (query.code) {
      let oauth2Token: OAuth2Token;

      try {
        oauth2Token =
          await this.oauthClient.authorizationCode.getTokenFromCodeRedirect(
            document.location.toString(),
            {
              /**
               * The redirect URI is not actually used for any redirects, but MUST be the
               * same as what you passed earlier to "authorizationCode"
               */
              redirectUri: config.redirect_uri,

              /**
               * This is optional, but if it's passed then it also MUST be the same as
               * what you passed in the first step.
               *
               * If set, it will verify that the server sent the exact same state back.
               */
              state: this.authStore.getState().pkceState,
              codeVerifier: this.authStore.getState().codeVerifier,
            }
          );
      } catch (error) {
        if (error instanceof Error) {
          this.toast.notify({
            title: "Error",
            message: error?.message,
            status: "error",
          });
        }
        this.authStore.setState({
          status: AuthStatus.LOGGED_OUT,
          pkceState: "",
          codeVerifier: "",
        });
        return;
      }

      // Clear query string
      window.history.replaceState({}, "", location.pathname);

      this.authStore.setState({
        token: oauth2Token,
        status: AuthStatus.LOGGED_IN,
        pkceState: "",
        codeVerifier: "",
      });
    } else if (this.authStore.getState().status === AuthStatus.PENDING) {
      // If the server did not return an authorization code, and we are still pending, set status to logged out
      this.authStore.setState({
        status: AuthStatus.LOGGED_OUT,
        pkceState: "",
        codeVerifier: "",
      });
    }
  };

  public logout = async () => {
    // Clear localstorage
    localStorage.clear();

    // Reset query cache
    this.queryClient.clear();

    // Set status to logged out and clear token
    this.authStore.setState({ status: AuthStatus.LOGGED_OUT, token: null });
  };

  public fetchAuthenticated = async (
    endpoint: SbhsApiEndpoint,
    options?: Record<string, string>
  ) => {
    let res: Response;
    try {
      res = await this.fetchWrapper.fetch(
        "https://student.sbhs.net.au/api/" +
          endpoint +
          "?" +
          new URLSearchParams(options)
      );
    } catch (error) {
      if (error instanceof TypeError) {
        // If we are offline, dispatch a custom event to notify other parts of the application
        document.dispatchEvent(
          new CustomEvent("onlinechange", { detail: { online: false } })
        );
        throw new NetworkError(error.message);
      }

      throw error;
    }

    if (!res.ok) {
      return new HTTPError(res.status);
    }

    const json: unknown = await res.json();

    // Yay we succeeded...
    document.dispatchEvent(
      new CustomEvent("onlinechange", { detail: { online: true } })
    );
    this.authStore.setState({ status: AuthStatus.LOGGED_IN });
    return json;
  };
}

export default OAuth2Actions;
