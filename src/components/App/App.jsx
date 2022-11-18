import Nav from "../Nav";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

export default () => {
  return (
    <Flex direction={"column"} width={"100vw"} maxW="full" height={"100vh"}>
      <Nav />
      <Box mt={"81px"} />
      <Flex direction={"column"} w="full" h="full" maxH={"calc(100% - 81px)"}>
        <Outlet />
      </Flex>
    </Flex>
  );
};
