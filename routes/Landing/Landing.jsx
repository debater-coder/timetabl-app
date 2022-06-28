import { Button, Flex, Heading } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useAuth } from "../../hooks/useAuth";
import { useNavigate } from "react-router-dom";

export default () => {
  const { login, loggedIn, shouldRedirect } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (loggedIn && shouldRedirect) {
      navigate("/app");
    }
  }, [loggedIn]);

  return (
    <Flex align={"center"} width={"full"} direction={"column"}>
      <Heading mb={3}>Login To Timetabl</Heading>
      <Button onClick={login} colorScheme={"blue"}>
        Login
      </Button>
    </Flex>
  );
};
