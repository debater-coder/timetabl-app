import { StoreApi, UseBoundStore, create } from "zustand";
import { persist, devtools, subscribeWithSelector } from "zustand/middleware";
import {
  OAuth2Client,
  OAuth2Fetch,
  OAuth2Token,
  generateCodeVerifier,
} from "@badgateway/oauth2-client";
import { QueryClient } from "@tanstack/react-query";
import config from "../../config";
import HTTPError from "../../errors/HTTPError";
import NetworkError from "../../errors/NetworkError";
import { SbhsApiEndpoint } from "../../services/sbhsApi/schemas";
import { createStandaloneToast } from "@chakra-ui/react";

// ========================
// Browser Crypto Functions
// ========================
// These functions are used to generate PKCE values.

// Generate a secure random string using the browser crypto functions
export const generateRandomString = () => {
  const array = new Uint32Array(28);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
    ""
  );
};

// ========================
// Auth Store
// ========================
// This store is used to manage the authentication state of the application. Think of it like a state machine.

/**
 * The possible authentication statuses.
 */
export enum AuthStatus {
  LOGGED_OUT = "logged-out",
  LOGGED_IN = "logged-in",
  EXPIRED = "expired", // Logged in but token has expired
  PENDING = "pending",
}

/**
 * The possible authentication statuses that are considered logged in.
 */
export const logged_in_states = [AuthStatus.LOGGED_IN, AuthStatus.EXPIRED];

/**
 * The authentication store state.
 */
type AuthState = {
  status: AuthStatus;
  pkceState: string;
  codeVerifier: string;
  token: OAuth2Token | null;
};

const initialState: AuthState = {
  status: AuthStatus.LOGGED_OUT,
  pkceState: "",
  codeVerifier: "",
  token: null,
};

// Create the store with the initial state
export const useAuthStore = create<AuthState>()(
  subscribeWithSelector(
    devtools(
      persist((): AuthState => initialState, {
        name: "auth-storage",
        version: 2,
      })
    )
  )
);

/**
 * Selector to access the authentication status.
 */
export const useAuthStatus = () => useAuthStore((state) => state.status);

/**
 * Selector to access whether logged in or not.
 */
export const useIsLoggedIn = () =>
  useAuthStore((state) => logged_in_states.includes(state.status));

export const resetAuthStore = () => {
  useAuthStore.setState(initialState);
};

export class AuthActions<T extends UseBoundStore<StoreApi<AuthState>>> {
  constructor(
    private authStore: T,
    private queryClient: QueryClient,
    private oauthClient: OAuth2Client,
    private fetchWrapper: OAuth2Fetch,
    private toast: ReturnType<typeof createStandaloneToast>["toast"]
  ) {}

  public async login() {
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
  }

  public async resolve() {
    // Get query string
    const query = Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    );

    // Error check
    if (query.error) {
      this.toast({
        title: "Error",
        description: query.error_description,
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
          this.toast({
            title: "Error",
            description: error?.message,
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
  }

  public logout() {
    // Clear localstorage
    localStorage.clear();

    // Reset query cache
    this.queryClient.clear();

    // Set status to logged out and clear token
    this.authStore.setState({ status: AuthStatus.LOGGED_OUT, token: null });
  }

  public async fetchAuthenticated<TSbhsApiData>(
    endpoint: SbhsApiEndpoint,
    options?: Record<string, string>
  ) {
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

    const json = await res.json();

    // Yay we succeeded...
    document.dispatchEvent(
      new CustomEvent("onlinechange", { detail: { online: true } })
    );
    useAuthStore.setState({ status: AuthStatus.LOGGED_IN });
    return json as TSbhsApiData;
  }
}
