import {
  Box,
  Flex,
  Heading,
  Icon,
  IconButton,
  Input,
  InputGroup,
  Skeleton,
  Spacer,
  Text,
  useBoolean,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import { useDTT } from "../../../hooks/useSBHSQuery";
import "@fontsource/poppins";
import { motion, LayoutGroup } from "framer-motion";
import QueriesHandler from "../../../components/QueriesHandler";
import { useEffect, useState } from "react";
import { GiFrenchFries } from "react-icons/gi";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import { DateTime } from "luxon";
import useSettings from "../../../hooks/useSettings";

const MotionIcon = motion(Icon);

const Empty = () => {
  return (
    <Box textAlign="center" py={10} px={6} as={motion.div} layout>
      <MotionIcon
        boxSize={"50px"}
        color={"yellow.500"}
        as={GiFrenchFries}
        layout
      />
      <Heading
        size="xl"
        mt={1}
        mb={2}
        fontFamily={"Poppins, sans-serif"}
        as={motion.h2}
        layout
      >
        No periods on this day
      </Heading>
      <Text color={"gray.500"} as={motion.p} layout>
        Chill out, grab some Oporto, and enjoy your day off!
      </Text>
    </Box>
  );
};

const Period = ({
  periodData,
  isLoaded,
  date,
  upcoming = false,
  countdown,
  transition,
}) => {
  const [expanded, { toggle: toggleExpanded }] = useBoolean(false);
  const { periodColours } = useSettings();

  const { room, colour, name, time, teacher, endTime } = periodData;
  const active =
    (DateTime.fromISO(`${date}T${time}`) < DateTime.now() &&
      DateTime.now() < DateTime.fromISO(`${date}T${endTime}`)) ??
    false;

  return (
    <Skeleton
      rounded={5}
      m={!transition && 1}
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
};

const NextPeriod = ({ periods, date, countdown, setCountdown, isLoaded }) => {
  const activePeriod = periods.findIndex(
    ({ time, endTime }) =>
      (DateTime.fromISO(`${date}T${time}`) < DateTime.now() &&
        DateTime.now() < DateTime.fromISO(`${date}T${endTime}`)) ??
      false
  );

  const nextPeriod = periods[activePeriod + 1];

  useEffect(() => {
    const timer = setTimeout(() => {
      setCountdown(
        DateTime.fromISO(`${date}T${nextPeriod.time}`)
          .diffNow()
          .toFormat("hh:mm:ss")
      );
    }, 1000);

    return () => clearTimeout(timer);
  });

  return (
    <Period
      isLoaded={isLoaded}
      periodData={nextPeriod}
      upcoming
      countdown={countdown}
    />
  );
};

const HomeView = ({
  isLoaded,
  data,
  onDateChange,
  date,
  initialDate,
  initialData,
}) => {
  const [countdown, setCountdown] = useState("");
  const periods =
    data?.periods ??
    Array(11).fill({
      name: "Loading... Loading... Loading",
      room: 605,
    });

  const initialPeriods =
    initialData?.periods ??
    Array(11).fill({
      name: "Loading... Loading... Loading",
      room: 605,
    });

  return (
    <Flex direction={"column"} align="center" gap={3}>
      <NextPeriod
        {...{
          periods: initialPeriods,
          date: initialDate,
          countdown,
          setCountdown,
          isLoaded,
        }}
      />
      <Flex w="full" gap={3}>
        <IconButton
          icon={<ArrowLeft />}
          variant="outline"
          onClick={() =>
            onDateChange(DateTime.fromISO(date).minus({ days: 1 }).toISODate())
          }
          aria-label="Previous day"
        />
        <InputGroup>
          <Input
            type="date"
            value={date ?? initialDate ?? ""}
            onChange={(event) => onDateChange(event.target.value)}
            focusBorderColor="primary.200"
          />
        </InputGroup>
        <IconButton
          icon={<ArrowRight />}
          variant="outline"
          onClick={() =>
            onDateChange(DateTime.fromISO(date).plus({ days: 1 }).toISODate())
          }
          aria-label="Next day"
        />
      </Flex>
      <LayoutGroup>
        <Flex
          direction={"column"}
          bg={
            useToken("colors", useColorModeValue("gray.300", "gray.500")) + "33"
          }
          minW={"50vw"}
          rounded={10}
          as={motion.div}
          layout
        >
          {periods.length ? (
            periods.map((period, index) => (
              <Period
                periodData={period}
                key={period["key"] ?? index}
                isLoaded={isLoaded}
                date={date}
                transition={period?.name == "Transition"}
              />
            ))
          ) : (
            <Empty />
          )}
        </Flex>
      </LayoutGroup>
    </Flex>
  );
};

export default function Home() {
  const [date, setDate] = useState();

  return (
    <QueriesHandler queries={{ dtt: useDTT(date), initialDtt: useDTT() }}>
      {(isLoaded, data) => (
        <HomeView
          isLoaded={isLoaded}
          data={data?.dtt}
          onDateChange={setDate}
          date={date ?? data?.dtt?.date}
          initialDate={data?.initialDtt?.date}
          initialData={data?.initialDtt}
        />
      )}
    </QueriesHandler>
  );
}
