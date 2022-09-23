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
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { DateTime } from "luxon";
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
  const [expanded, { toggle: toggleExpanded }] = useBoolean(false);
  const { periodColours }: { periodColours: string } = useSettings();

  const { room, colour, name, time, teacher, endTime } = periodData;
  const active =
    (DateTime.fromISO(`${date}T${time}`) < DateTime.now() &&
      DateTime.now() < DateTime.fromISO(`${date}T${endTime}`)) ??
    false;

  return (
    <Skeleton
      rounded={5}
      m={!transition && 0.5}
      isLoaded={isLoaded}
      w={upcoming && "full"}
    >
      <Flex align="center" gap={3} w={"full"}>
        <Flex
          m={0.5}
          bg={
            upcoming
              ? useToken("colors", useColorModeValue("gray.300", "gray.500")) +
                "33"
              : "transparent"
          }
          rounded={10}
          _hover={{ bg: useToken("colors", "gray.400") + "22" }}
          shadow={active ? "outline" : room && "lg"}
          onClick={toggleExpanded}
          as={motion.div}
          w={"full"}
          layout
          cursor={"pointer"}
        >
          <Box
            w={2}
            roundedLeft={10}
            bg={
              room &&
              { default: colour, primary: "primary.500", none: "transparent" }[
                periodColours
              ]
            }
          />
          <Flex
            direction={"column"}
            px={3}
            py={!transition && (room || upcoming) && 3}
            w="full"
          >
            <Flex gap={6} align="center" w="full">
              <Heading
                size={upcoming ? "lg" : "xs"}
                fontFamily={"Poppins, sans-serif"}
                as={motion.h2}
                layout
              >
                {!transition && name}
              </Heading>
              <Spacer />
              <Text fontWeight={"semibold"} as={motion.p} layout>
                {!transition && (room ?? time ?? "")}
              </Text>
            </Flex>
            <Text
              fontWeight={!upcoming && "semibold"}
              fontSize={upcoming ? "lg" : "xs"}
              as={motion.p}
              layout
            >
              {(room && expanded) || !isLoaded
                ? time + " " + teacher
                : upcoming
                ? `IN ${countdown}`
                : ""}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Skeleton>
  );
}
