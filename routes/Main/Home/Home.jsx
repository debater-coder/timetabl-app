import { Skeleton } from "@chakra-ui/react";
import QueryError from "../../../components/QueryError";
import useSBHSQuery from "../../../hooks/useSBHSQuery";
import { withProps } from "../../../utils/contextualise";
import handleQuery from "../../../utils/handleQuery";

export default () => {
  const { data, error } = useSBHSQuery("timetable/daytimetable.json");

  return handleQuery(
    data,
    error,
    (isLoaded) => (
      <Skeleton isLoaded={isLoaded} rounded={5}>
        <pre>{JSON.stringify(data ?? {}, undefined, 2)}</pre>
      </Skeleton>
    ),
    withProps(QueryError, { error })
  );
};
