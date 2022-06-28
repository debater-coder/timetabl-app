import { precacheAndRoute } from "workbox-precaching";

if (typeof is_vite_preview === "undefined") {
  precacheAndRoute(self.__WB_MANIFEST);
}
