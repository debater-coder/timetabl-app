import {
  Flex,
  useColorModeValue,
  Spinner,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { useIsFetching, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { ArrowClockwise } from "phosphor-react";

export default () => {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();

  return (
    <Flex
      ml={5}
      bg={useColorModeValue("gray.100", "gray.500")}
      p={2}
      rounded="full"
      align={"center"}
      gap={3}
      position={"fixed"}
      bottom={{ base: 28, md: 8 }}
      right={8}
      as={motion.div}
      layout
    >
      {isFetching ? (
        <Text fontSize={"xs"} fontFamily="Poppins, sans-serif">
          Fetching the latest data
        </Text>
      ) : (
        ""
      )}
      {isFetching ? (
        <Spinner size={"xs"} />
      ) : (
        <IconButton
          icon={<ArrowClockwise />}
          size="xs"
          variant={"ghost"}
          rounded="full"
          onClick={async () => {
            await queryClient.refetchQueries();
          }}
        />
      )}
    </Flex>
  );
};
