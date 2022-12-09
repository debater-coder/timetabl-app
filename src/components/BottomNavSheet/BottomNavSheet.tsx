import { Link as RouterLink } from "react-router-dom";
import { Flex, useColorModeValue, Box } from "@chakra-ui/react";
import { House, Barcode, Megaphone, CalendarBlank } from "phosphor-react";
import SidebarButton from "../Sidebar/SidebarButton";
import { motion } from "framer-motion";

export interface BottomNavSheetProps {
  pathname: string;
}

export const BottomNavSheet = ({ pathname }: BottomNavSheetProps) => (
  <Flex
    h="180px"
    w={"100%"}
    direction={"column"}
    position={"fixed"}
    align="center"
    justify="flex-start"
    bottom={"-100px"}
    roundedTop="3xl"
    left={0}
    zIndex={100}
    bg={useColorModeValue("white", "gray.800")}
    border={"1px"}
    borderBottom="none"
    borderColor={useColorModeValue("gray.200", "gray.700")}
    as={motion.div}
    drag="y"
    dragConstraints={{ top: -100, bottom: 0 }}
    dragElastic={0.1}
  >
    <Box
      bg="gray.500"
      h="5px"
      w="30px"
      my="5px"
      rounded="full"
      cursor={"grab"}
      _active={{ cursor: "grabbing" }}
    ></Box>
    <Flex w="full">
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
  </Flex>
);
