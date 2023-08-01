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

function Period(props: TimetableDay["periods"][number]) {
  return (
    <Flex
      direction={["column", "column", "row"]}
      bg={useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55"}
      rounded={"lg"}
      gap={1}
      align="center"
      fontFamily={"Poppins, sans-serif"}
    >
      <Text
        fontSize={"sm"}
        bg={props.room ? "primary.500" : undefined}
        p={2}
        rounded="lg"
        minW={["full", "full", "5ch"]}
        textAlign="center"
      >
        {props.title.split(" ")[0]}
      </Text>
      <Spacer />
      <Text fontSize={"sm"} fontWeight={"bold"} pr={[0, 0, 2]}>
        {props.room}
      </Text>
    </Flex>
  );
}

function Day(props: TimetableDay) {
  return (
    <Flex direction={"column"} gap={1}>
      <Text
        color={"gray.500"}
        fontWeight={"semibold"}
        alignSelf="center"
        fontSize={"sm"}
      >
        {props.dayname}
      </Text>
      {Object.values(props.periods).map((period, index) => (
        <Period key={index} {...period} />
      ))}
    </Flex>
  );
}

export default function CycleTimetable() {
  const { data } = useTimetable();

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
            <Day {...day} />
          </GridItem>
        ))}
      </Grid>
    </Flex>
  );
}
