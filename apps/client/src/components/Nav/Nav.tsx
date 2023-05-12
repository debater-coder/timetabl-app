import {
  Flex,
  Heading,
  IconButton,
  Spacer,
  Tooltip,
  useColorMode,
  useColorModeValue,
  Icon,
  useToken,
} from "@chakra-ui/react";
import { FaGithub, FaMoon, FaSun, MdLogout, MdSettings } from "react-icons/all";
import { Link as RouterLink, useLocation } from "react-router-dom";
import RefetchingIndicator from "../RefetchingIndicator";
import { NavButton } from "../NavButton";
import React, { useState } from "react";
import { CloseIcon } from "@chakra-ui/icons";
import { authActions, useIsLoggedIn } from "../../stores/auth";
import { useQueryClient } from "@tanstack/react-query";

export const TimetablLogo = ({
  color,
  loggedIn,
}: {
  color: string;
  loggedIn: boolean;
}) => (
  <RouterLink to={loggedIn ? "/app" : "/"}>
    <Flex align={"center"}>
      <Icon viewBox="0 0 1000 1000" boxSize={"2rem"} mr={2}>
        <rect
          width="1000"
          height="1000"
          rx="350"
          ry="350"
          fill={useToken("colors", "primary.200")}
        ></rect>
        <g transform="matrix(1.0666666666666667,0,0,1.0666666666666667,100,100)">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            width="750"
            height="750"
          >
            <svg
              width="750"
              height="750"
              viewBox="0 0 750 750"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="375"
                cy="375"
                r="375"
                fill={useToken("colors", "primary.200")}
              ></circle>
              <path
                d="M247 151C247 133.33 261.3 119 279 119C296.7 119 311 133.33 311 151V183H439V151C439 133.33 453.3 119 471 119C488.7 119 503 133.33 503 151V183H551C577.5 183 599 204.49 599 231V279H151V231C151 204.49 172.49 183 199 183H247V151ZM599 583C599 609.5 577.5 631 551 631H199C172.49 631 151 609.5 151 583V311H599V583Z"
                fill="#171923"
              ></path>
            </svg>
          </svg>
        </g>
      </Icon>
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
const GithubBTN = ({ iconColor }: { iconColor: string }) => (
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
const DarkModeBTN = ({
  toggleColorMode,
  iconColor,
  icon,
}: {
  toggleColorMode: () => void;
  iconColor: string;
  icon: React.ReactElement;
}) => (
  <IconButton
    onClick={toggleColorMode}
    aria-label="Dark mode"
    color={iconColor}
    icon={icon}
    mr={1}
    colorScheme={"gray"}
  />
);
export const LogoutBTN = ({
  logout,
  iconColor,
}: {
  logout: () => void;
  iconColor: string;
}) => {
  const [loggingOut, setLoggingOut] = useState(false);
  return (
    <Tooltip label={"Logout"}>
      <IconButton
        mr={1}
        isLoading={loggingOut}
        onClick={() => {
          setLoggingOut(true);
          logout();
        }}
        aria-label={"Logout"}
        color={iconColor}
        icon={<MdLogout />}
        colorScheme={"gray"}
      />
    </Tooltip>
  );
};

export const SettingsBTN = ({
  iconColor,
  pathname,
}: {
  iconColor: string;
  pathname: string;
}) => (
  <Tooltip
    label={pathname.startsWith("/app/settings") ? "Exit Settings" : "Settings"}
  >
    <RouterLink
      to={pathname.startsWith("/app/settings") ? "/app" : "/app/settings"}
    >
      <IconButton
        aria-label={"settings"}
        mr={1}
        icon={
          pathname.startsWith("/app/settings") ? <CloseIcon /> : <MdSettings />
        }
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

  const loggedIn = useIsLoggedIn();
  const { logout } = authActions;
  const queryClient = useQueryClient();
  const { pathname } = useLocation();

  return (
    <Flex
      as="nav"
      align="center"
      wrap="wrap"
      w="100%"
      h="80px"
      maxH={"80px"}
      zIndex={"sticky"}
      flexWrap="nowrap"
      p={4}
      pos="fixed"
      top={0}
      left={0}
      bg={useColorModeValue("whiteAlpha.600", "blackAlpha.600")}
      backdropFilter="auto"
      backdropBlur="36px"
      border={"1px"}
      borderColor={useColorModeValue("gray.200", "gray.700")}
    >
      <TimetablLogo color={logoColor} loggedIn={loggedIn} />
      {loggedIn && <RefetchingIndicator />}
      <Spacer />
      <Flex align="center">
        {loggedIn ? (
          <>
            <NavButton />
            <SettingsBTN iconColor={iconColor} pathname={pathname} />
            <LogoutBTN logout={() => logout()} iconColor={iconColor} />
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
