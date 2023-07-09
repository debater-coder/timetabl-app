import {
  afterAll,
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  test,
  vi,
} from "vitest";
import { AuthStatus, resetAuthStore, useAuthStore } from ".";
import { login } from "./actions/login";
import { resolve } from "./actions/resolve";
import { setupMockServer } from "sbhs-api";
import config from "../../config";
import { logout } from "./actions/logout";
import { toast } from "../../toast";
import { fetchAuthenticated } from "./actions/fetchAuthenticated";

beforeEach(() => {
  resetAuthStore();
});

const server = setupMockServer({
  client_id: config.client_id,
  code: "test_oauth_code",
  code_verifier: "JZWfp9wbBrl2hN0uKfZbkEbHgrZPR9p1gohoMoX90F0",
  access_token: "test_access_token",
  refresh_token: "test_refresh_token",
});

beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

vi.mock("../../toast", () => ({
  toast: vi.fn(),
}));

afterEach(() => {
  vi.clearAllMocks();
});

describe("logging in", () => {
  test("generates code_verifier and state", async () => {
    await login();

    const { codeVerifier, pkceState } = useAuthStore.getState();

    expect(codeVerifier).not.toBe("");
    expect(pkceState).not.toBe("");
  });
});

describe("logging out", () => {
  test("sets state to logged out", () => {
    useAuthStore.setState({
      status: AuthStatus.LOGGED_IN,
      token: {
        accessToken: "test_access_token",
        refreshToken: "test_refresh_token",
        expiresAt: Date.now() + 1000,
      },
    });

    logout();

    expect(useAuthStore.getState().status).toBe(AuthStatus.LOGGED_OUT);
    expect(useAuthStore.getState().token).toBe(null);
  });

  test("clears localstorage", () => {
    localStorage.setItem("test", "test");

    logout();

    expect(localStorage.getItem("test")).toBe(null);
  });
});

describe("resolving", () => {
  test("after redirect retreives tokens and sets state to logged in", async () => {
    const pkceState = "test_pkce_state";

    // Redirect
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
    expect(useAuthStore.getState().token?.accessToken).toBe(
      "test_access_token"
    );
    expect(useAuthStore.getState().token?.refreshToken).toBe(
      "test_refresh_token"
    );
    expect(useAuthStore.getState().token?.expiresAt).toBeGreaterThan(
      Date.now()
    );

    expect(useAuthStore.getState().codeVerifier).toBe("");
    expect(useAuthStore.getState().pkceState).toBe("");
  });

  test("after redirect with invalid state shows error toast", async () => {
    const pkceState = "test_pkce_state";

    // Redirect
    history.replaceState(
      history.state,
      "",
      `?code=test_oauth_code&state=${pkceState}`
    );

    useAuthStore.setState({
      codeVerifier: "JZWfp9wbBrl2hN0uKfZbkEbHgrZPR9p1gohoMoX90F0",
      pkceState: "invalid_pkce_state",
    });

    await resolve();

    expect(toast).toBeCalledTimes(1);

    const callObject = (toast as unknown as ReturnType<typeof vi.fn>).mock
      .calls[0]?.[0];

    expect(callObject?.title).toBe("Error");
    expect(callObject?.status).toBe("error");
    expect(callObject?.description).toMatch(/state/);

    expect(useAuthStore.getState().status).toBe(AuthStatus.LOGGED_OUT);
    expect(useAuthStore.getState().codeVerifier).toBe("");
    expect(useAuthStore.getState().pkceState).toBe("");
  });

  test("after redirect with error shows error toast", async () => {
    const pkceState = "test_pkce_state";

    // Redirect
    history.replaceState(
      history.state,
      "",
      `?error=access_denied&error_description=The+user+denied+access+to+your+application&state=${pkceState}`
    );

    useAuthStore.setState({
      codeVerifier: "JZWfp9wbBrl2hN0uKfZbkEbHgrZPR9p1gohoMoX90F0",
      pkceState,
    });

    await resolve();

    expect(toast).toBeCalledTimes(1);
    expect(toast).toBeCalledWith({
      title: "Error",
      status: "error",
      description: "The user denied access to your application",
    });

    expect(useAuthStore.getState().status).toBe(AuthStatus.LOGGED_OUT);
    expect(useAuthStore.getState().codeVerifier).toBe("");
    expect(useAuthStore.getState().pkceState).toBe("");
  });

  test("when not redirected cancels pending state", async () => {
    useAuthStore.setState({
      codeVerifier: "JZWfp9wbBrl2hN0uKfZbkEbHgrZPR9p1gohoMoX90F0",
      pkceState: "test_pkce_state",
      status: AuthStatus.PENDING,
    });

    await resolve();

    expect(useAuthStore.getState().status).toBe(AuthStatus.LOGGED_OUT);
    expect(useAuthStore.getState().codeVerifier).toBe("");
    expect(useAuthStore.getState().pkceState).toBe("");
  });
});

describe("fetching", () => {
  test("when logged in fetches with access token", async () => {
    useAuthStore.setState({
      status: AuthStatus.LOGGED_IN,
      token: {
        accessToken: "test_access_token",
        refreshToken: "test_refresh_token",
        expiresAt: Date.now() + 1000,
      },
    });

    await expect(fetchAuthenticated("details/userinfo.json")).resolves.toEqual({
      username: "436345789",
      studentId: "436345789",
      givenName: "John",
      surname: "Citizen",
      rollClass: "07E",
      yearGroup: "7",
      role: "Student",
      department: "Year 7",
      office: "7E",
      email: "436345789@student.sbhs.nsw.edu.au",
      emailAliases: ["john.citizen23@student.sbhs.nsw.edu.au"],
      decEmail: "jcz@education.nsw.gov.au",
      groups: [],
    });
  });
});

test("the initial state is logged out", () => {
  expect(useAuthStore.getState().status).toBe(AuthStatus.LOGGED_OUT);
  expect(useAuthStore.getState().token).toBe(null);
  expect(useAuthStore.getState().codeVerifier).toBe("");
  expect(useAuthStore.getState().pkceState).toBe("");
});
