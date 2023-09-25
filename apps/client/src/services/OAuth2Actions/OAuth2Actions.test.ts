import HTTPError from "../../errors/HTTPError";
import NetworkError from "../../errors/NetworkError";
import { FetchWrapper } from "../../interfaces/FetchWrapper";
import { Notifier } from "../../interfaces/Notifier";
import { AuthStatus } from "../../stores/auth";
import OAuth2Actions, { AuthStore } from "./OAuth2Actions";
import { OAuth2Client } from "@badgateway/oauth2-client";
import { QueryClient } from "@tanstack/react-query";
import { vitest, describe, beforeEach, expect, test } from "vitest";

describe("OAuth2Actions", () => {
  let authStore: AuthStore;
  let queryClient: QueryClient;
  let oauthClient: OAuth2Client;
  let fetchWrapper: FetchWrapper;
  let toast: Notifier;
  let oauth2Actions: OAuth2Actions;

  beforeEach(() => {
    authStore = {
      setState: vitest.fn(),
      getState: vitest.fn(),
    };
    queryClient = new QueryClient();
    oauthClient = new OAuth2Client({
      clientId: "test-client-id",
      clientSecret: "test-client-secret",
      authorizationEndpoint: "https://example.com/authorize",
      tokenEndpoint: "https://example.com/token",
    });
    fetchWrapper = {
      fetch: vitest.fn(),
    };
    toast = {
      notify: vitest.fn(),
      getContainer: vitest.fn(),
    };
    oauth2Actions = new OAuth2Actions(
      authStore,
      queryClient,
      oauthClient,
      fetchWrapper,
      toast
    );
  });

  describe("login", () => {
    test("should set the codeVerifier, pkceState, and status in the authStore", async () => {
      const codeVerifier = "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA";
      const pkceState =
        "00000000000000000000000000000000000000000000000000000000";
      const authorizeUri = "https://example.com/authorize";

      vitest
        .spyOn(window.crypto, "getRandomValues")
        .mockReturnValue(
          new Uint32Array([
            0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000,
            0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000,
            0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000,
            0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000,
            0x00000000, 0x00000000, 0x00000000, 0x00000000, 0x00000000,
            0x00000000,
          ])
        );

      vitest
        .spyOn(oauthClient.authorizationCode, "getAuthorizeUri")
        .mockResolvedValueOnce(authorizeUri);

      await oauth2Actions.login();

      expect(authStore.setState).toHaveBeenCalledWith({
        codeVerifier,
        pkceState,
        status: AuthStatus.PENDING,
      });
    });
  });

  describe("resolve", () => {
    test("should set the status to logged out and clear the pkceState and codeVerifier in the authStore if the query string contains an error", async () => {
      const query = {
        error: "test-error",
        error_description: "Test error description",
      };

      history.replaceState(
        history.state,
        "",
        `?error=${query.error}&error_description=${query.error_description}`
      );

      await oauth2Actions.resolve();

      expect(toast.notify).toHaveBeenCalledWith({
        title: "Error",
        message: query.error_description,
        status: "error",
      });
      expect(authStore.setState).toHaveBeenCalledWith({
        status: AuthStatus.LOGGED_OUT,
        pkceState: "",
        codeVerifier: "",
      });
    });

    test("should attempt to exchange the authorization code for an access token if the query string contains a code", async () => {
      const pkceState = "test_pkce_state";

      // Redirect
      history.replaceState(
        history.state,
        "",
        `?code=test_oauth_code&state=${pkceState}`
      );

      vitest.spyOn(authStore, "getState").mockReturnValueOnce({
        codeVerifier: "JZWfp9wbBrl2hN0uKfZbkEbHgrZPR9p1gohoMoX90F0",
        pkceState,
        status: AuthStatus.PENDING,
        token: null,
      });

      await oauth2Actions.resolve();

      expect(
        oauthClient.authorizationCode.getTokenFromCodeRedirect
      ).toHaveBeenCalledWith(document.location.toString(), {
        redirectUri: "https://example.com/redirect",
        state: "",
        codeVerifier: "",
      });
      expect(window.history.replaceState).toHaveBeenCalledWith(
        {},
        "",
        location.pathname
      );
      expect(authStore.setState).toHaveBeenCalledWith({
        token: oauth2Token,
        status: AuthStatus.LOGGED_IN,
        pkceState: "",
        codeVerifier: "",
      });
    });

    test("should set the status to logged out and clear the pkceState and codeVerifier in the authStore if the query string does not contain a code and the status is pending", async () => {
      vitest.spyOn(window.location, "search", "get").mockReturnValueOnce("");

      authStore.getState.mockReturnValueOnce({
        status: AuthStatus.PENDING,
      });

      await oauth2Actions.resolve();

      expect(authStore.setState).toHaveBeenCalledWith({
        status: AuthStatus.LOGGED_OUT,
        pkceState: "",
        codeVerifier: "",
      });
    });
  });

  describe("logout", () => {
    test("should clear localstorage, reset the query cache, and set the status to logged out and clear the token in the authStore", async () => {
      await oauth2Actions.logout();

      expect(localStorage.clear).toHaveBeenCalled();
      expect(queryClient.clear).toHaveBeenCalled();
      expect(authStore.setState).toHaveBeenCalledWith({
        status: AuthStatus.LOGGED_OUT,
        token: null,
      });
    });
  });

  describe("fetchAuthenticated", () => {
    test("should call fetchWrapper.fetch with the correct URL and options", async () => {
      const endpoint = "details/userinfo.json";
      const options = {
        testOption: "test-value",
      };
      const response = {
        ok: true,
        json: vitest.fn().mockResolvedValueOnce({}),
      };

      vitest.spyOn(fetchWrapper, "fetch").mockResolvedValueOnce(response);

      await oauth2Actions.fetchAuthenticated(endpoint, options);

      expect(fetchWrapper.fetch).toHaveBeenCalledWith(
        "https://student.sbhs.net.au/api/details/userinfo.json?testOption=test-value"
      );
    });

    test("should throw a NetworkError if fetchWrapper.fetch throws a TypeError", async () => {
      const endpoint = "details/userinfo.json";
      const options = {
        testOption: "test-value",
      };
      const error = new TypeError("Network error");

      vitest.spyOn(fetchWrapper, "fetch").mockRejectedValueOnce(error);

      await expect(
        oauth2Actions.fetchAuthenticated(endpoint, options)
      ).rejects.toThrow(NetworkError);
      expect(document.dispatchEvent).toHaveBeenCalledWith(
        new CustomEvent("onlinechange", { detail: { online: false } })
      );
    });

    test("should throw the error if fetchWrapper.fetch returns a non-ok response", async () => {
      const endpoint = "details/userinfo.json";
      const options = {
        testOption: "test-value",
      };
      const response = {
        ok: false,
        status: 404,
      };

      vitest.spyOn(fetchWrapper, "fetch").mockResolvedValueOnce(response);

      await expect(
        oauth2Actions.fetchAuthenticated(endpoint, options)
      ).rejects.toThrow(HTTPError);
    });

    test("should return the JSON response if fetchWrapper.fetch returns an ok response", async () => {
      const endpoint = "details/userinfo.json";
      const options = {
        testOption: "test-value",
      };
      const response = {
        ok: true,
        json: vitest.fn().mockResolvedValueOnce({}),
      };

      vitest.spyOn(fetchWrapper, "fetch").mockResolvedValueOnce(response);

      const result = await oauth2Actions.fetchAuthenticated(endpoint, options);

      expect(result).toEqual({});
    });
  });
});
