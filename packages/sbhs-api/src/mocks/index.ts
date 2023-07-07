import { setupServer as mswSetupServer } from "msw/node";
import { rest } from "msw";

export const setupMockServer = (config: {
  client_id: string;
  code: string;
  code_verifier: string;
  access_token: string;
  refresh_token: string;
}) =>
  mswSetupServer(
    rest.post(
      "https://student.sbhs.net.au/api/token",
      async (req, res, ctx) => {
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
          payload.get("code") !== config.code ||
          payload.get("code_verifier") !== config.code_verifier
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
            access_token: config.access_token,
            expires_in: 3600,
            token_type: "Bearer",
            scope: "all-ro",
            refresh_token: config.refresh_token,
          })
        );
      }
    )
  );
