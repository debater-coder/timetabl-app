import { createStandaloneToast } from "@chakra-ui/react";
import SWRegistration from "./SWRegistration";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";
import { log } from "./utils/log";
import "@fontsource/poppins";
import { AuthActions, AuthStatus, useAuthStore } from "./stores/auth";
import { H } from "highlight.run";
import { version } from "../package.json";
import { OAuth2Client, OAuth2Fetch } from "@badgateway/oauth2-client";
import config from "./config";
import { QueryCache, QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import NetworkError from "./errors/NetworkError";
import { UnauthorizedError } from "./errors/UnauthorisedError";
import UserInterface from "./UserInterface";
import AppRouter from "./AppRouter";

// Redirect to new domain if using old domain
if (window.location.host === "timetabl.vercel.app") {
  window.location.href = "https://www.timetabl.app";
}

// Initialise analytics if consented
if (localStorage.getItem("consentedToWelcomeMessage")) {
  H.init("zg092lg9", {
    enableStrictPrivacy: true,
    version,
    reportConsoleErrors: true,
    environment: import.meta.env.MODE,
  });
}

// ===========
// RENDER ROOT
// ===========

const { ToastContainer, toast } = createStandaloneToast();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      refetchInterval: 5 * 60 * 1000, // 5 minutes
      refetchIntervalInBackground: true,
      networkMode: "always",
      useErrorBoundary: (error, query) =>
        !(error instanceof UnauthorizedError) &&
        !(error instanceof NetworkError) &&
        !query.state.data,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (
        error instanceof Error &&
        !(error instanceof UnauthorizedError) &&
        !(error instanceof NetworkError)
      ) {
        toast({
          title:
            "Something went wrong, try logging in and out if the issue persists.",
          description: error.message,
          status: "error",
          isClosable: true,
        });
      }
    },
  }),
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const oauthClient = new OAuth2Client({
  server: "https://student.sbhs.net.au",
  clientId: config.client_id,
  tokenEndpoint: "/api/token",
  authorizationEndpoint: config.authorization_endpoint,
});

const fetchWrapper = new OAuth2Fetch({
  client: oauthClient,

  getNewToken: () => {
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

const authActions = new AuthActions(
  useAuthStore,
  queryClient,
  oauthClient,
  fetchWrapper,
  toast
);

const swRegistration = new SWRegistration(toast);

const router = new AppRouter();

const userInterface = new UserInterface(
  queryClient,
  ToastContainer,
  persister,
  document.getElementById("root") as HTMLElement,
  authActions,
  router
);

// =======
// EXECUTE
// =======

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

console.log(
  "SELF-XSS WARNING - PLEASE DON'T DO PASTE ANYTHING INTO HERE FROM PLACES YOU DON'T TRUST!!!"
);
// Initialise authentication
addEventListener("load", () => {
  authActions.resolve();
});
