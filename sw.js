import { createHandlerBoundToURL, precacheAndRoute } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";

if (typeof is_vite_preview === "undefined") {
  precacheAndRoute(self.__WB_MANIFEST);
  const handler = createHandlerBoundToURL("/app-shell.html");
  const navigationRoute = new NavigationRoute(handler);
  registerRoute(navigationRoute);
}
