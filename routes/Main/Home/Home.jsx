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
import QueryHandler from "../../../components/QueryHandler";
import { useState } from "react";
import { GiFrenchFries } from "react-icons/gi";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import { DateTime } from "luxon";

const Empty = () => {
  return (
    <Box textAlign="center" py={10} px={6} as={motion.p} layout>
      <Icon boxSize={"50px"} color={"yellow.500"} as={motion(GiFrenchFries)} />
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

const Period = ({ periodData, isLoaded }) => {
  const [expanded, { toggle: toggleExpanded }] = useBoolean(false);
  const { active, room, colour, name, time, teacher } = periodData;

  return (
    <Skeleton rounded={5} m={1} isLoaded={isLoaded}>
      <Flex align="center" gap={3}>
        {active && (
          <Box
            w={4}
            h={4}
            rounded={100}
            as={motion.div}
            layout
            layoutId="activeIndicator"
            bg={useToken("colors", "blue.500") + "33"}
          />
        )}
        <Flex
          m={0.5}
          rounded={10}
          _hover={{ bg: useToken("colors", "gray.400") + "22" }}
          shadow={room && "lg"}
          onClick={toggleExpanded}
          as={motion.div}
          w={"full"}
          layout
        >
          <Box w={2} roundedLeft={10} bg={colour} />
          <Flex direction={"column"} px={3} py={room && 3} w="full">
            <Flex gap={6} align="center">
              <Heading
                size="xs"
                fontFamily={"Poppins, sans-serif"}
                as={motion.h2}
                layout
              >
                {name}
              </Heading>
              <Spacer />
              <Text fontWeight={"semibold"} as={motion.p} layout>
                {room ?? time ?? ""}
              </Text>
            </Flex>
            <Text fontWeight={"semibold"} fontSize="xs" as={motion.p} layout>
              {((room && expanded) || !isLoaded) &&
                (time + " " + teacher ?? "")}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Skeleton>
  );
};

const HomeView = ({ isLoaded, data, onDateChange, date }) => {
  const periods =
    data?.periods ??
    Array(11).fill({
      name: "Loading... Loading... Loading",
      room: 605,
    });

  return (
    <Flex direction={"column"} align="center" gap={6}>
      <Heading textAlign={"center"} fontFamily={"Poppins, sans-serif"}>
        Your Timetable
      </Heading>
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
            value={date ?? ""}
            onChange={(event) => onDateChange(event.target.value)}
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
            periods.map((period) => (
              <Period
                periodData={period}
                key={period["key"]}
                isLoaded={isLoaded}
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
    <QueryHandler query={useDTT(date)}>
      {(isLoaded, data) => (
        <HomeView
          isLoaded={isLoaded}
          data={data}
          onDateChange={setDate}
          date={date ?? data?.date}
        />
      )}
    </QueryHandler>
  );
}
