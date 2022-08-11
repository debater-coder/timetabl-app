import {
  Flex,
  Heading,
  useToken,
  useColorModeValue,
  Icon,
} from "@chakra-ui/react";
import { Code, Info, PaintBrush } from "phosphor-react";
import { Outlet, Link, useLocation } from "react-router-dom";

const MenuEntry = ({ active, to, name, icon }) => {
  return (
    <Link to={to}>
      <Flex
        bg={
          active &&
          useToken("colors", useColorModeValue("blue.600", "blue.400")) + "aa"
        }
        p={3}
        h="full"
        w="full"
        align="center"
        gap={2}
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
    <Flex direction={{ base: "column", md: "row" }} width="full" p={5} gap={3}>
      <Flex outline={"1px solid"} direction="column" rounded={3}>
        <MenuEntry
          to="appearance"
          name="Appearance"
          icon={PaintBrush}
          active={pathname === "/app/settings/appearance"}
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
      <Outlet />
    </Flex>
  );
};
