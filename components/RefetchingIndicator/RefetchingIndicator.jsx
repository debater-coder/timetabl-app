import {
  Flex,
  useColorModeValue,
  Spinner,
  Text,
  IconButton,
  Icon,
} from "@chakra-ui/react";
import {
  onlineManager,
  useIsFetching,
  useQueryClient,
} from "@tanstack/react-query";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowClockwise, WifiX } from "phosphor-react";
import { useState } from "react";

export default () => {
  const queryClient = useQueryClient();
  const isFetching = useIsFetching();
  const [online, setOnline] = useState(true);
  const [hovering, setHovering] = useState(false);

  onlineManager.subscribe(() => setOnline(onlineManager.isOnline()));

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
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
    >
      <AnimatePresence>
        {online ? (
          isFetching ? (
            <Text
              as={motion.p}
              layout
              initial={{ width: 0, scaleX: 0, opacity: 0 }}
              animate={{ width: "auto", scaleX: 1, opacity: 1 }}
              exit={{ width: 0, scaleX: 0, opacity: 0 }}
              fontSize={"xs"}
              fontFamily="Poppins, sans-serif"
              whiteSpace={"nowrap"}
            >
              Fetching the latest data
            </Text>
          ) : (
            ""
          )
        ) : hovering ? (
          <Text
            as={motion.p}
            layout
            initial={{ width: 0, scaleX: 0, opacity: 0 }}
            animate={{ width: "auto", scaleX: 1, opacity: 1 }}
            exit={{ width: 0, scaleX: 0, opacity: 0 }}
            fontSize={"xs"}
            fontFamily="Poppins, sans-serif"
            whiteSpace={"nowrap"}
          >
            No internet.
          </Text>
        ) : (
          ""
        )}
      </AnimatePresence>
      {online ? (
        isFetching ? (
          <Spinner size={"xs"} as={motion.div} layout />
        ) : (
          <IconButton
            as={motion.button}
            layout
            icon={<ArrowClockwise />}
            size="xs"
            variant={"ghost"}
            rounded="full"
            onClick={() => queryClient.refetchQueries()}
          />
        )
      ) : (
        <Icon as={WifiX} />
      )}
    </Flex>
  );
};
