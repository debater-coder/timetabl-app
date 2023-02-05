import { QueryClient } from "@tanstack/react-query";
import _ from "lodash";
import config from "../config";
import HTTPError from "./errors/HTTPError";
import { toast } from "./toast";

export class Auth {
  loggedIn: boolean;
  loading: boolean;
  shouldRedirect: boolean;
  refreshing: boolean;
  shouldLogin: boolean;
  queryClient: QueryClient;

  constructor(queryClient: QueryClient) {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.refresh = this.refresh.bind(this);
    this.handleRedirect = this.handleRedirect.bind(this);
    this.loggedIn = false;
    this.loading = false;
    this.shouldRedirect = false;
    this.refreshing = false;
    this.shouldLogin = false;
    this.queryClient = queryClient;
  }

  /**
   * Generate a secure random string using the browser crypto functions
   */
  protected generateRandomString() {
    const array = new Uint32Array(28);
    window.crypto.getRandomValues(array);
    return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
      ""
    );
  }

  /** Calculate the SHA256 hash of the input text.
   * Returns a promise that resolves to an ArrayBuffer
   */
  protected sha256(plain: string) {
    const encoder = new TextEncoder();
    const data = encoder.encode(plain);
    return window.crypto.subtle.digest("SHA-256", data);
  }

  /**
   * Base64-urlencodes the input string
   */
  protected base64urlencode(str: ArrayBuffer) {
    // Convert the ArrayBuffer to string using Uint8 array to conver to what btoa accepts.
    // btoa accepts chars only within ascii 0-255 and base64 encodes them.
    // Then convert the base64 encoded to base64url encoded
    //   (replace + with -, replace / with _, trim trailing =)
    return window
      .btoa(String.fromCharCode.apply(null, new Uint8Array(str)))
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }

  /**
   * Return the base64-urlencoded sha256 hash for the PKCE challenge
   */
  protected async pkceChallengeFromVerifier(v: string) {
    const hashed = await this.sha256(v);
    return this.base64urlencode(hashed);
  }

  async login() {
    // Create and store a random "state" value
    const state = this.generateRandomString();
    localStorage.setItem("pkce_state", state);

    // Create and store a new PKCE code_verifier (the plaintext random secret)
    const code_verifier = this.generateRandomString();
    localStorage.setItem("pkce_code_verifier", code_verifier);

    // Hash and base64-urlencode the secret to use as the challenge
    const code_challenge = await this.pkceChallengeFromVerifier(code_verifier);

    // Build the authorization URL
    // Redirect to the authorization server
    window.location.href =
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
  }

  async logout(rerender?: () => void) {
    await fetch("/api/token", {
      method: "DELETE",
    });
    localStorage.setItem("loggedIn", "false");
    this.queryClient.clear();
    this.loggedIn = false;
    rerender?.();
  }

  refresh = _.throttle(async (rerender?: () => void) => {
    this.refreshing = true;
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

      try {
        const error = await res.text();

        if (error === "invalid_grant") {
          console.log("invalid_grant");
          this.shouldLogin = true;
          this.refreshing = false;
          rerender?.();
          return;
        }
      } catch {
        throw new Error("Can't read text from response");
      }

      if (!res.ok) {
        throw new HTTPError(res.status);
      }

      this.refreshing = false;
    } catch (error) {
      this.refreshing = false;
      this.shouldLogin = true;
      toast({
        title:
          "Something went wrong, try logging in and out if the issue persists.",
        description: error.message,
        status: "error",
        isClosable: true,
      });
      throw error;
    } finally {
      rerender?.();
    }
  }, 1000 * 60);

  handleRedirect(rerender?: () => void) {
    // Get query
    const query = Object.fromEntries(
      new URLSearchParams(window.location.search).entries()
    );

    // Clear query
    window.history.replaceState({}, null, location.pathname);

    // Oauth Redirect Handling
    try {
      // Error check
      if (query.error) {
        toast({
          title: query.error,
          description: query.error_description,
          status: "error",
        });
      }

      // If the server returned an authorization code, attempt to exchange it for an access token
      if (query.code) {
        // Verify state matches what we set at the beginning
        if (localStorage.getItem("pkce_state") !== query.state) {
          throw new Error(
            "Invalid state! If you are seeing this message it may mean that the authorisation server is FAKE"
          );
        }

        // Optimistically login but set loading to true
        this.loggedIn = true;
        this.shouldRedirect = true;
        this.loading = true;

        rerender?.();

        // Exchange code for access token
        fetch("/api/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/json;charset=utf-8",
          },
          body: JSON.stringify({
            code: query.code,
            client_id: config.client_id,
            redirect_uri: config.redirect_uri,
            code_verifier: localStorage.getItem("pkce_code_verifier"),
          }),
        })
          .then((r) => {
            if (!r.ok) {
              throw new Error(String(r.status) + r.statusText);
            }

            // Persist logged in state and stop loading
            localStorage.setItem("loggedIn", "true");
            this.loading = false;
            rerender?.();
          })
          .catch(() => {
            this.loading = false;
            rerender?.();
          });
      }
    } finally {
      // Clean these up since we don't need them anymore
      localStorage.removeItem("pkce_state");
      localStorage.removeItem("pkce_code_verifier");
    }

    // Log in if already logged in
    if (localStorage.getItem("loggedIn") === "true") {
      this.loggedIn = true;
    }

    this.shouldRedirect = true;
    rerender?.();
  }
}
