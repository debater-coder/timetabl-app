import { Flex, Heading, Skeleton, Text } from "@chakra-ui/react";
import QueryError from "../../../components/QueryError";
import useSBHSQuery from "../../../hooks/useSBHSQuery";
import { withProps } from "../../../utils/contextualise";
import handleQuery from "../../../utils/handleQuery";
import "@fontsource/poppins";

const Bell = ({ bell, timetable }) => {
  const period = timetable["timetable"]?.["periods"]?.[bell["bell"]];
  let name = bell["bellDisplay"];

  if (period?.["title"]) {
    name = period["title"];

    if (period["year"]) {
      name = period["year"] + name;
      name = timetable["subjects"]?.[name]["title"] ?? name;
    }
  }

  return (
    <Flex p={3} m={1} bg={"gray"} rounded={10} direction={"column"}>
      <Heading key={bell.bell} size="sm" fontFamily={"Poppins, sans-serif"}>
        {name}
      </Heading>
      <Text key={bell.bell}>
        {period?.["room"] ? `Room: ${period?.["room"]}` : ""}
      </Text>
    </Flex>
  );
};

const HomeView = (isLoaded, data) => (
  <Skeleton isLoaded={isLoaded} rounded={5}>
    {data?.["bells"] && data?.["timetable"]
      ? data["bells"].map((bell) => (
          <Bell key={bell.bell} bell={bell} timetable={data?.["timetable"]} />
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
