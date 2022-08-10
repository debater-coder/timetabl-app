import Nav from "../Nav";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";

export default () => {
  return (
    <Flex direction={"column"} width={"100%"} height={"100%"}>
      <Nav />
      <Box mt={20} />
      <Flex direction={"column"} ml={{ base: 0, md: 20 }}>
        <Outlet />
      </Flex>
    </Flex>
  );
};
