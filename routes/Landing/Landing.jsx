import {
  Badge,
  Flex,
  Heading,
  IconButton,
  Link,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { FaGithub, FaMoon, FaSun } from "react-icons/all";

const Nav = () => {
  const { toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("primary.700", "primary.200");
  const iconColor = useColorModeValue("black", "white");
  const icon = useColorModeValue(<FaMoon />, <FaSun />);

  return (
    <Flex
      as="nav"
      align="center"
      wrap="wrap"
      w="100%"
      h="70%"
      mb={8}
      p={8}
      bg={"transparent"}
      color={textColor}
    >
      <Link fontWeight="medium" href={"/"}>
        Timetabl
      </Link>
      &nbsp;
      <Badge colorScheme={"teal"} variant={"subtle"}>
        Alpha
      </Badge>
      <Spacer />
      <Flex>
        <IconButton
          onClick={toggleColorMode}
          aria-label="Dark mode"
          color={iconColor}
          icon={icon}
          mr={1}
        />
        <a href="https://github.com/debater-coder/timetabl">
          <IconButton
            color={iconColor}
            icon={<FaGithub />}
            aria-label="Github Repository"
          />
        </a>
      </Flex>
    </Flex>
  );
};

export default () => (
  <div>
    <Nav />
    <Heading>Landing</Heading>
    <Link to={"/app"} as={RouterLink}>
      Login
    </Link>
  </div>
);
