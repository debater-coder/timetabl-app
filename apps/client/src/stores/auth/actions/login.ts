import { produce } from "immer";
import config from "../../../config";
import {
  useSbhsAuthStore,
  SbhsAuthStatus,
  generateRandomString,
  pkceChallengeFromVerifier,
} from "../sbhsAuth";

export const login = async () => {
  switch (useSbhsAuthStore.getState().status) {
    // Check if valid state to login
    case SbhsAuthStatus.LOGGED_OUT:
    case SbhsAuthStatus.EXPIRED: {
      // Store PKCE values and set status to pending
      useSbhsAuthStore.setState(
        produce(useSbhsAuthStore.getState(), (draft) => {
          draft.pkceState = generateRandomString();
          draft.codeVerifier = generateRandomString();

          draft.status = SbhsAuthStatus.PENDING;
        })
      );

      // Generate PKCE challenge
      const code_challenge = await pkceChallengeFromVerifier(
        useSbhsAuthStore.getState().codeVerifier
      );

      // Redirect to login page with PKCE values
      window.location.href =
        config.authorization_endpoint +
        "?response_type=code" +
        "&client_id=" +
        encodeURIComponent(config.client_id) +
        "&state=" +
        encodeURIComponent(useSbhsAuthStore.getState().pkceState) +
        "&scope=" +
        encodeURIComponent(config.scopes) +
        "&redirect_uri=" +
        encodeURIComponent(config.redirect_uri) +
        "&code_challenge=" +
        encodeURIComponent(code_challenge) +
        "&code_challenge_method=S256";
      break;
    }
    default:
      // Warn if invalid usage occurs
      console.warn(
        `Invalid usage of login action with auth status ${
          useSbhsAuthStore.getState().status
        }.`
      );
      break;
  }
};
