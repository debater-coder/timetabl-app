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

if (window.location.host === "timetabl.vercel.app") {
  window.location.href = "https://www.timetabl.app";
}

const { ToastContainer, toast } = createStandaloneToast();

export { toast };

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      refetchInterval: 5 * 60 * 1000, // 5 minutes
      refetchIntervalInBackground: true,
    },
  },
  queryCache: new QueryCache({
    onError: (error: Error) =>
      toast({
        title:
          "Something went wrong, try logging in and out if the issue persists.",
        description: error.message,
        status: "error",
        isClosable: true,
      }),
  }),
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

const ChakraWrapper = ({ ...props }) => {
  const { primary } = useSettings();

  const theme = themeGen(primary);

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

registerSW();

reportWebVitals(sendToVercelAnalytics);