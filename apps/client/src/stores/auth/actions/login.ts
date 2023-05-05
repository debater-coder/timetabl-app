import { generateCodeVerifier } from "@badgateway/oauth2-client";
import config from "../../../config";
import { client } from "../../../createOAuth2Client";
import { generateRandomString, useSbhsAuthStore } from "../sbhsAuth";

export const login = async () => {
  const codeVerifier = await generateCodeVerifier();
  const pkceState = generateRandomString();

  useSbhsAuthStore.setState({ codeVerifier, pkceState });

  document.location = await client.authorizationCode.getAuthorizeUri({
    redirectUri: config.redirect_uri,
    state: pkceState,
    codeVerifier,
    scope: ["all-ro"],
  });
};
