import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Heading, Link } from "@chakra-ui/react";

export default () => (
  <div>
    <Heading>Main</Heading>
    <Link to={"/"} as={RouterLink}>
      Logout
    </Link>
  </div>
);
