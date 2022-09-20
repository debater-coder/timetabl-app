import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Button,
  Flex,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "@fontsource/poppins";
import { ExternalLinkIcon } from "@chakra-ui/icons";

export default () => {
  const { login, loggedIn, shouldRedirect } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn && shouldRedirect) {
      navigate("/app");
    }
  }, [loggedIn]);

  return (
    <Flex align={"center"} mx="auto" maxW="80%" direction={"column"} gap={3}>
      <Flex align={"center"}>
        <Heading mb={3} fontFamily="Poppins, sans-serif">
          Welcome to Timetabl&nbsp;
        </Heading>
        <Badge fontSize={"2xl"} variant="subtle">
          ALPHA
        </Badge>
      </Flex>
      <Text textAlign={"center"}>
        Timetabl is now in alpha testing state. We are now open for feedback,
        feature requests, and bug reports. Join the{" "}
        <Link
          href="https://join.slack.com/t/timetabl/shared_invite/zt-1dhr2v791-G0IDTb~kLRXT~0vjmyEtmw"
          isExternal
          color="teal.500"
        >
          slack group <ExternalLinkIcon mx="2px" />
        </Link>{" "}
        for updates, to ask questions, and generally discuss Timetabl. Be sure
        to check out the{" "}
        <Link
          href="https://github.com/debater-coder/timetabl-app"
          isExternal
          color="teal.500"
        >
          GitHub repo <ExternalLinkIcon mx="2px" />
        </Link>{" "}
        for the code, to report bugs, and to contribute to Timetabl. Timetabl
        also has a news page for updates and announcements.
      </Text>
      <Alert status="warning" rounded={5} maxW="max-content">
        <AlertIcon />
        <AlertTitle>Disclaimer</AlertTitle>
        <AlertDescription>
          This is an alpha release, meaning the software will have bugs and
          unforeseen problems. Use at your own risk.
        </AlertDescription>
      </Alert>
      <Button onClick={login}>Login</Button>
    </Flex>
  );
};
