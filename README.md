# Timetabl
[![ESLint](https://github.com/debater-coder/timetabl-app/actions/workflows/eslint.yml/badge.svg)](https://github.com/debater-coder/timetabl-app/actions/workflows/eslint.yml)
![GitHub deployments](https://img.shields.io/github/deployments/debater-coder/timetabl-app/production?label=vercel&logo=vercel)

### Timetabl is a blazing fast, offline-enabled, installable timetable app for SBHS

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
