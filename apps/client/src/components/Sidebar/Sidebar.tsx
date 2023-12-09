import { pages } from "../../services/AppRouter/pages";
import SidebarButton from "./SidebarButton";
import { Flex, useColorModeValue } from "@chakra-ui/react";

export default function Sidebar() {
  return (
    <Flex
      w={"100px"}
      h={"full"}
      maxH="calc(100% - 50px)"
      direction={"column"}
      position={"fixed"}
      top={"50px"}
      bottom="auto"
      left={0}
      zIndex={100}
      bg={useColorModeValue("whiteAlpha.600", "blackAlpha.600")}
      backdropFilter="auto"
      backdropBlur="36px"
      border={"1px"}
      borderTop={"none"}
      borderColor={useColorModeValue("gray.200", "gray.700")}
      className="sidebar"
    >
      {pages.pinned.map((routes) => (
        <SidebarButton
          key={routes.path}
          name={routes.name}
          icon={routes.icon}
          mirrored={routes.mirrored}
          to={`/app/${routes.path}`}
        />
      ))}
      <Flex
        direction="column"
        borderTop={"1px"}
        borderColor={useColorModeValue("gray.200", "gray.700")}
        overflowY="auto"
      >
        {pages.unpinned.map((routes) => (
          <SidebarButton
            key={routes.path}
            name={routes.name}
            icon={routes.icon}
            mirrored={routes.mirrored}
            to={`/app/${routes.path}`}
          />
        ))}
      </Flex>
    </Flex>
  );
}
