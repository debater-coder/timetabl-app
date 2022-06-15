import { Button, Flex, Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

export default () => (
  <Flex align={"center"} width={"full"} direction={"column"}>
    <Heading mb={3}>Landing</Heading>
    <Button to={"/app"} as={RouterLink} colorScheme={"blue"}>
      Login
    </Button>
  </Flex>
);
