import { QueryClient } from "@tanstack/react-query";
import { useSettingsStore } from "./stores/settings";
import themeGen, { themeConfig } from "./theme";
import ReactDOM from "react-dom/client";
import { StrictMode } from "react";
import {
  ChakraProvider,
  ColorModeScript,
  createStandaloneToast,
} from "@chakra-ui/react";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  PersistQueryClientProvider,
  Persister,
} from "@tanstack/react-query-persist-client";
import { RouterProvider } from "react-router-dom";
import { createRouter } from "./createRouter";

class UserInterface {
  constructor(
    private queryClient: QueryClient,
    private toastContainer: ReturnType<
      typeof createStandaloneToast
    >["ToastContainer"],
    private persister: Persister,
    private rootElement: HTMLElement
  ) {}

  public render = () => {
    const primary = useSettingsStore((state) => state.primary);

    const theme = themeGen(primary);

    ReactDOM.createRoot(this.rootElement).render(
      <StrictMode>
        <PersistQueryClientProvider
          client={this.queryClient}
          persistOptions={{
            persister: this.persister,
            maxAge: Infinity,
            dehydrateOptions: {
              shouldDehydrateQuery: () => true,
            },
          }}
        >
          <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={themeConfig.initialColorMode} />
            <RouterProvider router={createRouter()} />
            <this.toastContainer />
            <ReactQueryDevtools initialIsOpen={false} />
          </ChakraProvider>
        </PersistQueryClientProvider>
      </StrictMode>
    );
  };
}

export default UserInterface;
