import { Workbox } from "workbox-window";
import { Alert, AlertTitle, Button } from "@chakra-ui/react";

const promptForUpdate = (toast) => {
  return new Promise((resolve) => {
    toast({
      duration: 9000,
      render: () => (
        <Alert status="info">
          <AlertTitle> A new version is available! </AlertTitle>
          <Button onClick={resolve(true)}> Reload </Button>
        </Alert>
      ),
    });
    setTimeout(() => resolve(false), 9000);
  });
};

const registerSW = (toast) => {
  if ("serviceWorker" in navigator) {
    const wb = new Workbox("/sw.js", {
      type: import.meta.env.DEV ? "module" : "classic",
    });

    const showSkipWaitingPrompt = async (event) => {
      wb.addEventListener("controlling", () => {
        window.location.reload();
      });

      const updateAccepted = await promptForUpdate(toast);

      if (updateAccepted) {
        wb.messageSkipWaiting();
      }
    };

    // Add an event listener to detect when the registered
    // service worker has installed but is waiting to activate.
    wb.addEventListener("waiting", (event) => {
      showSkipWaitingPrompt(event);
    });

    wb.register();
  }
};

export default registerSW;
