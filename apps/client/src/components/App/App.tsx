import Nav from "../Nav";
import { Outlet } from "react-router-dom";
import { Flex, useColorModeValue, useToken } from "@chakra-ui/react";
import { Box } from "@chakra-ui/react";
import { useSettingsStore } from "../../stores/settings";

export default function App() {
  const bgImage = useSettingsStore((state) => state.bgImage);
  const darkenBlur = useSettingsStore((state) => state.darkenBlur);

  return (
    <Flex direction={"column"} width={"100vw"} maxW="full" height={"100vh"}>
      <Box
        position="absolute"
        left="0"
        right="0"
        bottom="0"
        top="0"
        bgGradient={`linear-gradient(0deg, transparent 20%, transparent 40%, ${useToken(
          "colors",
          useColorModeValue("primary.100", "primary.900")
        )}44 100%)`}
        bgImage={bgImage ? `url(${bgImage})` : undefined}
        backgroundSize={"cover"}
        backgroundPosition={"center"}
        filter="auto"
        blur={darkenBlur && bgImage ? "5px" : undefined}
        brightness={darkenBlur && bgImage ? "0.3" : undefined}
        zIndex={-1}
      />
      <Nav />
      <Box mt={"100px"} />
      <Flex direction={"column"} w="full" h="full" maxH={"calc(100% - 100px)"}>
        <Outlet />
      </Flex>
    </Flex>
  );
}
