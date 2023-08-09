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
} from "@chakra-ui/react";
import { useTimetable } from "../../../services/sbhsApi/useTimetable";
import { TimetableDay } from "../../../services/sbhsApi/schemas";
import { useState } from "react";

function Period(props: {
  period: TimetableDay["periods"][number];
  setActiveSubject: (subject: string | null) => void;
  activeSubject: string | null;
}) {
  const isActive = props.activeSubject === props.period.title;

  return (
    <Flex
      direction={["column", "column", "row"]}
      bg={useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55"}
      rounded={"lg"}
      gap={1}
      align="center"
      fontFamily={"Poppins, sans-serif"}
      onClick={() =>
        props.setActiveSubject(isActive ? null : props.period.title)
      }
      shadow={isActive ? "outline" : undefined}
    >
      <Text
        fontSize={"sm"}
        bg={
          props.period.room && (isActive || props.activeSubject === null)
            ? "primary.500"
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
    </Flex>
  );
}

function Day(props: {
  day: TimetableDay;
  setActiveSubject: (subject: string | null) => void;
  activeSubject: string | null;
}) {
  return (
    <Flex direction={"column"} gap={1}>
      <Text
        color={"gray.500"}
        fontWeight={"semibold"}
        alignSelf="center"
        fontSize={"sm"}
      >
        {props.day.dayname}
      </Text>
      {Object.values(props.day.periods).map((period, index) => (
        <Period
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
        {data?.map((day, index) => (
          <GridItem w="100%" key={index}>
            <Day
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
