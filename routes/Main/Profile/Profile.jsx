import { Flex, Skeleton, useColorModeValue, Text } from "@chakra-ui/react";
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
        <Flex
          direction="column"
          bg={useColorModeValue("gray.100", "gray.500")}
          p={5}
          align="center"
          rounded={5}
        >
          <Text>
            {data?.givenName} {data?.surname}
          </Text>
          <Text>{data?.role}</Text>
        </Flex>
      </Skeleton>
    ),
    withProps(QueryError, { error })
  );
};
