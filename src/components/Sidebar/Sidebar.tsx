import SidebarButton from "./SidebarButton";
import { Flex, useColorModeValue } from "@chakra-ui/react";
import { routes } from "../../routes";

export default ({ pathname }: { pathname: string }) => (
  <Flex
    w={"100px"}
    h={"100%"}
    direction={"column"}
    position={"fixed"}
    top={"80px"}
    bottom="auto"
    left={0}
    zIndex={100}
    bg={useColorModeValue("white", "gray.800")}
    border={"1px"}
    borderTop={"none"}
    borderColor={useColorModeValue("gray.200", "gray.700")}
  >
    {routes.map((routes) => (
      <SidebarButton
        key={routes.path}
        name={routes.name}
        active={pathname === `/app/${routes.path}`}
        icon={routes.icon}
        mirrored={routes.mirrored}
        to={`/app/${routes.path}`}
      />
    ))}
  </Flex>
);
