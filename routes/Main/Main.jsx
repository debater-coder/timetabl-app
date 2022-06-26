import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Flex, Skeleton } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";
import { useToast } from "@chakra-ui/react";

export default () => {
  const { loggedIn, loading } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  return (
    <Flex align={"center"} width={"full"} direction={"column"}>
      <Skeleton mt={10} rounded={10} isLoaded={!loading}>
        G'day, human! You are now logged in.
      </Skeleton>
    </Flex>
  );
};
