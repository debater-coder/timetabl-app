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
      // Set the status to expired
      useAuthStore.setState({ status: AuthStatus.EXPIRED });

      return null; // Fail this step, we don't want to log out until the user does so explicitly
    },

    storeToken: (token) => {
      useAuthStore.setState({
        token,
      });
    },

    getStoredToken: () => useAuthStore.getState().token,
  });

let _fetchWrapper: OAuth2Fetch | null = null;

// We defer initialisation until the first call to fetchAuthenticated to ensure that initialisation has been completed
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
    res = await getFetchWrapper().fetch(
      "https://student.sbhs.net.au/api/" +
        endpoint +
        "?" +
        new URLSearchParams(options),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
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
