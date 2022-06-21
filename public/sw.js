const version = "v1::";

self.addEventListener("install", (event) => {
  console.log("WORKER: install event in progress.");
  console.log("WORKER: install completed");
});
self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
});

self.addEventListener("fetch", function (event) {
  console.log("WORKER: fetch event in progress.");

  // Ignore GET requests
  if (event.request.method !== "GET") {
    console.log(
      "WORKER: fetch event ignored.",
      event.request.method,
      event.request.url
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => {
      const fetchedFromNetwork = (response) => {
        const cacheCopy = response.clone();
        console.log("WORKER: fetch response from network.", event.request.url);

        caches
          .open(version + "pages")
          .then((cache) => cache.put(event.request, cacheCopy))
          .then(() =>
            console.log(
              "WORKER: fetch response stored in cache.",
              event.request.url
            )
          );

        // Return the response so that the promise is settled in fulfillment.
        return response;
      };
      const unableToResolve = () => {
        console.log("WORKER: fetch request failed in both cache and network.");

        return new Response(
          "sorry u r offline u r technically not supposed to see this message...",
          {
            status: 503,
            statusText: "Service Unavailable",
            headers: new Headers({
              "Content-Type": "text/html",
            }),
          }
        );
      };

      const networked = fetch(event.request)
        .then(fetchedFromNetwork)
        .catch(unableToResolve);

      console.log(
        "WORKER: fetch event",
        cached ? "(cached)" : "(network)",
        event.request.url
      );
      return cached || networked;
    })
  );
});

self.addEventListener("activate", function (event) {
  console.log("WORKER: activate event in progress.");

  event.waitUntil(
    caches
      .keys()
      .then(function (keys) {
        // We return a promise that settles when all outdated caches are deleted.
        return Promise.all(
          keys
            .filter(function (key) {
              // Filter by keys that don't start with the latest version prefix.
              return !key.startsWith(version);
            })
            .map(function (key) {
              /* Return a promise that's fulfilled
                 when each outdated cache is deleted.
              */
              return caches.delete(key);
            })
        );
      })
      .then(function () {
        console.log("WORKER: activate completed.");
      })
  );
});
