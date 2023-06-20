import { create } from "zustand";
import { persist, devtools, subscribeWithSelector } from "zustand/middleware";
import { OAuth2Token } from "@badgateway/oauth2-client";

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

// Create the store with the initial state
export const useAuthStore = create<AuthState>()(
  subscribeWithSelector(
    devtools(
      persist(
        (): AuthState => ({
          status: AuthStatus.LOGGED_OUT,
          pkceState: "",
          codeVerifier: "",
          token: null,
        }),
        {
          name: "auth-storage",
          version: 2,
        }
      )
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
