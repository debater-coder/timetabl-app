import Nav from "../Nav";
import { Outlet } from "react-router-dom";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

export default () => {
  return (
    <Flex
      direction={"column"}
      width={"100vw"}
      maxW="full"
      height={"100vh"}
      bgGradient={`linear-gradient(0deg, transparent 30%, transparent 80%, ${useColorModeValue(
        "primary.100",
        "primary.900"
      )} 100%)`}
    >
      <Nav />
      <Box mt={"100px"} />
      <Flex direction={"column"} w="full" h="full" maxH={"calc(100% - 100px)"}>
        <Outlet />
      </Flex>
    </Flex>
  );
};
