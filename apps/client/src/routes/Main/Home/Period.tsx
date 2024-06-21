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
import { Period as PeriodInterface } from "../../../interfaces/DataProvider";

export default function Period({
  active,
  isLoaded,
  period
}: {
  active?: boolean;
  isLoaded?: boolean;
  period: PeriodInterface
}) {
  const {start, end, name, color, location, teacher} = period

  const regularTeacher = teacher?.[0]
  const casual = teacher && (teacher?.length > 1) ? teacher[teacher?.length - 1] : undefined

  const roomFrom = location?.[0]
  const roomTo = location && (location?.length > 1) ? location[location?.length - 1] : undefined

  const shouldUseShortName = useBreakpointValue(
    { base: true, md: false },
    { ssr: false }
  );

  const isBreak = !location;

  const bgColor =
    useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55";

  const fadedOut = useColorModeValue("blackAlpha.700", "whiteAlpha.700");

  const periodColours = useSettingsStore((state) => state.periodColours);
  const periodColorCode = {
    primary: !isBreak ? "primary.500" : undefined,
    default: color,
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
          {DateTime.fromJSDate(start).toFormat("h:mm a")}
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
            {!isBreak && shouldUseShortName ? name.short : name.long}
          </Text>
          <Spacer />
          <Text
            fontSize={"xs"}
            minW="fit-content"
            bg={casual ? "primary.500" : "transparent"}
            p={0.5}
            rounded="md"
          >
            {casual?.long ?? regularTeacher?.long}
          </Text>
          <Text
            fontWeight={"bold"}
            fontSize={"sm"}
            bg={roomTo ? "primary.500" : "transparent"}
            p={0.5}
            rounded="md"
          >
            {roomTo?.long ?? roomFrom?.long}
          </Text>
        </Flex>
      </Flex>
    </Skeleton>
  );
}