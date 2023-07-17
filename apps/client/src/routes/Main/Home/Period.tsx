import {
  Flex,
  useToken,
  useColorModeValue,
  Spacer,
  chakra,
  Box,
  Text,
} from "@chakra-ui/react";

export default function Period({
  name,
  teacher,
  room,
  colour,
}: {
  name: string;
  teacher?: string;
  room?: string;
  colour?: string;
}) {
  const isBreak = !room;

  return (
    <Flex
      bg={
        useToken("colors", useColorModeValue("gray.300", "gray.700")) +
        (isBreak ? "cc" : "55")
      }
      rounded={"lg"}
      gap={1}
      shadow={isBreak ? undefined : "xl"}
      h="full"
    >
      <Box w={2} minW={2} roundedLeft={"lg"} bg={`${colour}`} />
      <Flex
        w="full"
        p={2}
        fontFamily={"Poppins, sans-serifs"}
        align="center"
        gap={2}
      >
        <Text
          fontSize={isBreak ? "xs" : "sm"}
          noOfLines={1}
          color={
            isBreak
              ? useColorModeValue("blackAlpha.700", "whiteAlpha.700")
              : undefined
          }
        >
          {name}
        </Text>
        <Spacer />
        <Text fontSize={"xs"} minW="fit-content">
          {teacher}
        </Text>
        <chakra.span fontWeight={"bold"} fontSize={"sm"}>
          {room}
        </chakra.span>
      </Flex>
    </Flex>
  );
}
