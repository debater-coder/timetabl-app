import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./components/App/theme";
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

if (window.location.host === "timetabl.vercel.app") {
  window.location = "https://www.timetabl.app";
}

const { ToastContainer, toast } = createStandaloneToast();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      refetchInterval: 5 * 60 * 1000, // 5 minutes
      refetchIntervalInBackground: true,
    },
  },
  queryCache: new QueryCache({
    onError: (error) =>
      toast({
        title: "Something went wrong",
        description: error.message,
        status: "error",
        isClosable: true,
      }),
  }),
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

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
      withProps(ChakraProvider, { theme }),
      AuthProvider,
    ]}
  >
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <ToastContainer />
    <ReactQueryDevtools initialIsOpen={false} />
  </Compose>
);

registerSW();

reportWebVitals(sendToVercelAnalytics);
