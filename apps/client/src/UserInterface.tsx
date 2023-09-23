import { QueryClient } from "@tanstack/react-query";
import { useSettingsStore } from "./stores/settings";
import themeGen, { themeConfig } from "./theme";
import ReactDOM from "react-dom/client";
import { StrictMode, createContext, useContext } from "react";
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
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { AuthActions } from "./stores/auth";

const AuthActionsContext = createContext<AuthActions | null>(null);

export const useAuthActions = () => {
  const actions = useContext(AuthActionsContext);
  if (actions === null) {
    throw new Error(
      "useAuthActions must be used within an AuthActionsProvider"
    );
  }
  return actions;
};

const ChakraWrapper = ({ children }: { children: React.ReactNode }) => {
  const primary = useSettingsStore((state) => state.primary);
  const theme = themeGen(primary);

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

class UserInterface {
  constructor(
    private queryClient: QueryClient,
    private toastContainer: ReturnType<
      typeof createStandaloneToast
    >["ToastContainer"],
    private persister: Persister,
    private rootElement: HTMLElement,
    private actions: AuthActions,
    private router: ReturnType<typeof createBrowserRouter>
  ) {}

  public render = () => {
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
          <ChakraWrapper>
            <ColorModeScript initialColorMode={themeConfig.initialColorMode} />
            <AuthActionsContext.Provider value={this.actions}>
              <RouterProvider router={this.router} />
            </AuthActionsContext.Provider>
            <this.toastContainer />
            <ReactQueryDevtools initialIsOpen={false} />
          </ChakraWrapper>
        </PersistQueryClientProvider>
      </StrictMode>
    );
  };
}

export default UserInterface;
