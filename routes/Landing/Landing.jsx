import { Button, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default () => {
  const { login, loggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn) {
      navigate("/app");
    }
  }, [loggedIn]);

  return (
    <Flex align={"center"} width={"full"} direction={"column"}>
      <Heading mb={3}>Landing</Heading>
      <Button onClick={login} colorScheme={"blue"}>
        Login
      </Button>
    </Flex>
  );
};
