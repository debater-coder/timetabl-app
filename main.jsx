import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";

import App from "./components/App";
import theme from "./components/App/theme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Landing from "./routes/Landing";
import Main from "./routes/Main";

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
      </BrowserRouter>
    </ChakraProvider>
  </React.StrictMode>
);

// Init service worker
if ("serviceWorker" in navigator) {
  // noinspection JSIgnoredPromiseFromCall
  navigator.serviceWorker.register("/sw.js");
}
