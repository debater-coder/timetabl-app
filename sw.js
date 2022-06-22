import { precacheAndRoute } from "workbox-precaching";

console.log("Your custom service worker code");

if (typeof is_vite_preview === "undefined") {
  precacheAndRoute(self.__WB_MANIFEST);
  console.log("precache!");
} else {
  console.log("skipping precache in dev");
}
