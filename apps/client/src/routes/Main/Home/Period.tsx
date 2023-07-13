import {
  Flex,
  useToken,
  useColorModeValue,
  Spacer,
  chakra,
  Box,
  Text,
} from "@chakra-ui/react";

export default function Period() {
  return (
    <Flex
      bg={useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55"}
      rounded={"lg"}
      gap={1}
      shadow={"xl"}
      h="full"
    >
      <Box w={2} minW={2} roundedLeft={"lg"} bg={"primary.500"} />
      <Flex
        w="full"
        p={2}
        fontFamily={"Poppins, sans-serifs"}
        align="center"
        gap={2}
      >
        <Text fontSize={"sm"} noOfLines={1}>
          9 D&T CZ
        </Text>
        <Spacer />
        <Text fontSize={"xs"} minW="fit-content">
          R Gifford
        </Text>
        <chakra.span fontWeight={"bold"} fontSize={"sm"}>
          506
        </chakra.span>
      </Flex>
    </Flex>
  );
}
