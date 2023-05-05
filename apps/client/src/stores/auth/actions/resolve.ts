import config from "../../../config";
import { toast } from "../../../toast";
import { useSbhsAuthStore, SbhsAuthStatus } from "../sbhsAuth";
import { client } from "../../../createOAuth2Client";

export const resolve = async () => {
  // Get query string
  const query = Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
  );

  // Error check
  if (query.error) {
    toast({
      title: query.error,
      description: query.error_description,
      status: "error",
    });
    useSbhsAuthStore.setState({ status: SbhsAuthStatus.LOGGED_OUT });
    return;
  }
  // If the server returned an authorization code, attempt to exchange it for an access token
  if (query.code) {
    const oauth2Token = await client.authorizationCode.getTokenFromCodeRedirect(
      document.location as any,
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
        state: useSbhsAuthStore.getState().pkceState,
        codeVerifier: useSbhsAuthStore.getState().codeVerifier,
      }
    );

    // Clear query string
    window.history.replaceState({}, null, location.pathname);

    useSbhsAuthStore.setState({
      token: oauth2Token,
      status: SbhsAuthStatus.LOGGED_IN,
    });
  } else if (useSbhsAuthStore.getState().status === SbhsAuthStatus.PENDING) {
    // If the server did not return an authorization code, and we are still pending, set status to logged out
    useSbhsAuthStore.setState({ status: SbhsAuthStatus.LOGGED_OUT });
  }
};
