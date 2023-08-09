import { OAuth2Fetch } from "@badgateway/oauth2-client";
import { getClient } from "../../../createOAuth2Client";
import { AuthStatus, useAuthStore } from "../auth";
import { SbhsApiEndpoint } from "../../../services/sbhsApi/schemas";
import NetworkError from "../../../errors/NetworkError";
import HTTPError from "../../../errors/HTTPError";

const initialiseFetchWrapper = () =>
  new OAuth2Fetch({
    client: getClient(),

    getNewToken: () => {
      return null; // Fail this step, we don't want to log out until the user does so explicitly
    },

    storeToken: (token) => {
      useAuthStore.setState({
        token,
      });
    },

    getStoredToken: () => {
      return useAuthStore.getState().token;
    },

    onError: (error) => {
      // Set the status to expired
      useAuthStore.setState({ status: AuthStatus.EXPIRED });
      console.error(error);
    },
  });

let _fetchWrapper: OAuth2Fetch | null = null;

export const resetFetchWrapper = () => {
  _fetchWrapper = null;
  initialiseFetchWrapper();
};

// We defer initialisation until the first call to fetchAuthenticated to ensure that any mocks have been set up
const getFetchWrapper = () => {
  if (!_fetchWrapper) {
    _fetchWrapper = initialiseFetchWrapper();
  }

  return _fetchWrapper;
};

/**
 * Fetches from SBHS API
 */
export const fetchAuthenticated = async <TSbhsApiData>(
  endpoint: SbhsApiEndpoint,
  options?: Record<string, string>
) => {
  let res: Response;
  try {
    const fetchWrapper = getFetchWrapper();
    res = await fetchWrapper.fetch(
      "https://student.sbhs.net.au/api/" +
        endpoint +
        "?" +
        new URLSearchParams(options)
    );
  } catch (error) {
    if (error instanceof TypeError) {
      // If we are offline, dispatch a custom event to notify other parts of the application
      document.dispatchEvent(
        new CustomEvent("onlinechange", { detail: { online: false } })
      );
      throw new NetworkError(error.message);
    }

    throw error;
  }

  if (!res.ok) {
    return new HTTPError(res.status);
  }

  const json = await res.json();

  // Yay we succeeded...
  document.dispatchEvent(
    new CustomEvent("onlinechange", { detail: { online: true } })
  );
  useAuthStore.setState({ status: AuthStatus.LOGGED_IN });
  return json as TSbhsApiData;
};
