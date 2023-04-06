import { create } from "zustand";
import { persist, devtools, subscribeWithSelector } from "zustand/middleware";
import { login } from "./actions/login";
import { logout } from "./actions/logout";
import { resolve } from "./actions/resolve";
import { refresh } from "./actions/refresh";
import { fetchAuthenticated } from "./actions/fetchAuthenticated";

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
export const pkceChallengeFromVerifier = async (v: string) => {
  const hashed = await sha256(v);
  return base64urlencode(hashed);
};

// ========================
// Auth Store
// ========================
// This store is used to manage the authentication state of the application. Think of it like a state machine.

/**
 * The possible authentication statuses.
 */
export enum SbhsAuthStatus {
  LOGGED_OUT = "logged-out",
  LOGGED_IN = "logged-in",
  EXPIRED = "expired", // Logged in but token has expired
  REFRESHING = "refreshing", // Logged in but token is being refreshed
  PENDING = "pending", // In-between state between logged in and logged out
}

/**
 * The possible authentication statuses that are considered logged in.
 */
export const logged_in_states = [
  SbhsAuthStatus.LOGGED_IN,
  SbhsAuthStatus.REFRESHING,
  SbhsAuthStatus.EXPIRED,
];

/**
 * The authentication store state.
 */
type AuthState = {
  status: SbhsAuthStatus;
  pkceState: string;
  codeVerifier: string;
};

// Create the store with the initial state
export const useSbhsAuthStore = create<AuthState>()(
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

/**
 * Selector to access the authentication status.
 */
export const useSbhsAuthStatus = () =>
  useSbhsAuthStore((state) => state.status);

/**
 * Selector to access whether logged in or not.
 */
export const useIsLoggedIn = () =>
  useSbhsAuthStore((state) => logged_in_states.includes(state.status));

/**
 * Actions to modify the authentication state.
 */
export const sbhsAuthActions = {
  /**
   * Log in to the application.
   */
  login,
  logout,
  resolve,
  refresh,
  fetchAuthenticated,
};
