import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Container,
  Flex,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { AuthStatus, useAuthStatus } from "../../stores/auth";
import { useNavigate } from "react-router-dom";
import { Hero } from "./Hero";
import { Features } from "./Features";
import { Footer } from "./Footer";

export default () => {
  const navigate = useNavigate();
  const status = useAuthStatus();

  useEffect(() => {
    if (status === AuthStatus.LOGGED_IN) {
      navigate("/app");
    }
  }, [status, navigate]);

  return (
    <>
      <Container maxW={"7xl"}>
        <Alert status="info" rounded={"full"}>
          <AlertIcon />
          <AlertTitle>Timetabl is currently in beta testing.</AlertTitle>
          <AlertDescription>Features are not yet complete.</AlertDescription>
        </Alert>
        <Hero />
      </Container>
      <Flex
        w="full"
        borderTop={"1px"}
        borderTopColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container maxW={"7xl"} p={10}>
          <Heading fontFamily={"Poppins, sans-serif"} textAlign="center" mb={5}>
            Features
          </Heading>
          <Features />
        </Container>
      </Flex>
      <Flex
        w="full"
        borderTop={"1px"}
        borderTopColor={useColorModeValue("gray.200", "gray.700")}
      >
        <Container as="footer" role="contentinfo" maxW={"7xl"} py={10}>
          <Footer />
        </Container>
      </Flex>
    </>
  );
};
