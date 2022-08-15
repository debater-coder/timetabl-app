const fetch = require("node-fetch");

// Error Codes
// REFRESH_TOKEN: Access token has expired, use the refresh token to get a new one
// TOKEN_EXPIRED: Refresh token has expired, prompt the user to log in again
// UNAUTHORISED: User is not authorised to access the API, prompt the user to log in again
// OTHER_ERROR: Some other error has occurred, tell the user to try again or try logging out and in again

export default async function handler(req, res) {
  const { access_token, refresh_token } = req.cookies;
  const { endpoint } = req.body;

  if (!access_token) {
    if (refresh_token) {
      res.status(401).send("REFRESH_TOKEN");
    } else {
      res.status(401).send("TOKEN_EXPIRED");
    }
    return;
  }

  if (!endpoint) {
    res.status(400).send("NO_ENDPOINT");
    return;
  }

  const raw = await fetch(
    "https://student.sbhs.net.au/api/" +
      endpoint +
      "?access_token=" +
      access_token
  );

  if (raw.status === 401) {
    res.status(401).send("UNAUTHORISED");
  } else if (!raw.ok) {
    res.status(500).send("OTHER_ERROR");
  } else {
    try {
      res.status(200).json(await raw.json());
    } catch {
      res.status(500).send("BAD_JSON");
    }
  }
}
