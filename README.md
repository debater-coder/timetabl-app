# [Timetabl](https://www.timetabl.app)

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fdebater-coder%2Ftimetabl-app&env=VITE_CLIENT_ID&envDescription=The%20client%20id%20you%20entered%20in%20the%20student%20portal.)

![GitHub deployments](https://img.shields.io/github/deployments/debater-coder/timetabl-app/production?label=vercel&logo=vercel)

### Timetabl is a blazing fast, offline-enabled, installable timetable app for SBHS!

![image](https://user-images.githubusercontent.com/52619668/195273003-55225579-829c-46c4-bd5b-4b37680bb675.png)

## Philosophy

Timetabl is built on three principles:

1. **Always have data available, and fast**
   Timetabl is a PWA and it stores the app shell in cache. The app shell will always load instantly as there is no network request, and the shell will be updated along with the service worker. The app data is also automatically cached, so in theory, after first load, the app will load instantly

2. **Always keep data fresh**
   This is why Timetabl automatically refetches data every 5 minutes, and in the future it may even perform background syncs.

3. **Be secure**
   Unlike other bell time apps, Timetabl stores your tokens in HTTPS-only cookies instead of `localStorage`, so that even in the event of an XSS attack, the tokens are secure.

## For Contributors

Feel free to open a PR for small changes, and for larger changes we would appreciate if you could open an issue to justify the change before starting work on a PR.

To run Timetabl locally, you must first set the `VITE_CLIENT_ID` environment variable to the `client_id` you configured in the SBHS Apps section. To simulate the Vercel environment on your local machine, you must also install the [Vercel CLI](https://vercel.com/docs/cli). Then to start the vercel dev server run:

```
git clone https://github.com/debater-coder/timetabl-app.git
cd timetabl-app
npm install
npm run vdev
```

If you only wish to start the client server, run `npm start` instead of `npm run vdev`.

## Contact

If you wish to report a bug or have a feature request, or something else to say, please either post a GitHub issue, or join the [Timetabl Slack](https://join.slack.com/t/timetabl/shared_invite/zt-1dhr2v791-G0IDTb~kLRXT~0vjmyEtmw).

## License

This project is MIT licensed. See [LICENSE](./LICENSE)
