import {
  Flex,
  useToken,
  useColorModeValue,
  Spacer,
  Box,
  Text,
  useBreakpointValue,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { TimetablPeriod } from "../../../services/sbhsApi/schemas";

export default function Period({
  name,
  teacher,
  room,
  colour,
  startTime,
  active,
  shortName,
}: TimetablPeriod & {
  active?: boolean;
}) {
  const shouldUseShortName = useBreakpointValue(
    { base: true, md: false },
    { ssr: false }
  );

  const isBreak = !room;

  const bgColor =
    useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55";

  return (
    <Flex align={"center"} fontFamily={"Poppins, sans-serifs"}>
      <Text
        fontSize={"xs"}
        minW="fit-content"
        w="9ch"
        mr={2}
        textAlign={"right"}
        color={useColorModeValue("blackAlpha.700", "whiteAlpha.700")}
      >
        {DateTime.fromISO(startTime).toFormat("h:mm a")}
      </Text>
      <Flex
        bg={!isBreak ? bgColor : undefined}
        rounded={"lg"}
        h="full"
        shadow={active ? "outline" : "none"}
        mb={!isBreak ? 1 : undefined}
        w="full"
        overflowX={"hidden"}
      >
        <Box w={2} minW={2} rounded={"lg"} bg={`${colour}`} />
        <Flex w="full" py={1.5} px={2} align="center" gap={2}>
          <Text
            fontSize={isBreak ? "xs" : "sm"}
            noOfLines={1}
            color={
              isBreak
                ? useColorModeValue("blackAlpha.700", "whiteAlpha.700")
                : undefined
            }
          >
            {!isBreak && shouldUseShortName ? shortName : name}
          </Text>
          <Spacer />
          <Text fontSize={"xs"} minW="fit-content">
            {teacher}
          </Text>
          <Text fontWeight={"bold"} fontSize={"sm"}>
            {room}
          </Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
