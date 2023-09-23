import {
  Flex,
  useToken,
  useColorModeValue,
  Grid,
  GridItem,
  Text,
  Center,
  Spinner,
  Spacer,
  Button,
} from "@chakra-ui/react";
import { useTimetable } from "../../../consumers/sbhsApi/useTimetable";
import { useState } from "react";
import {
  TimetablePeriod,
  TimetableDay,
  TimetableSubject,
} from "../../../consumers/sbhsApi/schemas";
import { useDay } from "../../../consumers/sbhsApi/useDay";
import { DateTime } from "luxon";

function Period(props: {
  period: TimetablePeriod;
  setActiveSubject: (subject: string | null) => void;
  activeSubject: string | null;
  color: string;
}) {
  const isActive = props.activeSubject === props.period.title;

  return (
    <Button
      display="flex"
      flexDirection={["column", "column", "row"]}
      bg={useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55"}
      rounded={"lg"}
      gap={1}
      alignItems="center"
      fontFamily={"Poppins, sans-serif"}
      variant="unstyled"
      _hover={{
        bg:
          useToken("colors", useColorModeValue("gray.300", "gray.700")) + "ff",
      }}
      onClick={() =>
        props.setActiveSubject(isActive ? null : props.period.title)
      }
      shadow={isActive ? "outline" : undefined}
      height="auto"
    >
      <Text
        fontSize={"sm"}
        bg={
          props.period.room && (isActive || props.activeSubject === null)
            ? props.color + "99"
            : undefined
        }
        p={2}
        rounded="lg"
        minW={["full", "full", "5ch"]}
        textAlign="center"
      >
        {props.period.title.split(" ")[0]}
      </Text>
      <Spacer />
      <Text fontSize={"sm"} fontWeight={"bold"} pr={[0, 0, 2]}>
        {props.period.room}
      </Text>
    </Button>
  );
}

function Day(props: {
  day: TimetableDay;
  setActiveSubject: (subject: string | null) => void;
  activeSubject: string | null;
  subjects: TimetableSubject[];
}) {
  const today = DateTime.now().toISODate();
  const { data } = useDay(today, today);
  const highlightColor = useColorModeValue("primary.500", "primary.300");

  let daynameColor = "gray.500";

  if (data && data[today]?.dayName === props.day.dayname) {
    daynameColor = highlightColor;
  }

  return (
    <Flex direction={"column"} gap={1}>
      <Text
        color={daynameColor}
        fontWeight={"semibold"}
        alignSelf="center"
        fontSize={"sm"}
      >
        {props.day.dayname}
      </Text>
      {Object.values(props.day.periods).map((period, index) => (
        <Period
          color={
            "#" +
              props.subjects.find(
                (subject) => subject.shortTitle === period.title
              )?.colour || ""
          }
          key={index}
          period={period}
          setActiveSubject={props.setActiveSubject}
          activeSubject={props.activeSubject}
        />
      ))}
    </Flex>
  );
}

export default function CycleTimetable() {
  const { data } = useTimetable();
  const [activeSubject, setActiveSubject] = useState<string | null>(null);

  if (!data) {
    return (
      <Center>
        <Spinner />
      </Center>
    );
  }

  return (
    <Flex direction={"column"}>
      <Grid
        templateColumns="repeat(5, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap={3}
      >
        {data?.days.map((day, index) => (
          <GridItem w="100%" key={index}>
            <Day
              subjects={data?.subjects}
              day={day}
              setActiveSubject={setActiveSubject}
              activeSubject={activeSubject}
            />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
}
