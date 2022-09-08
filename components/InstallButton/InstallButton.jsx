import { Button, Icon, Tooltip } from "@chakra-ui/react";
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
    <>
      <Tooltip
        closeOnClick={false}
        label="Installing Timetabl takes up no extra storage and it allows for easier access."
      >
        <Icon boxSize={5} mr={2} />
      </Tooltip>
      <Button
        mr={1}
        onClick={async () => {
          deferredPrompt.current.prompt();
          deferredPrompt.current = null;
        }}
      >
        Install
      </Button>
    </>
  ) : (
    ""
  );
}
