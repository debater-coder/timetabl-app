import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  expect,
  test,
} from "vitest";
import { AuthStatus, resetAuthStore, useAuthStore } from ".";
import { login } from "./actions/login";
import { resolve } from "./actions/resolve";
import { setupMockServer } from "sbhs-api";
import config from "../../config";

const server = setupMockServer({
  client_id: config.client_id,
  code: "test_oauth_code",
  code_verifier: "JZWfp9wbBrl2hN0uKfZbkEbHgrZPR9p1gohoMoX90F0",
  access_token: "test_access_token",
  refresh_token: "test_refresh_token",
});

beforeEach(() => {
  resetAuthStore();
});

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

test("logging in generates code_verifier and state", async () => {
  await login();

  const { codeVerifier, pkceState } = useAuthStore.getState();

  expect(codeVerifier).not.toBe("");
  expect(pkceState).not.toBe("");
});

test("resolving after redirect triggers token exchange", async () => {
  const pkceState = "test_pkce_state";
  history.replaceState(
    history.state,
    "",
    `?code=test_oauth_code&state=${pkceState}`
  );

  useAuthStore.setState({
    codeVerifier: "JZWfp9wbBrl2hN0uKfZbkEbHgrZPR9p1gohoMoX90F0",
    pkceState,
  });

  await resolve();

  expect(useAuthStore.getState().status).toBe(AuthStatus.LOGGED_IN);
  expect(useAuthStore.getState().token?.accessToken).toBe("test_access_token");
  expect(useAuthStore.getState().token?.refreshToken).toBe(
    "test_refresh_token"
  );
  expect(useAuthStore.getState().token?.expiresAt).toBeGreaterThan(Date.now());

  expect(useAuthStore.getState().codeVerifier).toBe("");
  expect(useAuthStore.getState().pkceState).toBe("");
});

test("state is initially logged out", () => {
  expect(useAuthStore.getState().status).toBe(AuthStatus.LOGGED_OUT);
  expect(useAuthStore.getState().token).toBe(null);
  expect(useAuthStore.getState().codeVerifier).toBe("");
  expect(useAuthStore.getState().pkceState).toBe("");
});
