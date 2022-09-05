import { Flex, Skeleton, Text } from "@chakra-ui/react";
import QueryError from "../../../components/QueryError";
import useSBHSQuery from "../../../hooks/useSBHSQuery";
import { withProps } from "../../../utils/contextualise";
import handleQuery from "../../../utils/handleQuery";

const Bell = ({ bell, timetable }) => (
  <Flex p={3} m={1} bg={"gray"} rounded={10} direction={"column"}>
    <Text key={bell.bell}>{bell["bellDisplay"]}</Text>
    <Text key={bell.bell}>
      {timetable["timetable"]?.["periods"]?.[bell["bell"]]?.["room"] ?? ""}
    </Text>
  </Flex>
);

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
