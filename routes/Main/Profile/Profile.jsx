import { Flex, Skeleton, useColorModeValue, Text } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import useSBHSQuery from "../../../hooks/useSBHSQuery";

export default () => {
  const { loading } = useAuth();
  const { data, error } = useSBHSQuery("details/userinfo.json", !loading);

  if (data || !error) {
    return (
      <Skeleton isLoaded={!!data} rounded={5}>
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
    );
  }

  return (
    "An error occured: " +
    error.message +
    ". Try logging in and out if the error persists."
  );
};
