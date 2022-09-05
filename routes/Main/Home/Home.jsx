import {
  Box,
  Flex,
  Heading,
  Skeleton,
  Spacer,
  Text,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import QueryError from "../../../components/QueryError";
import useSBHSQuery from "../../../hooks/useSBHSQuery";
import { withProps } from "../../../utils/contextualise";
import handleQuery from "../../../utils/handleQuery";
import "@fontsource/poppins";

const Bell = ({ bell, timetable }) => {
  const period = timetable["timetable"]?.["periods"]?.[bell["bell"]];
  let name = bell["bellDisplay"];
  let subject = null;
  let teacher = period?.["teacher"];

  if (period?.["title"]) {
    name = period["title"];

    if (period["year"]) {
      name = period["year"] + name;
      subject = timetable["subjects"]?.[name] ?? subject;
      name = subject["title"] ?? name;
    }
  }

  if (subject) {
    teacher = subject?.["fullTeacher"] ?? teacher;
  }

  return (
    <Flex
      m={1}
      rounded={10}
      _hover={{ bg: useToken("colors", "gray.400") + "22" }}
      shadow="lg"
    >
      <Box
        w={2}
        roundedLeft={10}
        bg={subject?.["colour"] ? `#${subject?.["colour"]}` : "transparent"}
      />
      <Flex direction={"column"} p={3} w="full">
        <Flex gap={6}>
          <Heading size="sm" fontFamily={"Poppins, sans-serif"}>
            {name}
          </Heading>
          <Spacer />
          <Text fontWeight={"semibold"}>
            {period?.["room"] ?? bell?.["startTime"] ?? ""}
          </Text>
        </Flex>
        {period?.["room"] && (
          <Text fontWeight={"semibold"}>
            {bell?.["startTime"]} {teacher ?? ""}
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

const HomeView = (isLoaded, data) => (
  <Skeleton isLoaded={isLoaded} rounded={5}>
    <Flex
      direction={"column"}
      bg={useToken("colors", useColorModeValue("gray.300", "gray.500")) + "33"}
      rounded={10}
    >
      {data?.["bells"] && data?.["timetable"]
        ? data["bells"].map((bell) => (
            <Bell
              key={bell["bell"]}
              bell={bell}
              timetable={data?.["timetable"]}
            />
          ))
        : ""}
    </Flex>
  </Skeleton>
);

export default () => {
  const { data, error } = useSBHSQuery("timetable/daytimetable.json");

  return handleQuery(
    data,
    error,
    (isLoaded) => HomeView(isLoaded, data),
    withProps(QueryError, { error })
  );
};
