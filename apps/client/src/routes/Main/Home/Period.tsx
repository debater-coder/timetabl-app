import {
  Flex,
  useToken,
  useColorModeValue,
  Spacer,
  Box,
  Text,
} from "@chakra-ui/react";
import { DateTime } from "luxon";

export default function Period({
  name,
  teacher,
  room,
  colour,
  startTime,
}: {
  name: string;
  teacher?: string;
  room?: string;
  colour?: string;
  startTime: string;
}) {
  const isBreak = !room;

  return (
    <Flex
      bg={
        !isBreak
          ? useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55"
          : undefined
      }
      rounded={"lg"}
      shadow={isBreak ? undefined : "xl"}
      h="full"
      mb={!isBreak ? 1 : undefined}
    >
      <Box w={2} minW={2} rounded={"lg"} bg={`${colour}`} />
      <Flex
        w="full"
        py={1.5}
        px={2}
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
          {DateTime.fromISO(startTime).toFormat("h:mm a")}
        </Text>
        <Text fontSize={"xs"} minW="fit-content">
          {teacher}
        </Text>
        <Text fontWeight={"bold"} fontSize={"sm"}>
          {room}
        </Text>
      </Flex>
    </Flex>
  );
}
