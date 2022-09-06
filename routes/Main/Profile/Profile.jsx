import { Flex, Skeleton, useColorModeValue, Text } from "@chakra-ui/react";
import QueryHandler from "../../../components/QueryHandler";
import { useProfile } from "../../../hooks/useSBHSQuery";

export default () => {
  return (
    <QueryHandler query={useProfile()}>
      {(isLoaded, data) => (
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
      )}
    </QueryHandler>
  );
};
