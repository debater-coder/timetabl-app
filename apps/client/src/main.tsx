import "./index.css";
import reportWebVitals from "./reportWebVitals";
import AppRouter from "./services/AppRouter/";
import { DataAmalgamator } from "./services/DataAmalgamator";
import SWRegistration from "./services/SWRegistration";
import Toast from "./services/Toast/";
import UserInterface from "./services/UserInterface";
import { TestDataProvider } from "./services/dataProviders/TestDataProvider/TestDataProvider";
import { log } from "./utils/log";
import { sendToVercelAnalytics } from "./vitals";
import "@fontsource/poppins";
import * as Sentry from "@sentry/react";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { inject } from "@vercel/analytics";
import superjson from "superjson";

// Redirect to new domain if using old domain
if (window.location.host === "timetabl.vercel.app") {
  window.location.href = "https://www.timetabl.app";
}

// Initialise analytics if consented
if (localStorage.getItem("consentedToWelcomeMessage")) {
  Sentry.init({
    dsn: "https://3eaf1d52758e5e86de9d4d6a4958a5e3@o4506133038301184.ingest.sentry.io/4506133044723712",
    integrations: [new Sentry.BrowserTracing(), new Sentry.Replay()],
    // Performance Monitoring
    tracesSampleRate: 1.0, // Capture 100% of the transactions
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
  });
}

// ================
// COMPOSITION ROOT
// ================

const toast = new Toast();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchInterval: 5 * 60 * 1000, // 5 minutes
      refetchIntervalInBackground: true,
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
  serialize: (data) => superjson.stringify(data),
  deserialize: (data) => superjson.parse(data),
});

const swRegistration = new SWRegistration(toast);

const router = new AppRouter();

const dataAmalgamator = new DataAmalgamator();

const dataProvider = new TestDataProvider("test");

dataAmalgamator.addDataProvider(dataProvider);
dataAmalgamator.setIdentityProvider("test");

const userInterface = new UserInterface(
  queryClient,
  toast,
  persister,
  document.getElementById("root") as HTMLElement,
  router,
  dataAmalgamator
);

// =======
// EXECUTE
// =======

// Initialise analytics
inject({
  beforeSend: (event) => {
    if (event.type === "pageview") {
      event.url = event.url.split("?")[0] ?? event.url;
    }
    return event;
  },
});

// Render root
userInterface.render();

// Register service worker
swRegistration.registerSW();

// Report web vitals
// eslint-disable-next-line @typescript-eslint/no-explicit-any
(reportWebVitals as any)(sendToVercelAnalytics);

// Render welcome message for devs
log(
  "%cWelcome to Timetabl",
  `color: white; border-radius: 10px; background-color: #448ae6; padding: 5px; font-size: 2rem`
);

log(
  "%cSource code can be found on https://github.com/debater-coder/timetabl-app",
  "font-size: 1rem"
);

// eslint-disable-next-line no-console
console.log(
  "SELF-XSS WARNING - PLEASE DON'T DO PASTE ANYTHING INTO HERE FROM PLACES YOU DON'T TRUST!!!"
);
