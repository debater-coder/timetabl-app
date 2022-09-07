import { Flex, Skeleton, useColorModeValue, Text } from "@chakra-ui/react";
import QueriesHandler from "../../../components/QueriesHandler";
import { useProfile } from "../../../hooks/useSBHSQuery";

export default () => {
  return (
    <QueriesHandler queries={{ profile: useProfile() }}>
      {(isLoaded, { profile }) => (
        <Skeleton isLoaded={isLoaded} rounded={5}>
          <Flex
            direction="column"
            bg={useColorModeValue("gray.100", "gray.500")}
            p={5}
            align="center"
            rounded={5}
          >
            <Text>
              {profile?.givenName} {profile?.surname}
            </Text>
            <Text>{profile?.role}</Text>
          </Flex>
        </Skeleton>
      )}
    </QueriesHandler>
  );
};
