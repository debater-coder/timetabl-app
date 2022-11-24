import fetch from "node-fetch";
import cookie from "cookie";

export default async function handler(request, response) {
  switch (request.method) {
    case "POST":
      try {
        fetch("https://student.sbhs.net.au/api/token", {
          method: "POST",
          body: new URLSearchParams({
            grant_type: "authorization_code",
            code: request.body.code,
            client_id: request.body.client_id,
            redirect_uri: request.body.redirect_uri,
            code_verifier: request.body.code_verifier,
          }),
          headers: {
            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
          },
        })
          .then((res) => {
            if (!res.ok) {
              throw new Error(`${res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            response.setHeader("Set-Cookie", [
              cookie.serialize("access_token", data["access_token"], {
                httpOnly: true,
                path: "/",
                sameSite: "none",
                secure: true,
                maxAge: 60 * 60,
              }),
              cookie.serialize("code_verifier", request.body.code_verifier, {
                httpOnly: true,
                path: "/",
                sameSite: "none",
                secure: true,
                maxAge: 90 * 24 * 60 * 60,
              }),
              cookie.serialize("refresh_token", data["refresh_token"], {
                httpOnly: true,
                path: "/",
                sameSite: "none",
                secure: true,
                maxAge: 90 * 24 * 60 * 60,
              }),
            ]);
            response.status(200).send("SUCCESSFULLY_REFRESHED_TOKEN");
          })
          .catch(() => {
            response.status(500).send("Bad response from server.");
          });
      } catch (reason) {
        response.status(400).send("");
      }
      break;
    case "DELETE":
      {
        response.setHeader("Set-Cookie", [
          cookie.serialize("access_token", "", {
            httpOnly: true,
            path: "/",
            sameSite: "none",
            secure: true,
            maxAge: 0,
          }),
          cookie.serialize("code_verifier", "", {
            httpOnly: true,
            path: "/",
            sameSite: "none",
            secure: true,
            maxAge: 0,
          }),
          cookie.serialize("refresh_token", "", {
            httpOnly: true,
            path: "/",
            sameSite: "none",
            secure: true,
            maxAge: 0,
          }),
        ]);
      }
      response.status(200).send("Logged out");
      break;
    case "PATCH": {
      const res = await fetch("https://student.sbhs.net.au/api/token", {
        method: "POST",
        body: new URLSearchParams({
          grant_type: "refresh_token",
          refresh_token: request.cookies.refresh_token,
          client_id: request.body.client_id,
          code_verifier: request.cookies.code_verifier,
        }),
        headers: {
          "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8",
        },
      });

      let data;

      try {
        data = await res.json();
      } catch {
        if (!res.ok) {
          if (data && data?.["error"] == "invalid_grant") {
            response.status(500).send("INVALID GRANT");
            return;
          }
        }

        response.status(500).send("Bad response from server.");
        return;
      }

      response.setHeader("Set-Cookie", [
        cookie.serialize("access_token", data["access_token"], {
          httpOnly: true,
          path: "/",
          sameSite: "none",
          secure: true,
          maxAge: 60 * 60,
        }),
        cookie.serialize("refresh_token", data["refresh_token"], {
          httpOnly: true,
          path: "/",
          sameSite: "none",
          secure: true,
          maxAge: 90 * 24 * 60 * 60,
        }),
      ]);

      response.status(200).send("");
      break;
    }
  }
}
