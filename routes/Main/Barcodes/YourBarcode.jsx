import { Flex, Skeleton } from "@chakra-ui/react";
import QueryError from "../../../components/QueryError";
import { useSBHSQuery } from "../../../hooks/useSBHSQuery";
import { withProps } from "../../../utils/contextualise";
import handleQuery from "../../../utils/handleQuery";
import SavedBarcode from "./SavedBarcode";

export default () => {
  const { data, error } = useSBHSQuery("details/userinfo.json");
  return handleQuery(
    data,
    error,
    (isLoaded) => (
      <Flex direction={"column"} align="center" gap={3}>
        <Skeleton isLoaded={isLoaded} rounded={5} minH={10}>
          <SavedBarcode name="My ID" value={data?.["studentId"]} readOnly />
        </Skeleton>
      </Flex>
    ),
    withProps(QueryError, { error })
  );
};
