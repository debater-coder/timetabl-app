import { generateCodeVerifier } from "@badgateway/oauth2-client";
import config from "../../../config";
import { getClient } from "../../../createOAuth2Client";
import { AuthStatus, generateRandomString, useAuthStore } from "../auth";

export const login = async () => {
  const codeVerifier = await generateCodeVerifier();
  const pkceState = generateRandomString();

  useAuthStore.setState({
    codeVerifier,
    pkceState,
    status: AuthStatus.PENDING,
  });
  if (import.meta.env.MODE == "test") return;

  window.location.assign(
    await getClient().authorizationCode.getAuthorizeUri({
      redirectUri: config.redirect_uri,
      state: pkceState,
      codeVerifier,
      scope: ["all-ro"],
    })
  );
};
