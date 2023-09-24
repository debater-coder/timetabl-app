import { Notifier } from "./interfaces/Notifier";
import { log } from "./utils/log";
import { Workbox } from "workbox-window";

class SWRegistration {
  constructor(private toast: Notifier) {}

  private promptForUpdate = (skipWaiting: () => void) => {
    this.toast.notify({
      title: "A new version is available!",
      status: "info",
      actions: [
        {
          label: "Update",
          onClick: () => {
            log("User accepted update prompt");
            skipWaiting();
          },
        },
      ],
    });
  };

  public registerSW = () => {
    if ("serviceWorker" in navigator) {
      const wb = new Workbox("/sw.js", {
        type: import.meta.env.DEV ? "module" : "classic",
      });

      const showSkipWaitingPrompt = async () => {
        // Assuming the user accepted the update, set up a listener
        // that will reload the page as soon as the previously waiting
        // service worker has taken control.
        wb.addEventListener("controlling", () => {
          // At this point, reloading will ensure that the current
          // tab is loaded under the control of the new service worker.
          // Depending on your web app, you may want to auto-save or
          // persist transient state before triggering the reload.
          window.location.reload();
        });

        this.promptForUpdate(() => wb.messageSkipWaiting());
      };

      // Add an event listener to detect when the registered
      // service worker has installed but is waiting to activate.
      wb.addEventListener("waiting", () => {
        log("A new service worker has installed, but is waiting to activate.");
        showSkipWaitingPrompt();
      });

      wb.register();
    }
  };
}

export default SWRegistration;
