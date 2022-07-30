import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./components/App/theme";
import registerSW from "./registerSW";
import { Compose, withProps } from "./utils/contextualise";
import { AuthProvider } from "./hooks/useAuth";
import Routes from "./components/Routes";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

const persister = createSyncStoragePersister({
  storage: window.localStorage,
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <Compose
    components={[
      StrictMode,
      withProps(ChakraProvider, { theme }),
      AuthProvider,
      withProps(PersistQueryClientProvider, {
        client: queryClient,
        persistOptions: { persister },
      }),
    ]}
  >
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
    <ReactQueryDevtools initialIsOpen={false} />
  </Compose>
);

registerSW();
