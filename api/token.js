const fetch = require("node-fetch");
const cookie = require("cookie");

export default function handler(request, response) {
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
            sameSite: "lax",
            secure: true,
            maxAge: 60 * 60,
          }),
          cookie.serialize("code_verifier", request.body.code_verifier, {
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            secure: true,
            maxAge: 90 * 24 * 60 * 60,
          }),
          cookie.serialize("refresh_token", data["refresh_token"], {
            httpOnly: true,
            path: "/",
            sameSite: "lax",
            secure: true,
            maxAge: 90 * 24 * 60 * 60,
          }),
        ]);
        response.status(200).send();
      })
      .catch((reason) => {
        response.status(500).send("Bad response from server.");
      });
  } catch (reason) {
    response.status(400).send("");
  }
}
