import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import themeGen, { themeConfig } from "./theme";
import registerSW from "./registerSW";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";
import { log } from "./utils/log";
import { ToastContainer, toast } from "./toast";
import "@fontsource/poppins";
import { createRouter } from "./createRouter";
import { persister, queryClient } from "./createQueryClient";
import { AuthActions, AuthStatus, useAuthStore } from "./stores/auth";
import { useSettingsStore } from "./stores/settings";
import { H } from "highlight.run";
import { version } from "../package.json";
import { OAuth2Client, OAuth2Fetch } from "@badgateway/oauth2-client";
import config from "./config";

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

/**
 * A wrapper around the `ChakraProvider` component which generates the theme from settings and passes it to the the `ChakraProvider`.
 */
const ChakraWrapper = ({ ...props }) => {
  const primary = useSettingsStore((state) => state.primary);

  const theme = themeGen(primary);

  return <ChakraProvider theme={theme} {...props} />;
};

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <StrictMode>
    <PersistQueryClientProvider
      client={queryClient}
      persistOptions={{
        persister,
        maxAge: Infinity,
        dehydrateOptions: {
          shouldDehydrateQuery: () => true,
        },
      }}
    >
      <ChakraWrapper>
        <ColorModeScript initialColorMode={themeConfig.initialColorMode} />
        <RouterProvider router={createRouter()} />
        <ToastContainer />
        <ReactQueryDevtools initialIsOpen={false} />
      </ChakraWrapper>
    </PersistQueryClientProvider>
  </StrictMode>
);

// =================
// POST RENDER TASKS
// =================

// Register service worker
registerSW();

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
