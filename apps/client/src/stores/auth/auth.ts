import { OAuth2Token } from "@badgateway/oauth2-client";
import { create } from "zustand";
import { persist, devtools, subscribeWithSelector } from "zustand/middleware";

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
const logged_in_states = [AuthStatus.LOGGED_IN, AuthStatus.EXPIRED];

/**
 * The authentication store state.
 */
export type AuthState = {
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

const resetAuthStore = () => {
  useAuthStore.setState(initialState);
};
