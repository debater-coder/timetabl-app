import { Workbox } from "workbox-window";

const registerSW = () => {
  if ("serviceWorker" in navigator) {
    const wb = new Workbox("/sw.js", {
      type: import.meta.env.DEV ? "module" : "classic",
    });

    void wb.register();
  }
};

export default registerSW;
