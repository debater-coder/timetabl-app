import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Flex, Heading, Link } from "@chakra-ui/react";

export default () => (
  <Flex align={"center"} width={"full"} direction={"column"}>
    <Heading mb={3}>Main</Heading>
    <Button to={"/"} as={RouterLink} colorScheme={"blue"}>
      Logout
    </Button>
  </Flex>
);
