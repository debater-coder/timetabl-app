import { produce } from "immer";
import config from "../../../config";
import { toast } from "../../../toast";
import HTTPError from "../../../errors/HTTPError";
import { useSbhsAuthStore, SbhsAuthStatus } from "../sbhsAuth";

export const resolve = async () => {
  // Get query string
  const query = Object.fromEntries(
    new URLSearchParams(window.location.search).entries()
  );

  // Clear query string
  window.history.replaceState({}, null, location.pathname);

  // Error check
  if (query.error) {
    toast({
      title: query.error,
      description: query.error_description,
      status: "error",
    });
    useSbhsAuthStore.setState(
      produce(useSbhsAuthStore.getState(), (draft) => {
        draft.status = SbhsAuthStatus.LOGGED_OUT;
      })
    );
  }

  // If the server returned an authorization code, attempt to exchange it for an access token
  if (query.code) {
    // Verify state matches what we set at the beginning
    if (useSbhsAuthStore.getState().pkceState !== query.state) {
      useSbhsAuthStore.setState(
        produce(useSbhsAuthStore.getState(), (draft) => {
          draft.status = SbhsAuthStatus.LOGGED_OUT;
        })
      );
      alert(
        "Invalid state! If you are seeing this message it may mean that the authorisation server is FAKE"
      );
      return;
    }

    try {
      // Exchange code for token
      const response = await fetch("/api/token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({
          code: query.code,
          client_id: config.client_id,
          redirect_uri: config.redirect_uri,
          code_verifier: useSbhsAuthStore.getState().codeVerifier,
        }),
      });

      // Throw a HTTP Error if the response is not ok
      if (!response.ok) {
        throw new HTTPError(response.status);
      }

      // Set status to logged in
      useSbhsAuthStore.setState(
        produce(useSbhsAuthStore.getState(), (draft) => {
          draft.status = SbhsAuthStatus.LOGGED_IN;
        })
      );
    } catch {
      // If an error occurs, inform the user
      toast({
        title: "Failed to exchange code for token",
        description: "Please try again",
        status: "error",
      });

      // Set status to logged out
      useSbhsAuthStore.setState(
        produce(useSbhsAuthStore.getState(), (draft) => {
          draft.status = SbhsAuthStatus.LOGGED_OUT;
        })
      );
    } finally {
      // Clear PKCE values
      useSbhsAuthStore.setState(
        produce(useSbhsAuthStore.getState(), (draft) => {
          draft.pkceState = "";
          draft.codeVerifier = "";
        })
      );
    }
  } else if (useSbhsAuthStore.getState().status === SbhsAuthStatus.PENDING) {
    // If the server did not return an authorization code, and we are still pending, set status to logged out
    useSbhsAuthStore.setState(
      produce(useSbhsAuthStore.getState(), (draft) => {
        draft.status = SbhsAuthStatus.LOGGED_OUT;
      })
    );
  }
};
