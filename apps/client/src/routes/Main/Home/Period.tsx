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
  return (
    <Flex
      bg={
        room &&
        useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55"
      }
      rounded={"lg"}
      gap={1}
      shadow={"xl"}
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
        <Text fontSize={"sm"} noOfLines={1}>
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
