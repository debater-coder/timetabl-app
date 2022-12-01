import { Link } from "react-router-dom";
import SidebarButton from "./SidebarButton";
import { Barcode, House, Megaphone } from "phosphor-react";
import { Flex, useColorModeValue } from "@chakra-ui/react";

export default ({
  pathname,
  sidebar,
}: {
  pathname: string;
  sidebar: boolean;
}) => (
  <Flex
    minW={"fit-content"}
    w={{ base: "100%", md: "auto" }}
    h={{ base: "auto", md: "100%" }}
    direction={{ base: "row", md: "column" }}
    justify={{ base: "space-evenly", md: "flex-start" }}
    position={"fixed"}
    top={{ md: "80px", base: "auto" }}
    bottom={{ base: 0, md: "auto" }}
    left={0}
    zIndex={100}
    bg={useColorModeValue("white", "gray.800")}
    border={"1px"}
    borderTop="none"
    borderColor={useColorModeValue("gray.200", "gray.700")}
  >
    <Link to={"/app"}>
      <SidebarButton
        sidebar={sidebar}
        name={"Home"}
        active={pathname === "/app"}
        icon={House}
      />
    </Link>
    <Link to={"/app/barcodes"}>
      <SidebarButton
        sidebar={sidebar}
        name={"Barcodes"}
        active={pathname === "/app/barcodes"}
        icon={Barcode}
      />
    </Link>
    <Link to={"/app/announcements"}>
      <SidebarButton
        sidebar={sidebar}
        name={"Announcements"}
        active={pathname === "/app/announcements"}
        icon={Megaphone}
        mirrored
      />
    </Link>
  </Flex>
);
