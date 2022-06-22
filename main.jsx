import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { createStandaloneToast } from "@chakra-ui/toast";

import App from "./components/App";
import theme from "./components/App/theme";
import Landing from "./routes/Landing";
import Main from "./routes/Main";
import registerSW from "./registerSW";

const { ToastContainer, toast } = createStandaloneToast();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <BrowserRouter>
        <Routes>
          <Route path={"/"} element={<App />}>
            <Route index element={<Landing />} />
            <Route path={"app"} element={<Main />} />
          </Route>
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

registerSW(toast);
