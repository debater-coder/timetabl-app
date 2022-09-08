import { Button } from "@chakra-ui/react";
import { useRef, useState } from "react";

export default function installButton() {
  let deferredPrompt = useRef(null);
  const [showInstall, setShowInstall] = useState(false);

  window.addEventListener("beforeinstallprompt", (e) => {
    e.preventDefault();
    deferredPrompt.current = e;
    setShowInstall(true);
  });

  return showInstall ? (
    <Button
      mr={1}
      colorScheme="blue"
      onClick={async () => {
        deferredPrompt.current.prompt();
        deferredPrompt.current = null;
      }}
    >
      Install
    </Button>
  ) : (
    ""
  );
}
