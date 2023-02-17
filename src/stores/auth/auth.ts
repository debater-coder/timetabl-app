import { create } from "zustand";
import { persist, devtools, subscribeWithSelector } from "zustand/middleware";
import { produce } from "immer";
import config from "../../../config";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "../../toast";
import HTTPError from "../../errors/HTTPError";

// Generate a secure random string using the browser crypto functions
const generateRandomString = () => {
  const array = new Uint32Array(28);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
    ""
  );
};

// Calculate the SHA256 hash of the input text.
// Returns a promise that resolves to an ArrayBuffer
const sha256 = (plain: string) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  return window.crypto.subtle.digest("SHA-256", data);
};

// Base64-urlencodes the input string
const base64urlencode = (str: ArrayBuffer) => {
  // Convert the ArrayBuffer to string using Uint8 array to conver to what btoa accepts.
  // btoa accepts chars only within ascii 0-255 and base64 encodes them.
  // Then convert the base64 encoded to base64url encoded
  //   (replace + with -, replace / with _, trim trailing =)
  return btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

// Return the base64-urlencoded sha256 hash for the PKCE challenge
const pkceChallengeFromVerifier = async (v: string) => {
  const hashed = await sha256(v);
  return base64urlencode(hashed);
};

export enum AuthStatus {
  LOGGED_OUT = "logged-out",
  LOGGED_IN = "logged-in",
  EXPIRED = "expired",
  REFRESHING = "refreshing",
  PENDING = "pending",
}

const logged_in_states = [
  AuthStatus.LOGGED_IN,
  AuthStatus.REFRESHING,
  AuthStatus.EXPIRED,
];

interface AuthState {
  status: AuthStatus;
  pkceState: string;
  codeVerifier: string;
}

const useAuthStore = create<AuthState>()(
  subscribeWithSelector(
    devtools(
      persist(
        () => ({
          status: AuthStatus.LOGGED_OUT,
          pkceState: "",
          codeVerifier: "",
        }),
        {
          name: "auth-storage",
        }
      )
    )
  )
);

export const useAuthStatus = () => useAuthStore((state) => state.status);

export const useIsLoggedIn = () =>
  useAuthStore((state) => logged_in_states.includes(state.status));

export const actions = {
  login: async () => {
    switch (useAuthStore.getState().status) {
      case AuthStatus.LOGGED_OUT:
      case AuthStatus.EXPIRED: {
        useAuthStore.setState(
          produce(useAuthStore.getState(), (draft) => {
            draft.pkceState = generateRandomString();
            draft.codeVerifier = generateRandomString();

            draft.status = AuthStatus.PENDING;
          })
        );

        const code_challenge = await pkceChallengeFromVerifier(
          useAuthStore.getState().codeVerifier
        );

        window.location.href =
          config.authorization_endpoint +
          "?response_type=code" +
          "&client_id=" +
          encodeURIComponent(config.client_id) +
          "&state=" +
          encodeURIComponent(useAuthStore.getState().pkceState) +
          "&scope=" +
          encodeURIComponent(config.scopes) +
          "&redirect_uri=" +
          encodeURIComponent(config.redirect_uri) +
          "&code_challenge=" +
          encodeURIComponent(code_challenge) +
          "&code_challenge_method=S256";
        break;
      }
      default:
        console.warn(
          `Invalid usage of login action with auth status ${
            useAuthStore.getState().status
          }.`
        );
        break;
    }
  },
  logout: async (queryClient: QueryClient) => {
    if (logged_in_states.includes(useAuthStore.getState().status)) {
      await fetch("/api/token", {
        method: "DELETE",
      });
      localStorage.setItem("loggedIn", "false");
      queryClient.clear();
      useAuthStore.setState(
        produce(useAuthStore.getState(), (draft) => {
          draft.status = AuthStatus.LOGGED_OUT;
        })
      );
    } else {
      console.warn(
        `Invalid usage of logout action with auth status ${
          useAuthStore.getState().status
        }.`
      );
    }
  },
  resolve: async () => {
    // Get query
    const query = Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    );

    // Clear query
    window.history.replaceState({}, null, location.pathname);

    // Error check
    if (query.error) {
      toast({
        title: query.error,
        description: query.error_description,
        status: "error",
      });
      useAuthStore.setState(
        produce(useAuthStore.getState(), (draft) => {
          draft.status = AuthStatus.LOGGED_OUT;
        })
      );
    }

    // If the server returned an authorization code, attempt to exchange it for an access token
    if (query.code) {
      // Verify state matches what we set at the beginning
      if (useAuthStore.getState().pkceState !== query.state) {
        throw new Error(
          "Invalid state! If you are seeing this message it may mean that the authorisation server is FAKE"
        );
      }

      try {
        const response = await fetch("/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            code: query.code,
            client_id: config.client_id,
            redirect_uri: config.redirect_uri,
            code_verifier: useAuthStore.getState().codeVerifier,
          }),
        });

        if (!response.ok) {
          throw new HTTPError(response.status);
        }

        useAuthStore.setState(
          produce(useAuthStore.getState(), (draft) => {
            draft.status = AuthStatus.LOGGED_IN;
          })
        );
      } catch {
        toast({
          title: "Failed to exchange code for token",
          description: "Please try again",
          status: "error",
        });
        useAuthStore.setState(
          produce(useAuthStore.getState(), (draft) => {
            draft.status = AuthStatus.LOGGED_OUT;
          })
        );
      } finally {
        useAuthStore.setState(
          produce(useAuthStore.getState(), (draft) => {
            draft.pkceState = "";
            draft.codeVerifier = "";
          })
        );
      }
    } else {
      useAuthStore.setState(
        produce(useAuthStore.getState(), (draft) => {
          draft.status = AuthStatus.LOGGED_OUT;
        })
      );
    }
  },
};
