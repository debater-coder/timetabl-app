import { Container } from "@chakra-ui/react";
import { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import "@fontsource/poppins";
import { Hero } from "./Hero";

export default () => {
  const navigate = useNavigate();
  const { loggedIn, shouldRedirect } = useAuth();

  useEffect(() => {
    if (loggedIn && shouldRedirect) {
      navigate("/app");
    }
  }, [loggedIn, navigate, shouldRedirect]);

  return (
    <Container maxW={"7xl"}>
      <Hero />
    </Container>
  );
};
