import { Heading, Link, Text } from "@chakra-ui/react";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import "@fontsource/poppins";

export default () => {
  return (
    <>
      <Heading size={"sm"} fontFamily="Poppins, sans-serif">
        version 1.0.0-alpha
      </Heading>
      <Text>
        Timetabl is a blazing fast, offline-enabled, installable timetable app
        for SBHS.
      </Text>
      <Text>
        Source code can be found on Github{" "}
        <Link
          href="https://github.com/debater-coder/timetabl-app"
          isExternal
          color={"teal.500"}
        >
          here
          <ExternalLinkIcon mx="2px" />
        </Link>
        .
      </Text>
      <Text fontSize={"sm"}>
        This is a alpha release, meaning the software will have bugs and
        unforeseen problems. Use at your own risk.
      </Text>
    </>
  );
};
