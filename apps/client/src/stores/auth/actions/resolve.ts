import config from "../../../config";
import { toast } from "../../../toast";
import { useAuthStore, AuthStatus } from "../auth";
import { client } from "../../../createOAuth2Client";
import { OAuth2Token } from "@badgateway/oauth2-client";

export const resolve = async () => {
  // Get query string
  const query = Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
  );

  // Error check
  if (query.error) {
    useAuthStore.setState({
      status: AuthStatus.LOGGED_OUT,
      pkceState: "",
      codeVerifier: "",
    });
    toast({
      title: "Error",
      description: query.error_description,
      status: "error",
    });
    // Clear query string
    window.history.replaceState({}, "", location.pathname);
    return;
  }

  // If the server returned an authorization code, attempt to exchange it for an access token
  if (query.code) {
    let oauth2Token: OAuth2Token;

    try {
      oauth2Token = await client.authorizationCode.getTokenFromCodeRedirect(
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
          state: useAuthStore.getState().pkceState,
          codeVerifier: useAuthStore.getState().codeVerifier,
        }
      );
    } catch (error) {
      if (error instanceof Error) {
        toast({
          title: "Error",
          description: error?.message,
          status: "error",
        });
      }
      useAuthStore.setState({
        status: AuthStatus.LOGGED_OUT,
        pkceState: "",
        codeVerifier: "",
      });
      // Clear query string
      window.history.replaceState({}, "", location.pathname);
      return;
    }

    useAuthStore.setState({
      token: oauth2Token,
      status: AuthStatus.LOGGED_IN,
      pkceState: "",
      codeVerifier: "",
    });
  } else if (useAuthStore.getState().status === AuthStatus.PENDING) {
    // If the server did not return an authorization code, and we are still pending, set status to logged out
    useAuthStore.setState({
      status: AuthStatus.LOGGED_OUT,
      pkceState: "",
      codeVerifier: "",
    });
  }

  // Clear query string
  window.history.replaceState({}, "", location.pathname);
};
