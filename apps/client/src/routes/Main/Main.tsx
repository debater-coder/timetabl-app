import { version } from "../../../package.json";
import { BottomNav } from "../../components/BottomNav";
import ReleaseNotes from "../../components/ReleaseNotes/ReleaseNotes";
import Sidebar from "../../components/Sidebar";
import { useAuthActions } from "../../services/UserInterface";
import { useIsLoggedIn } from "../../stores/auth";
import {
  Flex,
  useBreakpointValue,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  Button,
  Heading,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

export default function Main() {
  const navigate = useNavigate();
  const loggedIn = useIsLoggedIn();
  const { logout } = useAuthActions();
  const isLargerThanMd = useBreakpointValue({ base: false, md: true });
  const { onOpen, isOpen, onClose } = useDisclosure();

  useEffect(() => {
    const storedVersion = localStorage.getItem("appVersion");

    if (
      storedVersion !== version &&
      localStorage.getItem("consentedToWelcomeMessage")
    ) {
      onOpen();
      localStorage.setItem("appVersion", version);
    }
  });

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  const consent = () => {
    localStorage.setItem("consentedToWelcomeMessage", "true");
    window.location.reload(); // We reload instead of just closing the dialog so that the analytics can be initialised
  };

  return (
    <>
      <Flex
        align={"center"}
        width={"full"}
        height={"full"}
        direction={{ base: "column-reverse", md: "row" }}
      >
        {isLargerThanMd ? <Sidebar /> : <BottomNav />}
        <Flex
          direction={"column"}
          align={"center"}
          width={"full"}
          height={"full"}
          maxH={{ base: "calc(100% - 64px)", md: "100%" }}
          mb={{ base: "64px", md: 0 }}
          maxW={{ base: "100%", md: "calc(100% - 100px)" }}
          ml={{ base: 0, md: "100px" }}
          overflowY={"auto"}
        >
          <Outlet />
        </Flex>
        <Modal
          closeOnOverlayClick={false}
          isOpen={localStorage.getItem("consentedToWelcomeMessage") !== "true"}
          onClose={() => {
            /** void */
          }}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontFamily="Poppins, sans-serif">
              Welcome to Timetabl!
            </ModalHeader>
            <ModalBody pb={6}>
              <Heading size="xs" pb={4} fontWeight="regular">
                By continuing, you consent to Timetabl sending anonymous error
                diagnostics and usage metrics.
              </Heading>
              Timetabl is a blazing fast, offline-enabled, installable timetable
              app for Sydney Boys High School, made by Hamzah Ahmed. It is
              currently in beta, meaning that some features may not work as
              expected and there may be bugs. It is in active development, with
              new features being added and bugs being fixed regularly. If there
              is a feature you&apos;d like to see, or a bug that needs to be
              fixed, send feedback by clicking on Feedback in the left panel on
              desktop or by clicking on More {">"} Feedback on mobile.
            </ModalBody>

            <ModalFooter gap={2}>
              <Button onClick={logout} colorScheme="red" variant={"outline"}>
                {"Don't accept"}
              </Button>
              <Button onClick={consent}>Accept and continue</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
      <ReleaseNotes onClose={onClose} isOpen={isOpen} />
    </>
  );
}
