import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import theme from "./components/App/theme";
import registerSW from "./registerSW";
import { Compose, withProps } from "./utils/contextualise";
import { AuthProvider } from "./hooks/useAuth";
import Routes from "./components/Routes";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Compose
    components={[
      React.StrictMode,
      withProps(ChakraProvider, { theme }),
      AuthProvider,
    ]}
  >
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Compose>
);

registerSW();
