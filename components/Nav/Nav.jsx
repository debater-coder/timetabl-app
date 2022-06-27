import {
  Flex,
  Heading,
  IconButton,
  Image,
  Spacer,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub, FaMoon, FaSun, MdLogout } from "react-icons/all";
import { Link as RouterLink } from "react-router-dom";
import React from "react";
import { useAuth } from "../../hooks/useAuth";

const TimetablLogo = ({ color }) => (
  <RouterLink to={"/"}>
    <Flex align={"center"}>
      <Image
        src={"/favicon.svg"}
        alt={"Timetabl Logo"}
        height={"100%"}
        boxSize={"2rem"}
        mr={2}
      />
      <Heading size={"xs"} color={color}>
        Timetabl
      </Heading>
    </Flex>
  </RouterLink>
);
const GithubBTN = ({ iconColor }) => (
  <a href="https://github.com/debater-coder/timetabl-app">
    <IconButton
      color={iconColor}
      icon={<FaGithub />}
      aria-label="Github Repository"
    />
  </a>
);
const DarkModeBTN = ({ toggleColorMode, iconColor, icon }) => (
  <IconButton
    onClick={toggleColorMode}
    aria-label="Dark mode"
    color={iconColor}
    icon={icon}
    mr={1}
  />
);
const LogoutBTN = ({ logout, iconColor }) => (
  <IconButton
    onClick={logout}
    aria-label={"Logout"}
    color={iconColor}
    icon={<MdLogout />}
  />
);

export default () => {
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("blue.700", "blue.200");
  const iconColor = useColorModeValue("black", "white");
  const colorModeIcon = useColorModeValue(<FaMoon />, <FaSun />);

  const { loggedIn, logout } = useAuth();

  return (
    <Flex as="nav" align="center" wrap="wrap" w="100%" h="80px" p={4}>
      <TimetablLogo color={logoColor} />
      <Spacer />
      <Flex>
        <DarkModeBTN
          iconColor={iconColor}
          icon={colorModeIcon}
          toggleColorMode={toggleColorMode}
        />
        {loggedIn ? (
          <LogoutBTN logout={logout} />
        ) : (
          <GithubBTN iconColor={iconColor} />
        )}
      </Flex>
    </Flex>
  );
};
