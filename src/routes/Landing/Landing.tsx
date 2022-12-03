import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Container,
  Flex,
  Text,
  Stack,
  useColorModeValue,
  ButtonGroup,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "@fontsource/poppins";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { TimetablLogo } from "../../components/Nav/Nav";
import { FaGithub } from "react-icons/fa";
import { Envelope } from "phosphor-react";

export default () => {
  const navigate = useNavigate();
  const { loggedIn, shouldRedirect } = useAuth();

  useEffect(() => {
    if (loggedIn && shouldRedirect) {
      navigate("/app");
    }
  }, [loggedIn, navigate, shouldRedirect]);

  return (
    <>
      <Container maxW={"7xl"}>
        <Alert status="warning" rounded={"full"}>
          <AlertIcon />
          <AlertTitle>Timetabl is currently in alpha testing.</AlertTitle>
          <AlertDescription>
            Some features may be missing or not work correctly.
          </AlertDescription>
        </Alert>
        <Hero />
      </Container>
      <Flex
        w="full"
        borderTop={"1px"}
        borderTopColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container maxW={"7xl"} p={10}>
          <Features />
        </Container>
      </Flex>
      <Flex
        w="full"
        borderTop={"1px"}
        borderTopColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container as="footer" role="contentinfo" maxW={"7xl"} py={10}>
          <Stack spacing={{ base: "4", md: "5" }}>
            <Stack justify="space-between" direction="row" align="center">
              <TimetablLogo
                color={useColorModeValue("primary.700", "primary.200")}
                loggedIn={false}
              />
              <ButtonGroup variant="ghost" colorScheme={"gray"}>
                <IconButton
                  as="a"
                  href="mailto:feedback.timetabl@outlook.com"
                  aria-label="LinkedIn"
                  icon={<Envelope fontSize="1.25rem" />}
                />
                <IconButton
                  as="a"
                  href="https://github.com/debater-coder/timetabl-app"
                  aria-label="GitHub"
                  icon={<FaGithub fontSize="1.25rem" />}
                />
              </ButtonGroup>
            </Stack>
            <Text fontSize="sm" color="subtle">
              &copy; {new Date().getFullYear()}, Hamzah Ahmed under{" "}
              <Link
                href="https://github.com/debater-coder/timetabl-app/blob/main/LICENSE"
                color={"primary.500"}
                isExternal
              >
                MIT License.
              </Link>
            </Text>
          </Stack>
        </Container>
      </Flex>
    </>
  );
};
