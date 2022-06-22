import { useEffect, useState } from "react";
import contextualise from "../utils/contextualise";
import config from "../config.js";

let useAuth = () => {
  /**
   * STATE
   */
  const [loggedIn, setLoggedIn] = useState(false);

  /**
   * PKCE HELPERS
   */
  // Generate a secure random string using the browser crypto functions
  const generateRandomString = () => {
    let array = new Uint32Array(28);
    window.crypto.getRandomValues(array);
    return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
      ""
    );
  };

  // Calculate the SHA256 hash of the input text.
  // Returns a promise that resolves to an ArrayBuffer
  const sha256 = (plain) => {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  };

  // Base64-urlencodes the input string
  const base64urlencode = (str) => {
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
  const pkceChallengeFromVerifier = async (v) => {
    let hashed = await sha256(v);
    return base64urlencode(hashed);
  };

  /**
   * PUBLIC FUNCTIONS
   */

  const login = async () => {
    // Create and store a random "state" value
    let state = generateRandomString();
    localStorage.setItem("pkce_state", state);

    // Create and store a new PKCE code_verifier (the plaintext random secret)
    let code_verifier = generateRandomString();
    localStorage.setItem("pkce_code_verifier", code_verifier);

    // Hash and base64-urlencode the secret to use as the challenge
    let code_challenge = await pkceChallengeFromVerifier(code_verifier);

    // Build the authorization URL
    // Redirect to the authorization server
    window.location =
      config.authorization_endpoint +
      "?response_type=code" +
      "&client_id=" +
      encodeURIComponent(config.client_id) +
      "&state=" +
      encodeURIComponent(state) +
      "&scope=" +
      encodeURIComponent(config.scopes) +
      "&redirect_uri=" +
      encodeURIComponent(config.redirect_uri) +
      "&code_challenge=" +
      encodeURIComponent(code_challenge) +
      "&code_challenge_method=S256";
  };

  /**
   * OAUTH REDIRECT HANDLING
   */
  useEffect(() => {
    // Get query
    let query = Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    );

    // Clear query
    window.history.replaceState({}, null, "/");
    try {
      // Error check
      if (query.error) {
        throw new Error(query.error + "\n\n" + query.error_description);
      }

      // If the server returned an authorization code, attempt to exchange it for an access token
      if (query.code) {
        // Verify state matches what we set at the beginning
        if (localStorage.getItem("pkce_state") !== query.state) {
          throw new Error(
            "Invalid state! If you are seeing this message it may mean that the authorisation server is FAKE"
          );
        }

        // Exchange code for access token
        console.log("code: " + query.code);
      }
    } finally {
      // Clean these up since we don't need them anymore
      localStorage.removeItem("pkce_state");
      localStorage.removeItem("pkce_code_verifier");
    }
  }, []);
  /**
   * RETURNS
   */
  return { loggedIn, login };
};

let [useAuthGlobal, AuthProvider] = contextualise(useAuth);

export { AuthProvider, useAuthGlobal as useAuth };
