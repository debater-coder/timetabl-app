import { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  Flex,
  useBreakpointValue,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
} from "@chakra-ui/react";
import Sidebar from "../../components/Sidebar";
import { BottomNav } from "../../components/BottomNav";
import { useIsLoggedIn } from "../../stores/auth";

export default function Main() {
  const navigate = useNavigate();
  const loggedIn = useIsLoggedIn();
  const isLargerThanMd = useBreakpointValue({ base: false, md: true });
  const { isOpen, onOpen } = useDisclosure();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    if (!localStorage.getItem("consentedToWelcomeMessage")) {
      onOpen();
    }
  });

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
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={consent}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader fontFamily="Poppins, sans-serif">
              Welcome to Timetabl!
            </ModalHeader>
            <ModalCloseButton />
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

            <ModalFooter>
              <Button onClick={consent}>Continue</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Flex>
    </>
  );
}
