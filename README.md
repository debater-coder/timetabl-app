# Timetabl
[![ESLint](https://github.com/debater-coder/timetabl-app/actions/workflows/eslint.yml/badge.svg)](https://github.com/debater-coder/timetabl-app/actions/workflows/eslint.yml)
![GitHub deployments](https://img.shields.io/github/deployments/debater-coder/timetabl-app/production?label=vercel&logo=vercel)

### Timetabl is a blazing fast, offline-enabled, installable timetable app for SBHS

## Philosophy
Timetabl is built on three principles:
1. **Always have data available, and fast**
Timetabl is a PWA and it stores the app shell in cache. The app shell will always load instantly as there is no network request, and the shell will be updated along with the service worker. The app data is also automatically cached, so in theory, after first load, the app will load instantly

2. **Always keep data fresh**
This is why Timetabl automatically refetches data every 5 minutes, and in the future it may even perform background syncs.

3. **Be secure**
Unlike other bell time apps, Timetabl stores your tokens in HTTPS-only cookies instead of localStorage, so that even in the event of an XSS attack, the tokens are secure.

## For Contributors
To run Timetabl locally, you must first set the `VITE_CLIENT_ID` environment variable to the `client_id` you configured in the SBHS Apps section. To simulate the Vercel environment on your local machine, you must also install the [Vercel CLI](https://vercel.com/docs/cli). Then to start the vercel dev server run:
```
git clone https://github.com/debater-coder/timetabl-app.git
cd timetabl-app
npm run vdev
```
If you only wish to start the client server, run `npm start` instead of `npm run vdev`.

## License
This project is MIT licensed. See [LICENSE](./LICENSE)
