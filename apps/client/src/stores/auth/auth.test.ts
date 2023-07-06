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
import { setupServer } from "msw/node";
import { rest } from "msw";
import config from "../../config";
import { resolve } from "./actions/resolve";

const server = setupServer(
  rest.post("https://student.sbhs.net.au/api/token", async (req, res, ctx) => {
    const payload = new URLSearchParams(await req.text());

    if (payload.get("grant_type") !== "authorization_code") {
      return res(
        ctx.json({
          error: "unsupported_grant_type",
        }),
        ctx.status(400)
      );
    }

    if (payload.get("client_id") !== config.client_id) {
      return res(
        ctx.json({
          error: "invalid_client",
        }),
        ctx.status(400)
      );
    }

    if (
      payload.get("code") !== "test_oauth_code" ||
      payload.get("code_verifier") !==
        "JZWfp9wbBrl2hN0uKfZbkEbHgrZPR9p1gohoMoX90F0"
    ) {
      return res(
        ctx.json({
          error: "invalid_grant",
        }),
        ctx.status(400)
      );
    }

    return res(
      ctx.json({
        access_token: "test_access_token",
        expires_in: 3600,
        token_type: "Bearer",
        scope: "all-ro",
        refresh_token: "test_refresh_token",
      })
    );
  })
);

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
