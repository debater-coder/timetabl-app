import { useDataAmalgamator } from "../../services/UserInterface";
import { Button, Icon, Tooltip } from "@chakra-ui/react";
import { useRef, useState } from "react";

const InstallButton = () => {
  const deferredPrompt = useRef<BeforeInstallPromptEvent | null>(null);
  const [showInstall, setShowInstall] = useState(false);

  window.addEventListener(
    "beforeinstallprompt",
    (e: BeforeInstallPromptEvent) => {
      e.preventDefault();
      deferredPrompt.current = e;
      setShowInstall(true);
    }
  );

  return showInstall ? (
    <>
      <Tooltip
        closeOnClick={false}
        label="Installing Timetabl takes up no extra storage and it allows for easier access."
      >
        <Icon boxSize={4} mr={0.5} />
      </Tooltip>
      <Button
        size="sm"
        variant={"ghost"}
        mr={1}
        onClick={async () => {
          deferredPrompt.current?.prompt();
          await deferredPrompt.current?.userChoice;
          deferredPrompt.current = null;
          setShowInstall(false);
        }}
      >
        Install
      </Button>
    </>
  ) : null;
};

export const NavButton = () => {
  const shouldLogin = useAuthStatus() === AuthStatus.EXPIRED;

  const { login } = useDataAmalgamator();
  return shouldLogin ? (
    <Button size="xs" mr={2} colorScheme="orange" onClick={login}>
      Log in for the latest info
    </Button>
  ) : (
    <InstallButton />
  );
};
