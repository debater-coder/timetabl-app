import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Flex, Skeleton } from "@chakra-ui/react";
import { useAuth } from "../../hooks/useAuth";

export default () => {
  const { loggedIn, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/");
    }
  }, [loggedIn]);

  return (
    <Flex align={"center"} width={"full"} direction={"column"}>
      <Skeleton mt={10} rounded={10} isLoaded={!loading}>
        G'day, user! You are now logged in.
      </Skeleton>
    </Flex>
  );
};
