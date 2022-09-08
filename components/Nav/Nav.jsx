import {
  Flex,
  Heading,
  IconButton,
  Image,
  Spacer,
  Tooltip,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import { FaGithub, FaMoon, FaSun, MdLogout, MdSettings } from "react-icons/all";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";
import "@fontsource/poppins";
import RefetchingIndicator from "../RefetchingIndicator";
import InstallButton from "../InstallButton";

const TimetablLogo = ({ color, loggedIn }) => (
  <RouterLink to={loggedIn ? "/app" : "/"}>
    <Flex align={"center"}>
      <Image
        src={"/favicon.svg"}
        alt={"Timetabl Logo"}
        height={"100%"}
        boxSize={"2rem"}
        mr={2}
      />
      <Heading
        size={"xs"}
        color={color}
        fontFamily={"Poppins, sans-serif"}
        fontWeight={"regular"}
      >
        Timetabl
      </Heading>
    </Flex>
  </RouterLink>
);
const GithubBTN = ({ iconColor }) => (
  <a href="https://github.com/debater-coder/timetabl-app">
    <IconButton
      mr={1}
      color={iconColor}
      icon={<FaGithub />}
      aria-label="Github Repository"
      colorScheme={"gray"}
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
    colorScheme={"gray"}
  />
);
const LogoutBTN = ({ logout, iconColor }) => (
  <Tooltip label={"Logout"}>
    <IconButton
      mr={1}
      onClick={logout}
      aria-label={"Logout"}
      color={iconColor}
      icon={<MdLogout />}
      colorScheme={"gray"}
    />
  </Tooltip>
);

const SettingsBTN = ({ iconColor }) => (
  <Tooltip label={"Settings"}>
    <RouterLink to={"/app/settings"}>
      <IconButton
        aria-label={"settings"}
        mr={1}
        icon={<MdSettings />}
        color={iconColor}
        colorScheme={"gray"}
      />
    </RouterLink>
  </Tooltip>
);

export default () => {
  const { toggleColorMode } = useColorMode();
  const logoColor = useColorModeValue("primary.700", "primary.200");
  const iconColor = useColorModeValue("black", "white");
  const colorModeIcon = useColorModeValue(<FaMoon />, <FaSun />);

  const { loggedIn, logout } = useAuth();

  return (
    <Flex
      as="nav"
      align="center"
      wrap="wrap"
      w="100%"
      h="80px"
      maxH={"80px"}
      flexWrap="nowrap"
      p={4}
      pos="fixed"
      top={0}
      left={0}
      bg={useColorModeValue("white", "gray.800")}
      zIndex={999}
    >
      <TimetablLogo color={logoColor} loggedIn={loggedIn} />
      {loggedIn && <RefetchingIndicator />}
      <Spacer />
      <Flex align="center">
        {loggedIn ? (
          <>
            <InstallButton />
            <SettingsBTN iconColor={iconColor} />
            <LogoutBTN logout={logout} iconColor={iconColor} />
          </>
        ) : (
          <>
            <DarkModeBTN
              iconColor={iconColor}
              icon={colorModeIcon}
              toggleColorMode={toggleColorMode}
            />
            <GithubBTN iconColor={iconColor} />
          </>
        )}
      </Flex>
    </Flex>
  );
};
