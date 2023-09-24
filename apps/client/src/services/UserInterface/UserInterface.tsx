import { Notifier } from "../../interfaces/Notifier";
import { Router } from "../../interfaces/Router";
import { AuthActions } from "../../stores/auth";
import { useSettingsStore } from "../../stores/settings";
import themeGen, { themeConfig } from "../../theme";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  PersistQueryClientProvider,
  Persister,
} from "@tanstack/react-query-persist-client";
import { StrictMode, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";

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
    private notifier: Notifier,
    private persister: Persister,
    private rootElement: HTMLElement,
    private actions: AuthActions,
    private router: Router
  ) {}

  public render = () => {
    const NotifyContainer = this.notifier.getContainer();

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
              {this.router.getElement()}
            </AuthActionsContext.Provider>
            <NotifyContainer />
            <ReactQueryDevtools initialIsOpen={false} />
          </ChakraWrapper>
        </PersistQueryClientProvider>
      </StrictMode>
    );
  };
}

export default UserInterface;
