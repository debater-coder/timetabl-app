import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Heading, Skeleton, Stack } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";

export default () => {
  const { loggedIn, logout, loading } = useAuth();
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
      <Skeleton mt={10} rounded={10} isLoaded={!loading}>
        Hi, human! You are now logged in.
      </Skeleton>
    </Flex>
  );
};
