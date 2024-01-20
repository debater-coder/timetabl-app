import { useIsLoggedIn } from "../../stores/auth";
import { Features } from "./Features";
import { Footer } from "./Footer";
import { Hero } from "./Hero";
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
import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  const loggedIn = useIsLoggedIn();

  useEffect(() => {
    if (loggedIn) {
      navigate("/app");
    }
  }, [loggedIn, navigate]);

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
        <Container as="footer" role="contentinfo" maxW={"7xl"} py={10}>
          <Footer />
        </Container>
      </Flex>
    </>
  );
}
