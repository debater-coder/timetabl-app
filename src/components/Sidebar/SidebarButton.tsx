import { Box, Flex, Text, useColorModeValue, useToken } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { IconWeight } from "phosphor-react";

export default ({
  name,
  icon: Icon,
  active,
  sidebar,
  mirrored = false,
}: {
  name: string;
  icon: React.JSXElementConstructor<
    React.PropsWithChildren<{
      size: string | number;
      mirrored: boolean;
      weight: IconWeight;
    }>
  >;
  active?: boolean;
  sidebar?: boolean;
  mirrored?: boolean;
}) => {
  const hoverColor = useColorModeValue("gray.100", "gray.700");
  const [secondary] = useToken("colors", ["primary.300"]);
  const MotionFlex = motion(Flex);

  return (
    <Flex
      _hover={{ bg: hoverColor }}
      pt={sidebar ? "0px" : "12px"}
      pb={sidebar ? "0px" : "16px"}
      mb={sidebar ? "12px" : "0px"}
      h={sidebar ? "56px" : "64px"}
      w={32}
      direction={"column"}
      align={"center"}
    >
      <MotionFlex
        justify={"center"}
        bg={active ? secondary + "40" : undefined}
        animate={{ width: active ? (sidebar ? "56px" : "64px") : "0px" }}
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
      </MotionFlex>
      <Text as={active ? "b" : "label"} fontSize={"sm"} mt="4px">
        {name}
      </Text>
    </Flex>
  );
};
