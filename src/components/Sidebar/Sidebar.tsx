import { Link as RouterLink } from "react-router-dom";
import SidebarButton from "./SidebarButton";
import { Barcode, CalendarBlank, House, Megaphone } from "phosphor-react";
import { Flex, useColorModeValue, Box } from "@chakra-ui/react";

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
    <Box as={RouterLink} to={"/app"} w="full">
      <SidebarButton
        sidebar
        name={"Home"}
        active={pathname === "/app"}
        icon={House}
      />
    </Box>
    <Box as={RouterLink} to={"/app/barcodes"} w="full">
      <SidebarButton
        sidebar
        name={"Barcodes"}
        active={pathname === "/app/barcodes"}
        icon={Barcode}
      />
    </Box>
    <Box as={RouterLink} to={"/app/announcements"} w="full">
      <SidebarButton
        sidebar
        name={"Notices"}
        active={pathname === "/app/announcements"}
        icon={Megaphone}
        mirrored
      />
    </Box>
    <Box as={RouterLink} to={"/app/calendar"} w="full">
      <SidebarButton
        sidebar
        name={"Calendar"}
        active={pathname === "/app/calendar"}
        icon={CalendarBlank}
        mirrored
      />
    </Box>
  </Flex>
);
