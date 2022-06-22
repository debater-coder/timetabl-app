import { Workbox } from "workbox-window";

const registerSW = (toast) => {
  if ("serviceWorker" in navigator) {
    const wb = new Workbox("/sw.js", {
      type: import.meta.env.DEV ? "module" : "classic",
    });

    wb.register();
  }
};

export default registerSW;
