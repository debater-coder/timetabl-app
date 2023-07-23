import { OAuth2Client } from "@badgateway/oauth2-client";
import config from "./config";

let _client: OAuth2Client | null = null;

export const getClient = () => {
  if (!_client) {
    _client = new OAuth2Client({
      server: "https://student.sbhs.net.au",
      clientId: config.client_id,
      tokenEndpoint: "/api/token",
      authorizationEndpoint: config.authorization_endpoint,
    });
  }
  return _client;
};
