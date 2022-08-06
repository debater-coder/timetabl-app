import Nav from "../Nav";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

export default () => {
  return (
    <Flex direction={"column"} width={"100vw"} height={"100vh"}>
      <Nav />
      <Box mt={20} />
      <Outlet />
    </Flex>
  );
};
