import { Alert, AlertTitle, Button } from "@chakra-ui/react";
import { Workbox } from "workbox-window";
import { toast } from "./main";
import { log } from "./utils/log";

const promptForUpdate = (skipWaiting: () => void) => {
  toast({
    position: "bottom-left",
    duration: 9000,
    render: () => (
      <Alert status="info">
        <AlertTitle> A new version is available! </AlertTitle>
        <Button
          onClick={() => {
            log("update accepted");
            skipWaiting();
          }}
        >
          Reload
        </Button>
      </Alert>
    ),
  });
};

const registerSW = () => {
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

      // When `event.wasWaitingBeforeRegister` is true, a previously
      // updated service worker is still waiting.
      // You may want to customize the UI prompt accordingly.

      // This code assumes your app has a promptForUpdate() method,
      // which returns true if the user wants to update.
      // Implementing this is app-specific; some examples are:
      // https://open-ui.org/components/alert.research or
      // https://open-ui.org/components/toast.research
      promptForUpdate(() => wb.messageSkipWaiting);
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

export default registerSW;
