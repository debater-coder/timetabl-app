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
import { useTimetable } from "../../../services/sbhsApi/useTimetable";
import { TimetableDay } from "../../../services/sbhsApi/schemas/timetable";
import { useState } from "react";

function Period(props: {
  period: TimetableDay["periods"][number];
  setActiveSubject: (subject: string | null) => void;
  activeSubject: string | null;
}) {
  const isActive = props.activeSubject === props.period.title;
  const highlightColor = useColorModeValue("primary.300", "primary.600");

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
            ? highlightColor
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
