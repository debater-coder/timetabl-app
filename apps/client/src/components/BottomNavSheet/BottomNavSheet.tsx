import { Flex, useColorModeValue, Box, SimpleGrid } from "@chakra-ui/react";
import SidebarButton from "../Sidebar/SidebarButton";
import { motion, PanInfo } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { pages } from "../../pages";

export const BottomNavSheet = () => {
  const [height, setHeight] = useState(80);

  const isMountedRef = useRef(false);
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const close = () => {
    if (isMountedRef.current) {
      setHeight(80);
    }
  };

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
      as={motion.div}
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
        if (info.velocity.y > 100) {
          setHeight(80);
        } else if (info.velocity.y < -100) {
          setHeight(300);
        }
      }}
    >
      <Box
        bg="gray.500"
        h="5px"
        minH={"5px"}
        w="30px"
        my="5px"
        rounded="full"
        cursor={"grab"}
        _active={{ cursor: "grabbing" }}
      />
      <Flex
        w="full"
        border={"1px"}
        borderTop="none"
        borderColor={useColorModeValue("gray.200", "gray.700")}
      >
        {pages.pinned.map((routes) => (
          <SidebarButton
            key={routes.path}
            name={routes.name}
            icon={routes.icon}
            mirrored={routes.mirrored}
            to={`/app/${routes.path}`}
            onClick={close}
          />
        ))}
      </Flex>
      <SimpleGrid columns={4} w="full">
        {pages.unpinned.map((routes) => (
          <SidebarButton
            key={routes.path}
            name={routes.name}
            icon={routes.icon}
            mirrored={routes.mirrored}
            to={`/app/${routes.path}`}
            onClick={close}
          />
        ))}
      </SimpleGrid>
    </Flex>
  );
};
