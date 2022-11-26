import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import themeGen from "./theme";
import registerSW from "./registerSW";
import { Compose, withProps } from "./utils/contextualise";
import { AuthProvider } from "./hooks/useAuth";
import Routes from "./components/Routes";
import { QueryClient, QueryCache } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { createStandaloneToast } from "@chakra-ui/toast";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";
import useSettings, { SettingsProvider } from "./hooks/useSettings";
import { inject } from "@vercel/analytics";
import { log } from "./utils/log";
import { UnauthorizedError } from "./errors/UnauthorisedError";
import NetworkError from "./errors/NetworkError";

// Redirect to new domain if using old domain
if (window.location.host === "timetabl.vercel.app") {
  window.location.href = "https://www.timetabl.app";
}

// ===========================
// QUERY CLIENT INITIALISATION
// ===========================

const { ToastContainer, toast } = createStandaloneToast();

export { toast };

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
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

// ===========
// RENDER ROOT
// ===========

/**
 * A wrapper around the `ChakraProvider` component which generates the theme from settings and passes it to the the `ChakraProvider`.
 */
const ChakraWrapper = ({ ...props }) => {
  const { primary } = useSettings();

  const theme = themeGen(primary as keyof typeof themeGen);

  return <ChakraProvider theme={theme} {...props} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
  <Compose
    components={[
      StrictMode,
      withProps(PersistQueryClientProvider, {
        client: queryClient,
        persistOptions: {
          persister,
          maxAge: Infinity,
          dehydrateOptions: {
            shouldDehydrateQuery: () => true,
          },
        },
      }),
      SettingsProvider,
      ChakraWrapper,
      AuthProvider,
    ]}
  >
    <ColorModeScript initialColorMode={themeGen().config.initialColorMode} />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <ToastContainer />
    <ReactQueryDevtools initialIsOpen={false} />
  </Compose>
);

// =================
// POST RENDER TASKS
// =================

// Register service worker
registerSW();

// Report web vitals
reportWebVitals(sendToVercelAnalytics);

// Inject analytics
inject({
  beforeSend: (event) => ({ ...event, url: "https://www.timetabl.app" }),
});

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
