import React, { useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";

export default () => {
  const { loggedIn, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);
  return (
    <Flex align={"center"} width={"full"} direction={"column"}>
      <Heading mb={3}>Main</Heading>
      <Button onClick={logout} colorScheme={"blue"}>
        Logout
      </Button>
    </Flex>
  );
};
