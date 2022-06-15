import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Button, Heading, Link } from "@chakra-ui/react";

export default () => (
  <div>
    <Heading>Main</Heading>
    <Button colorScheme={"blue"} to={"/"} as={RouterLink}>
      Logout
    </Button>
  </div>
);
