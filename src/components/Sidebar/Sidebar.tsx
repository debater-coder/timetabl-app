import SidebarButton from "./SidebarButton";
import { Barcode, CalendarBlank, House, Megaphone } from "phosphor-react";
import { Flex, useColorModeValue } from "@chakra-ui/react";

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
    <SidebarButton
      to={"/app"}
      name={"Home"}
      active={pathname === "/app"}
      icon={House}
    />
    <SidebarButton
      name={"Barcodes"}
      active={pathname === "/app/barcodes"}
      icon={Barcode}
      to={"/app/barcodes"}
    />
    <SidebarButton
      name={"Notices"}
      active={pathname === "/app/announcements"}
      icon={Megaphone}
      mirrored
      to={"/app/announcements"}
    />
    <SidebarButton
      name={"Calendar"}
      active={pathname === "/app/calendar"}
      icon={CalendarBlank}
      mirrored
      to={"/app/calendar"}
    />
  </Flex>
);
