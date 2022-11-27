import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";

if (typeof is_vite_preview === "undefined") {
  precacheAndRoute(self.__WB_MANIFEST);
  const handler = createHandlerBoundToURL("/index.html");
  const navigationRoute = new NavigationRoute(handler);
  registerRoute(navigationRoute);
}

addEventListener("message", (event) => {
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
