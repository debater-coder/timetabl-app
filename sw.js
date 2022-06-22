import { precacheAndRoute } from "workbox-precaching";
import { registerRoute, Route } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

const shellRoute = new Route(({ request, sameOrigin }) => {
  return sameOrigin && request.method === "GET";
}, new StaleWhileRevalidate());

registerRoute(shellRoute);

if (typeof is_vite_preview === "undefined") {
  precacheAndRoute(self.__WB_MANIFEST);
}
