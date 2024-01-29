import { useSettingsStore } from "../../../stores/settings";
import {
  Flex,
  useToken,
  useColorModeValue,
  Spacer,
  Box,
  Text,
  useBreakpointValue,
  Skeleton,
} from "@chakra-ui/react";
import { DateTime } from "luxon";

export default function Period({
  name,
  teacher,
  room,
  colour,
  startTime,
  active,
  shortName,
  roomTo,
  casual,
  isLoaded,
}: TimetablPeriod & {
  active?: boolean;
  isLoaded?: boolean;
}) {
  const shouldUseShortName = useBreakpointValue(
    { base: true, md: false },
    { ssr: false }
  );

  const isBreak = !room;

  const bgColor =
    useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55";

  const fadedOut = useColorModeValue("blackAlpha.700", "whiteAlpha.700");

  const periodColours = useSettingsStore((state) => state.periodColours);
  const periodColorCode = {
    primary: !isBreak ? "primary.500" : undefined,
    default: colour,
    none: "transparent",
  }[periodColours];

  const showTimes = useSettingsStore((state) => state.showTimes);

  return (
    <Skeleton
      display="flex"
      isLoaded={isLoaded}
      mb={!isBreak || !isLoaded ? 1 : undefined}
    >
      {showTimes && (
        <Text
          fontSize={"xs"}
          minW="fit-content"
          w="10ch"
          mr={2}
          textAlign={"right"}
          color={fadedOut}
          alignSelf={"center"}
        >
          {DateTime.fromISO(startTime).toFormat("h:mm a")}
        </Text>
      )}
      <Flex
        bg={!isBreak ? bgColor : undefined}
        rounded={"lg"}
        h="full"
        shadow={active ? "outline" : "none"}
        w="full"
        overflowX={"hidden"}
        fontFamily={"Poppins, sans-serifs"}
      >
        {periodColours !== "none" && (
          <Box w={2} minW={2} rounded={"lg"} bg={periodColorCode} />
        )}
        <Flex w="full" py={[1.5, 2]} px={2} align="center" gap={2}>
          <Text
            fontSize={isBreak ? "xs" : "sm"}
            noOfLines={1}
            color={isBreak ? fadedOut : undefined}
          >
            {!isBreak && shouldUseShortName ? shortName : name}
          </Text>
          <Spacer />
          <Text
            fontSize={"xs"}
            minW="fit-content"
            bg={casual ? "primary.500" : "transparent"}
            p={0.5}
            rounded="md"
          >
            {casual ?? teacher}
          </Text>
          <Text
            fontWeight={"bold"}
            fontSize={"sm"}
            bg={roomTo ? "primary.500" : "transparent"}
            p={0.5}
            rounded="md"
          >
            {roomTo ?? room}
          </Text>
        </Flex>
      </Flex>
    </Skeleton>
  );
}
