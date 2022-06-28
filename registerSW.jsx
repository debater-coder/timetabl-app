import { Workbox } from "workbox-window";
import React from "react";

const registerSW = () => {
  if ("serviceWorker" in navigator) {
    const wb = new Workbox("/sw.js", {
      type: import.meta.env.DEV ? "module" : "classic",
    });

    void wb.register();
  }
};

export default registerSW;
