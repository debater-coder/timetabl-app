import {
  Box,
  Flex,
  Heading,
  Skeleton,
  Spacer,
  Text,
  useColorModeValue,
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

  if (period?.["title"]) {
    name = period["title"];

    if (period["year"]) {
      name = period["year"] + name;
      subject = timetable["subjects"]?.[name] ?? subject;
      name = subject["title"] ?? name;
    }
  }

  return (
    <Flex m={1} bg={useColorModeValue("gray.300", "gray.500")} rounded={10}>
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
          <Text>{period?.["room"] ?? ""}</Text>
        </Flex>
        <Text>{bell?.["startTime"] ?? ""}</Text>
      </Flex>
    </Flex>
  );
};

const HomeView = (isLoaded, data) => (
  <Skeleton isLoaded={isLoaded} rounded={5}>
    {data?.["bells"] && data?.["timetable"]
      ? data["bells"].map((bell) => (
          <Bell
            key={bell["bell"]}
            bell={bell}
            timetable={data?.["timetable"]}
          />
        ))
      : ""}
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
