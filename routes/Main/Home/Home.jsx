import React from "react";
import { Skeleton } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";

export default () => {
  const { loading } = useAuth();
  return (
    <Skeleton isLoaded={!loading} rounded={10}>
      G'day user, you are now logged in!
    </Skeleton>
  );
};
