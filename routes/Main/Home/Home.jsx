import {
  Box,
  Flex,
  Heading,
  Skeleton,
  Spacer,
  Text,
  useBoolean,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import QueryError from "../../../components/QueryError";
import useSBHSQuery from "../../../hooks/useSBHSQuery";
import { withProps } from "../../../utils/contextualise";
import handleQuery from "../../../utils/handleQuery";
import "@fontsource/poppins";
import { AnimatePresence, AnimateSharedLayout, motion } from "framer-motion";

const Bell = ({ bell, timetable, isLoaded }) => {
  const [expanded, { toggle: toggleExpanded }] = useBoolean(false);

  const period = timetable?.["timetable"]?.["periods"]?.[bell["bell"]];
  let name = bell["bellDisplay"];
  let subject = null;
  let teacher = period?.["teacher"];

  if (period?.["title"]) {
    name = period["title"];

    if (period["year"]) {
      name = period["year"] + name;
      subject = timetable?.["subjects"]?.[name] ?? subject;
      name = subject["title"] ?? name;
    }
  }

  if (subject) {
    teacher = subject?.["fullTeacher"] ?? teacher;
  }

  return (
    <Skeleton rounded={5} m={1} isLoaded={isLoaded}>
      <Flex
        m={0.5}
        rounded={10}
        _hover={{ bg: useToken("colors", "gray.400") + "22" }}
        shadow={period?.["room"] && "lg"}
        onClick={toggleExpanded}
        as={motion.div}
        layout
      >
        <Box
          w={2}
          roundedLeft={10}
          bg={subject?.["colour"] ? `#${subject?.["colour"]}` : "transparent"}
        />
        <Flex direction={"column"} px={3} py={period?.["room"] && 3} w="full">
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
              {period?.["room"] ?? bell?.["startTime"] ?? ""}
            </Text>
          </Flex>
          <Text fontWeight={"semibold"} fontSize="xs" as={motion.p} layout>
            {period?.["room"] &&
              expanded &&
              (bell?.["startTime"] + " " + teacher ?? "")}
          </Text>
        </Flex>
      </Flex>
    </Skeleton>
  );
};

const HomeView = (isLoaded, data) => {
  const bells = data?.["bells"] ?? Array(11).fill({});
  return (
    <Flex direction={"column"}>
      <Heading textAlign={"center"} fontFamily={"Poppins, sans-serif"}>
        {data?.["date"] ?? ""}
      </Heading>
      <AnimateSharedLayout>
        <Flex
          direction={"column"}
          bg={
            useToken("colors", useColorModeValue("gray.300", "gray.500")) + "33"
          }
          rounded={10}
        >
          {bells.map((bell) => (
            <Bell
              key={bell["bell"]}
              bell={bell}
              timetable={data?.["timetable"]}
              isLoaded={isLoaded}
            />
          ))}
        </Flex>
      </AnimateSharedLayout>
    </Flex>
  );
};

export default () => {
  const { data, error } = useSBHSQuery("timetable/daytimetable.json");

  return handleQuery(
    data,
    error,
    (isLoaded) => HomeView(isLoaded, data),
    withProps(QueryError, { error })
  );
};
