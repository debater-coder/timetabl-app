import { Heading, Link } from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

export default () => (
  <div>
    <Heading>Landing</Heading>
    <Link to={"/app"} as={RouterLink}>
      Login
    </Link>
  </div>
);
