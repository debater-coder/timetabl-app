import { StrictMode } from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import themeGen, { config } from "./theme";
import registerSW from "./registerSW";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import reportWebVitals from "./reportWebVitals";
import { sendToVercelAnalytics } from "./vitals";
import { inject } from "@vercel/analytics";
import { log } from "./utils/log";
import { ToastContainer } from "./toast";
import "@fontsource/poppins";
import { createRouter } from "./createRouter";
import { persister, queryClient } from "./createQueryClient";
import { authActions, useAuthStore } from "./stores/auth";
import { useSettingsStore } from "./stores/settings";

// Redirect to new domain if using old domain
if (window.location.host === "timetabl.vercel.app") {
  window.location.href = "https://www.timetabl.app";
}

// ===========
// RENDER ROOT
// ===========

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
        <ColorModeScript initialColorMode={config.initialColorMode} />
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

// Inject analytics
inject({
  beforeSend: (event) => ({
    ...event,
    url: window.location.origin + window.location.pathname,
  }),
});

// Resolve authentication
authActions.resolve();

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

(window as any).timetabl = {
  useSettingsStore,
  sbhsAuthActions: authActions,
  useSbhsAuthStore: useAuthStore,
};
