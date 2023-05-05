import { OAuth2Fetch } from "@badgateway/oauth2-client";
import { client } from "../../../createOAuth2Client";
import { SbhsAuthStatus, useSbhsAuthStore } from "../sbhsAuth";

export const { fetch: fetchAuthenticated } = new OAuth2Fetch({
  client,

  getNewToken: () => {
    // Set the status to expired
    useSbhsAuthStore.setState({ status: SbhsAuthStatus.EXPIRED });

    return null; // Fail this step, we don't want to log out
  },

  storeToken: (token) => {
    useSbhsAuthStore.setState({
      token,
    });
  },

  getStoredToken: () => useSbhsAuthStore.getState().token,
});
