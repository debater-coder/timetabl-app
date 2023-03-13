import { create } from "zustand";
import { persist, devtools, subscribeWithSelector } from "zustand/middleware";
import { produce } from "immer";
import config from "../../config";
import { QueryClient } from "@tanstack/react-query";
import { toast } from "../../toast";
import HTTPError from "../../errors/HTTPError";
import { SbhsApiEndpoint } from "../../services/sbhsApi/types";
import NetworkError from "../../errors/NetworkError";

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

export enum SbhsAuthStatus {
  LOGGED_OUT = "logged-out",
  LOGGED_IN = "logged-in",
  EXPIRED = "expired",
  REFRESHING = "refreshing",
  PENDING = "pending",
}

const logged_in_states = [
  SbhsAuthStatus.LOGGED_IN,
  SbhsAuthStatus.REFRESHING,
  SbhsAuthStatus.EXPIRED,
];

type AuthState = {
  status: SbhsAuthStatus;
  pkceState: string;
  codeVerifier: string;
};

const useSbhsAuthStore = create<AuthState>()(
  subscribeWithSelector(
    devtools(
      persist(
        () => ({
          status: SbhsAuthStatus.LOGGED_OUT,
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

export const useSbhsAuthStatus = () =>
  useSbhsAuthStore((state) => state.status);

export const useIsLoggedIn = () =>
  useSbhsAuthStore((state) => logged_in_states.includes(state.status));

export const sbhsAuthActions = {
  login: async () => {
    switch (useSbhsAuthStore.getState().status) {
      // Check if valid state to login
      case SbhsAuthStatus.LOGGED_OUT:
      case SbhsAuthStatus.EXPIRED: {
        // Store PKCE values and set status to pending
        useSbhsAuthStore.setState(
          produce(useSbhsAuthStore.getState(), (draft) => {
            draft.pkceState = generateRandomString();
            draft.codeVerifier = generateRandomString();

            draft.status = SbhsAuthStatus.PENDING;
          })
        );

        // Generate PKCE challenge
        const code_challenge = await pkceChallengeFromVerifier(
          useSbhsAuthStore.getState().codeVerifier
        );

        // Redirect to login page with PKCE values
        window.location.href =
          config.authorization_endpoint +
          "?response_type=code" +
          "&client_id=" +
          encodeURIComponent(config.client_id) +
          "&state=" +
          encodeURIComponent(useSbhsAuthStore.getState().pkceState) +
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
        // Warn if invalid usage occurs
        console.warn(
          `Invalid usage of login action with auth status ${
            useSbhsAuthStore.getState().status
          }.`
        );
        break;
    }
  },
  logout: async (queryClient: QueryClient) => {
    // Check if valid state to logout
    if (logged_in_states.includes(useSbhsAuthStore.getState().status)) {
      // Send logout request to server
      await fetch("/api/token", {
        method: "DELETE",
      });

      // Reset query cache
      queryClient.clear();

      // Set status to logged out
      useSbhsAuthStore.setState(
        produce(useSbhsAuthStore.getState(), (draft) => {
          draft.status = SbhsAuthStatus.LOGGED_OUT;
        })
      );
    } else {
      // Warn if invalid usage occurs
      console.warn(
        `Invalid usage of logout action with auth status ${
          useSbhsAuthStore.getState().status
        }.`
      );
    }
  },
  resolve: async () => {
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
  },

  refresh: async () => {
    // Check if valid state to refresh
    switch (useSbhsAuthStore.getState().status) {
      // If we are already refreshing, wait for the refresh to finish
      case SbhsAuthStatus.REFRESHING: {
        const promise = new Promise<void>((resolve, reject) => {
          const unsub = useSbhsAuthStore.subscribe((state) => {
            unsub();
            if (state.status === SbhsAuthStatus.LOGGED_IN) {
              resolve();
            } else if (state.status === SbhsAuthStatus.EXPIRED) {
              reject();
            }
          });
        });
        return promise;
      }
      default:
        if (logged_in_states.includes(useSbhsAuthStore.getState().status)) {
          // Set status to refreshing
          useSbhsAuthStore.setState(
            produce(useSbhsAuthStore.getState(), (draft) => {
              draft.status = SbhsAuthStatus.REFRESHING;
            })
          );
          try {
            const res = await fetch("/api/token", {
              method: "PATCH",
              body: JSON.stringify({
                client_id: config.client_id,
              }),
              headers: {
                "Content-Type": "application/json; charset=UTF-8",
              },
            });

            if (!res.ok) {
              throw new HTTPError(res.status);
            }

            useSbhsAuthStore.setState(
              produce(useSbhsAuthStore.getState(), (draft) => {
                draft.status = SbhsAuthStatus.LOGGED_IN;
              })
            );
          } catch (error) {
            useSbhsAuthStore.setState(
              produce(useSbhsAuthStore.getState(), (draft) => {
                draft.status = SbhsAuthStatus.EXPIRED;
              })
            );
          }
        } else {
          // Warn if invalid usage occurs
          console.warn(
            `Invalid usage of refresh action with auth status ${
              useSbhsAuthStore.getState().status
            }.`
          );
        }
    }
  },
  fetchAuthenticated: async <TSbhsApiData>(
    endpoint: SbhsApiEndpoint,
    options?: Record<string, unknown>,
    depth = 0
  ): Promise<Awaited<TSbhsApiData>> => {
    if (logged_in_states.includes(useSbhsAuthStore.getState().status)) {
      // Declare a new response
      let res: Response;
      try {
        // Fetch to the API
        res = await fetch("/api/api", {
          credentials: "same-origin",
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            endpoint,
            options,
          }),
        });
      } catch (error) {
        console.error("Network error", error);
        if (error instanceof TypeError) {
          // If we are offline, dispatch a custom event to notify other parts of the application
          document.dispatchEvent(
            new CustomEvent("onlinechange", { detail: { online: false } })
          );
        }
        throw new NetworkError(error.message);
      }

      // If we made it this far, we are online
      document.dispatchEvent(
        new CustomEvent("onlinechange", { detail: { online: true } })
      );

      if (!res.ok) {
        const errorText = await res.text();

        switch (errorText) {
          case "REFRESH_TOKEN":
            // If the server returns REFRESH_TOKEN, refresh the token
            await sbhsAuthActions.refresh();
            // After refreshing the token, try again but only one more time
            if (depth < 1) {
              return sbhsAuthActions.fetchAuthenticated(
                endpoint,
                options,
                depth + 1
              );
            }
            break;
          case "SERVER_NOT_AVAILABLE":
            // If the server returns SERVER_NOT_AVAILABLE, act as if we are offline
            document.dispatchEvent(
              new CustomEvent("onlinechange", { detail: { online: false } })
            );
            throw new NetworkError("Server not available");
        }
        if (res.status === 401) {
          // If the server returns 401, switch to expired state
          useSbhsAuthStore.setState(
            produce(useSbhsAuthStore.getState(), (draft) => {
              draft.status = SbhsAuthStatus.EXPIRED;
            })
          );
        }
        throw new HTTPError(res.status);
      }
      const json = await res.json();
      // Since we made it this far, we are logged in
      useSbhsAuthStore.setState(
        produce(useSbhsAuthStore.getState(), (draft) => {
          draft.status = SbhsAuthStatus.LOGGED_IN;
        })
      );
      return json;
    } else {
      // Warn if invalid usage occurs
      console.warn(
        `Invalid usage of fetchAuthenticated action with auth status ${
          useSbhsAuthStore.getState().status
        }.`
      );
    }
  },
};
