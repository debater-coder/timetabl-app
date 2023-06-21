import { Box, Flex, Text, useColorModeValue, useToken } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IconWeight } from "phosphor-react";
import { Link as RouterLink, useMatch } from "react-router-dom";
import React from "react";

export default React.memo(function SidebarButton(props: {
  name: string;
  icon: React.JSXElementConstructor<
    React.PropsWithChildren<{
      size: string | number;
      mirrored: boolean;
      weight: IconWeight;
    }>
  >;
  mirrored?: boolean;
  to: string;
  onClick?: () => void;
}) {
  const { name, icon: Icon, mirrored = false, to, onClick } = props;
  const hoverColor = useColorModeValue("gray.100", "gray.700");
  const [secondary] = useToken("colors", ["primary.300"]);
  const active = Boolean(useMatch(to));

  return (
    <Box as={RouterLink} w="full" to={to} onClick={onClick}>
      <Flex
        _hover={{ bg: hoverColor }}
        p={"12px"}
        h={"64px"}
        w="100%"
        direction={"column"}
        align={"center"}
      >
        <Flex
          as={motion.div}
          justify={"center"}
          bg={active ? secondary + "40" : undefined}
          animate={{ width: active ? "56px" : "0px" }}
          align={"center"}
          borderRadius={"16px"}
          h={"32px"}
        >
          <Box minH={"24px"}>
            <Icon
              size="24px"
              mirrored={mirrored}
              weight={active ? "fill" : "duotone"}
            />
          </Box>
        </Flex>
        <Text as={active ? "b" : "label"} fontSize={"xs"} mt="4px">
          {name}
        </Text>
      </Flex>
    </Box>
  );
});
