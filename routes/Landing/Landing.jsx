import { Button, Flex, Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { useAuth } from "../../hooks/useAuth";

export default () => {
  const { login } = useAuth();

  return (
    <Flex align={"center"} width={"full"} direction={"column"}>
      <Heading mb={3}>Landing</Heading>
      <Button onClick={login} colorScheme={"blue"}>
        Login
      </Button>
    </Flex>
  );
};
