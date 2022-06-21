import { registerRoute, Route } from "workbox-routing";
import { StaleWhileRevalidate } from "workbox-strategies";

const shellRoute = new Route(({ request, sameOrigin }) => {
  return sameOrigin && request.method === "GET";
}, new StaleWhileRevalidate());

registerRoute(shellRoute);
