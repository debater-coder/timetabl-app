# [Timetabl](https://www.timetabl.app)

<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->

[![All Contributors](https://img.shields.io/badge/all_contributors-3-orange.svg?style=flat-square)](#contributors-)

<!-- ALL-CONTRIBUTORS-BADGE:END -->

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

## Contributors

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->
<table>
  <tbody>
    <tr>
      <td align="center"><a href="https://github.com/wensenfriendandextra"><img src="https://avatars.githubusercontent.com/u/23128324?v=4?s=100" width="100px;" alt="Wansen Dong"/><br /><sub><b>Wansen Dong</b></sub></a><br /><a href="https://github.com/debater-coder/timetabl-app/commits?author=wensenfriendandextra" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/debater-coder"><img src="https://avatars.githubusercontent.com/u/52619668?v=4?s=100" width="100px;" alt="debater-coder"/><br /><sub><b>debater-coder</b></sub></a><br /><a href="https://github.com/debater-coder/timetabl-app/commits?author=debater-coder" title="Code">💻</a></td>
      <td align="center"><a href="https://github.com/ZZZooHaq"><img src="https://avatars.githubusercontent.com/u/88522048?v=4?s=100" width="100px;" alt="ZZZooHaq"/><br /><sub><b>ZZZooHaq</b></sub></a><br /><a href="#ideas-ZZZooHaq" title="Ideas, Planning, & Feedback">🤔</a></td>
    </tr>
  </tbody>
</table>

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->
<!-- prettier-ignore-start -->
<!-- markdownlint-disable -->

<!-- markdownlint-restore -->
<!-- prettier-ignore-end -->

<!-- ALL-CONTRIBUTORS-LIST:END -->

## For Contributors

Feel free to open a PR for small changes, and for larger changes we would appreciate if you could open an issue to justify the change before starting work on a PR.

See [CONTRIBUTING.md](./CONTRIBUTING.md)

If you only wish to start the client server, run `npm start` instead of `npm run vdev`.

## Contact

If you wish to report a bug or have a feature request, or something else to say, please either post a GitHub issue, or join the [Timetabl Discord Server](https://discord.gg/Az3crshSZd).

## License

This project is MIT licensed. See [LICENSE](./LICENSE)
