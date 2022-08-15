import {
  Flex,
  useColorModeValue,
  Spinner,
  Text,
  IconButton,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { ArrowClockwise } from "phosphor-react";
import useSBHSQuery from "../../hooks/useSBHSQuery";

export default () => {
  const { isFetching, refetch } = useSBHSQuery();

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
          onClick={refetch}
        />
      )}
    </Flex>
  );
};
