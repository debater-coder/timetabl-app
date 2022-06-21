import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Workbox } from "workbox-window";

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

if ("serviceWorker" in navigator) {
  const wb = new Workbox("/sw.js", {
    type: import.meta.env.DEV ? "module" : "classic",
  });

  wb.register();
}
