import { Skeleton } from "@chakra-ui/react";
import QueryError from "../../../components/QueryError";
import useSBHSQuery from "../../../hooks/useSBHSQuery";
import { withProps } from "../../../utils/contextualise";
import handleQuery from "../../../utils/handleQuery";

export default () => {
  const { data, error } = useSBHSQuery("details/userinfo.json");

  return handleQuery(
    data,
    error,
    (isLoaded) => (
      <Skeleton isLoaded={isLoaded} rounded={5}>
        G&apos;day {data?.givenName}, you are now logged in!
      </Skeleton>
    ),
    withProps(QueryError, { error })
  );
};
