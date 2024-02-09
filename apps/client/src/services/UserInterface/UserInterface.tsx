import { Notifier } from "../../interfaces/Notifier";
import { Router } from "../../interfaces/Router";
import { useSettingsStore } from "../../stores/settings";
import themeGen, { themeConfig } from "../../theme";
import { DataAmalgamator } from "../DataAmalgamator";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  PersistQueryClientProvider,
  Persister,
} from "@tanstack/react-query-persist-client";
import { StrictMode, createContext, useContext } from "react";
import ReactDOM from "react-dom/client";
import { StatsigProvider } from "statsig-react";

const DataAmalgamatorContext = createContext<DataAmalgamator | null>(null);

export const useDataAmalgamator = () => {
  const dataAmalgamator = useContext(DataAmalgamatorContext);
  if (dataAmalgamator === null) {
    throw new Error(
      "useDataAmalgamator must be used within a DataAmalgamatorContext.Provider"
    );
  }
  return dataAmalgamator;
};

const ChakraWrapper = ({ children }: { children: React.ReactNode }) => {
  const primary = useSettingsStore((state) => state.primary);
  const theme = themeGen(primary);

  return <ChakraProvider theme={theme}>{children}</ChakraProvider>;
};

const StatsigWrapper = ({ children }: { children: React.ReactNode }) => {
  const consented = localStorage.getItem("consentedToWelcomeMessage");

  if (!consented) return <>{children}</>;

  return (
    <StatsigProvider
      sdkKey="client-l2xQg1ZmyZxdQROd01wYZRipYaxpHkR83Ms6gCpJaA6"
      waitForInitialization={true}
      user={{}}
    >
      {children}
    </StatsigProvider>
  );
};

class UserInterface {
  constructor(
    private queryClient: QueryClient,
    private notifier: Notifier,
    private persister: Persister,
    private rootElement: HTMLElement,
    private router: Router,
    private dataAmalgamator: DataAmalgamator
  ) {}

  public render = () => {
    const NotifyContainer = this.notifier.getContainer();

    ReactDOM.createRoot(this.rootElement).render(
      <StrictMode>
        <StatsigWrapper>
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
              <ColorModeScript
                initialColorMode={themeConfig.initialColorMode}
              />
              <DataAmalgamatorContext.Provider value={this.dataAmalgamator}>
                {this.router.getElement()}
              </DataAmalgamatorContext.Provider>
              <NotifyContainer />
              <ReactQueryDevtools initialIsOpen={false} />
            </ChakraWrapper>
          </PersistQueryClientProvider>
        </StatsigWrapper>
      </StrictMode>
    );
  };
}

export default UserInterface;
