import { OAuth2Client } from "@badgateway/oauth2-client";
import config from "./config";

export const client = new OAuth2Client({
  server: "https://student.sbhs.net.au",
  clientId: config.client_id,
  tokenEndpoint: "/api/token",
  authorizationEndpoint: "/api/authorize",
});
