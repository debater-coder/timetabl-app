import { Link as RouterLink } from "react-router-dom";
import { Flex as ChakraFlex, useColorModeValue, Box } from "@chakra-ui/react";
import { House, Barcode, Megaphone, CalendarBlank } from "phosphor-react";
import SidebarButton from "../Sidebar/SidebarButton";
import { motion, PanInfo } from "framer-motion";
import { useState } from "react";

export interface BottomNavSheetProps {
  pathname: string;
}

const Flex = motion(ChakraFlex);

export const BottomNavSheet = ({ pathname }: BottomNavSheetProps) => {
  const [height, setHeight] = useState(80);

  return (
    <Flex
      w={"100%"}
      direction={"column"}
      position={"fixed"}
      align="center"
      justify="flex-start"
      bottom={0}
      roundedTop="3xl"
      left={0}
      zIndex={100}
      bg={useColorModeValue("white", "gray.800")}
      border={"1px"}
      borderBottom="none"
      borderColor={useColorModeValue("gray.200", "gray.700")}
      style={{
        touchAction: "none",
      }}
      animate={{ height }}
      onPan={(
        _event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
      ) => {
        setHeight(Math.min(Math.max(80, height - info.delta.y), 300));
      }}
      onPanEnd={(
        _event: MouseEvent | TouchEvent | PointerEvent,
        info: PanInfo
      ) => {
        if (info.velocity.y > 200) {
          setHeight(80);
        } else if (info.velocity.y < -200) {
          setHeight(300);
        }
      }}
    >
      <Box
        bg="gray.500"
        h="5px"
        w="30px"
        my="5px"
        rounded="full"
        cursor={"grab"}
        _active={{ cursor: "grabbing" }}
      />
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
};
