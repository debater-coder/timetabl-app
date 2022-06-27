import React from "react";
import Nav from "../Nav";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

export default () => {
  return (
    <Flex direction={"column"} width={"100vw"} height={"100vh"}>
      <Nav />
      <Outlet />
    </Flex>
  );
};
