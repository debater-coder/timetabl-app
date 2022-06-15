import React from "react";
import Nav from "../Nav";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";

export default () => {
  return (
    <Flex direction={"column"}>
      <Nav />
      <Outlet />
    </Flex>
  );
};
