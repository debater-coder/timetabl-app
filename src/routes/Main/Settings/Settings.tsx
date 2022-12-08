import {
  Flex,
  Heading,
  useToken,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { Code, Gear, Info } from "phosphor-react";
import { Outlet, Link, useLocation } from "react-router-dom";
import "@fontsource/poppins";
import { ErrorBoundary } from "../../../components/ErrorBoundary";

const MenuEntry = ({
  active,
  to,
  name,
  icon,
}: {
  active: boolean;
  to: string;
  name: string;
  icon: typeof Gear;
}) => {
  const highlightColor = useToken("colors", "primary.400") + "aa";
  return (
    <Link to={to}>
      <Flex
        bg={active && highlightColor}
        p={3}
        px={6}
        h="full"
        w="full"
        align="center"
        gap={2}
        rounded={10}
      >
        <Icon boxSize={5} as={icon} />
        <Heading size={"sm"}>{name}</Heading>
      </Flex>
    </Link>
  );
};

export default () => {
  const { pathname } = useLocation();
  return (
    <Flex
      direction={{ base: "column", md: "row" }}
      width="full"
      p={5}
      gap={3}
      h="full"
    >
      <Flex direction="column" minW={"20vw"}>
        <MenuEntry
          to="general"
          name="General"
          icon={Gear}
          active={pathname === "/app/settings/general"}
        />
        <MenuEntry
          to="developers"
          name="Developer Settings"
          active={pathname === "/app/settings/developers"}
          icon={Code}
        />
        <MenuEntry
          to="about"
          name="About"
          active={pathname === "/app/settings/about"}
          icon={Info}
        />
      </Flex>
      <Flex
        direction={"column"}
        gap={4}
        p={6}
        rounded="10"
        shadow={`inset 0 2px 4px 0 ${useColorModeValue(
          "#0000000f",
          "#ffffff0f"
        )}`}
        w="full"
        h="full"
        mb={20}
        overflowY="auto"
      >
        <ErrorBoundary>
          <Outlet />
        </ErrorBoundary>
      </Flex>
    </Flex>
  );
};
