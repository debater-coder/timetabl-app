import { Link as RouterLink } from "react-router-dom";
import SidebarButton from "./SidebarButton";
import { Barcode, CalendarBlank, House, Megaphone } from "phosphor-react";
import { Flex, useColorModeValue, Box } from "@chakra-ui/react";

export default ({
  pathname,
  sidebar,
}: {
  pathname: string;
  sidebar: boolean;
}) => (
  <Flex
    w={{ base: "100%", md: "100px" }}
    h={{ base: "auto", md: "100%" }}
    direction={{ base: "row", md: "column" }}
    position={"fixed"}
    top={{ md: "80px", base: "auto" }}
    bottom={{ base: 0, md: "auto" }}
    left={0}
    zIndex={100}
    bg={useColorModeValue("white", "gray.800")}
    border={"1px"}
    borderTop={{ md: "none" }}
    borderColor={useColorModeValue("gray.200", "gray.700")}
  >
    <Box as={RouterLink} to={"/app"} w="full">
      <SidebarButton
        sidebar={sidebar}
        name={"Home"}
        active={pathname === "/app"}
        icon={House}
      />
    </Box>
    <Box as={RouterLink} to={"/app/barcodes"} w="full">
      <SidebarButton
        sidebar={sidebar}
        name={"Barcodes"}
        active={pathname === "/app/barcodes"}
        icon={Barcode}
      />
    </Box>
    <Box as={RouterLink} to={"/app/announcements"} w="full">
      <SidebarButton
        sidebar={sidebar}
        name={"Notices"}
        active={pathname === "/app/announcements"}
        icon={Megaphone}
        mirrored
      />
    </Box>
    <Box as={RouterLink} to={"/app/calendar"} w="full">
      <SidebarButton
        sidebar={sidebar}
        name={"Calendar"}
        active={pathname === "/app/calendar"}
        icon={CalendarBlank}
        mirrored
      />
    </Box>
  </Flex>
);
