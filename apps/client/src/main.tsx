import config from "./config";
import NetworkError from "./errors/NetworkError";
import { UnauthorizedError } from "./errors/UnauthorisedError";
import "./index.css";
import reportWebVitals from "./reportWebVitals";
import AppRouter from "./services/AppRouter/";
import OAuth2Actions from "./services/OAuth2Actions";
import SWRegistration from "./services/SWRegistration";
import Toast from "./services/Toast/";
import UserInterface from "./services/UserInterface";
import { AuthStatus, useAuthStore } from "./stores/auth";
import { log } from "./utils/log";
import { sendToVercelAnalytics } from "./vitals";
import { OAuth2Client, OAuth2Fetch } from "@badgateway/oauth2-client";
import "@fontsource/poppins";
import * as Sentry from "@sentry/react";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { inject } from "@vercel/analytics";

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
      gcTime: Infinity,
      refetchInterval: 5 * 60 * 1000, // 5 minutes
      refetchIntervalInBackground: true,
      networkMode: "always",
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (
        error instanceof Error &&
        !(error instanceof UnauthorizedError) &&
        !(error instanceof NetworkError)
      ) {
        toast.notify({
          title:
            "Something went wrong, try logging in and out if the issue persists.",
          message: error.message,
          status: "error",
        });
      }
    },
  }),
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const oauthClient = new OAuth2Client({
  server: "https://auth.sbhs.net.au/",
  clientId: config.client_id,
  authorizationEndpoint: config.authorization_endpoint,
});

const fetchWrapperInjector = () =>
  new OAuth2Fetch({
    client: oauthClient,

    getNewToken: () => {
      log("getNewToken invoked");

      // Set the status to expired
      useAuthStore.setState({ status: AuthStatus.EXPIRED });

      return null; // Fail this step, we don't want to log out until the user does so explicitly
    },

    storeToken: (token) => {
      useAuthStore.setState({
        token,
      });
    },

    getStoredToken: () => {
      return useAuthStore.getState().token;
    },
  });

const authActions = new OAuth2Actions(
  useAuthStore,
  queryClient,
  oauthClient,
  fetchWrapperInjector,
  toast
);

const swRegistration = new SWRegistration(toast);

const router = new AppRouter();

const userInterface = new UserInterface(
  queryClient,
  toast,
  persister,
  document.getElementById("root") as HTMLElement,
  authActions,
  router
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

authActions.resolve();

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
