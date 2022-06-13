import {
  Flex,
  Heading,
  IconButton,
  Image,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub, FaMoon, FaSun } from "react-icons/all";
import { Link as RouterLink } from "react-router-dom";
import React from "react";

export default () => {
  const { toggleColorMode } = useColorMode();
  const textColor = useColorModeValue("blue.700", "blue.200");
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
      p={4}
      bg={"transparent"}
      color={textColor}
    >
      <RouterLink to={"/"}>
        <Flex align={"center"}>
          <Image
            src={"/favicon.svg"}
            alt={"Timetabl Logo"}
            height={"100%"}
            boxSize={"2rem"}
            mr={2}
          />
          <Heading size={"xs"}>Timetabl</Heading>
        </Flex>
      </RouterLink>
      <Spacer />
      <Flex>
        <IconButton
          onClick={toggleColorMode}
          aria-label="Dark mode"
          color={iconColor}
          icon={icon}
          mr={1}
        />
        <a href="https://github.com/debater-coder/timetabl-app">
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
