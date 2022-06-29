const fetch = require("node-fetch");

export default async function handler(req, res) {
  const { access_token } = req.cookies;
  const { endpoint } = req.body;

  const raw = await fetch(
    "https://student.sbhs.net.au/api/" +
      endpoint +
      "?access_token=" +
      access_token
  );

  if (raw.status === 401) {
    try {
      console.error(await raw.text());
    } finally {
      res.status(401).send("Unauthorised");
    }
  }

  if (!raw.ok) {
    try {
      console.error(await raw.text());
    } finally {
      res.status(500).send("Unknown error");
    }
  }

  res.status(200).json(await raw.json());
}
