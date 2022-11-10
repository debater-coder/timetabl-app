import {
  Box,
  Flex,
  Heading,
  Skeleton,
  Spacer,
  useBoolean,
  useColorModeValue,
  useToken,
  Text,
  Tooltip,
  useMediaQuery,
  As,
  Collapse,
  chakra,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { DateTime } from "luxon";
import { useState } from "react";
import { TimetablPeriod } from "../../../hooks/useSBHSQuery";
import useSettings from "../../../hooks/useSettings";

type PeriodProps = {
  periodData: TimetablPeriod;
  isLoaded: boolean;
  date?: string;
  upcoming?: boolean;
  countdown?: string;
  transition?: boolean;
};

export default function Period({
  periodData,
  isLoaded,
  date = undefined,
  upcoming = false,
  countdown = null,
  transition = false,
}: PeriodProps) {
  const {
    expanded: defaultExpanded,
    hoverExpand,
    showTimesInsteadOfRooms,
  } = useSettings();
  const [expanded, setExpanded] = useBoolean(defaultExpanded === "true");
  const { periodColours }: { periodColours: string } = useSettings();
  const [hoverable] = useMediaQuery("(any-hover: hover)");

  const { room, colour, name, time, teacher, endTime, casual } = periodData;
  const active =
    (DateTime.fromISO(`${date}T${time}`) < DateTime.now() &&
      DateTime.now() < DateTime.fromISO(`${date}T${endTime}`)) ??
    false;

  const periodBg =
    useToken("colors", useColorModeValue("gray.300", "gray.500")) + "33";

  const grayedOutTextColour = useColorModeValue(
    "blackAlpha.700",
    "whiteAlpha.700"
  );

  const [hoverTimeout, setHoverTimeout] = useState<ReturnType<
    typeof setTimeout
  > | null>(null);

  const invertedTextColour = useColorModeValue("gray.100", "gray.700");
  return (
    <Skeleton
      rounded={5}
      mx={!transition && 1}
      mb={!transition && 0.5}
      isLoaded={isLoaded}
      w={upcoming && "full"}
    >
      <Tooltip
        label={<Text fontSize={"xs"}>Keep hovering to expand</Text>}
        placement="right"
        isOpen={!!hoverTimeout && !!room}
      >
        <Flex
          m={0.5}
          bg={upcoming ? periodBg : "transparent"}
          rounded={10}
          _hover={{ bg: useToken("colors", "gray.400") + "22" }}
          shadow={active ? "outline" : room && "lg"}
          onClick={setExpanded.toggle}
          onMouseEnter={
            hoverable && hoverExpand === "true"
              ? () => {
                  setHoverTimeout(
                    setTimeout(() => {
                      setHoverTimeout(null);
                      setExpanded.on();
                    }, 250)
                  );
                }
              : undefined
          }
          onMouseLeave={
            hoverable && hoverExpand === "true"
              ? () => {
                  if (hoverTimeout) {
                    clearTimeout(hoverTimeout);
                  }
                  setHoverTimeout(null);
                  setExpanded.off();
                }
              : undefined
          }
          as={motion.div as As}
          w={"full"}
          layout
          cursor={room && "pointer"}
        >
          <Box
            w={2}
            roundedLeft={10}
            bg={
              room &&
              {
                default: colour,
                primary: "primary.500",
                none: "transparent",
              }[periodColours]
            }
          />
          <Flex
            direction={"column"}
            px={3}
            py={!transition && (room || upcoming) && 2.5}
            w="full"
          >
            <Flex gap={6} align="center" w="full">
              <Heading
                size={upcoming ? "lg" : "xs"}
                fontFamily={"Poppins, sans-serif"}
                as={motion.h2 as As}
                layout
                color={!room && !upcoming && grayedOutTextColour}
              >
                {!transition && name}
              </Heading>
              <Spacer />
              <Text
                fontWeight={"semibold"}
                as={motion.p as As}
                layout
                color={!room && !upcoming && grayedOutTextColour}
              >
                {!transition &&
                  ((showTimesInsteadOfRooms !== "true" ? room : time) ??
                    time ??
                    "")}
              </Text>
            </Flex>
            <Collapse in={upcoming || expanded || !isLoaded} animateOpacity>
              <Text
                fontWeight={!upcoming && "semibold"}
                fontSize={upcoming ? "xl" : "xs"}
              >
                {upcoming ? (
                  <>IN {countdown}</>
                ) : (room && expanded) || !isLoaded ? (
                  <>
                    {showTimesInsteadOfRooms !== "true" ? time : room}{" "}
                    <chakra.span
                      bg={casual && "primary.100"}
                      p={casual && 1}
                      color={casual && invertedTextColour}
                      rounded={casual && "40%"}
                    >
                      {casual ?? teacher}
                    </chakra.span>
                  </>
                ) : (
                  ""
                )}
              </Text>
            </Collapse>
          </Flex>
        </Flex>
      </Tooltip>
    </Skeleton>
  );
}
