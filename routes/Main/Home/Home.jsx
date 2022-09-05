import {
  Box,
  Flex,
  Heading,
  Skeleton,
  Spacer,
  Text,
  useBoolean,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import { useDTT } from "../../../hooks/useSBHSQuery";
import "@fontsource/poppins";
import { motion, LayoutGroup } from "framer-motion";
import QueryHandler from "../../../components/QueryHandler";

const Period = ({ periodData, isLoaded }) => {
  const [expanded, { toggle: toggleExpanded }] = useBoolean(false);
  const { active, room, colour, name, time, teacher } = periodData;

  return (
    <Skeleton rounded={5} m={1} isLoaded={isLoaded}>
      <Flex align="center" gap={3}>
        {active && (
          <Box
            w={4}
            h={4}
            rounded={100}
            as={motion.div}
            layout
            bg={useToken("colors", "blue.500") + "33"}
          />
        )}
        <Flex
          m={0.5}
          rounded={10}
          _hover={{ bg: useToken("colors", "gray.400") + "22" }}
          shadow={room && "lg"}
          onClick={toggleExpanded}
          as={motion.div}
          w={"full"}
          layout
        >
          <Box w={2} roundedLeft={10} bg={colour} />
          <Flex direction={"column"} px={3} py={room && 3} w="full">
            <Flex gap={6} align="center">
              <Heading
                size="xs"
                fontFamily={"Poppins, sans-serif"}
                as={motion.h2}
                layout
              >
                {name}
              </Heading>
              <Spacer />
              <Text fontWeight={"semibold"} as={motion.p} layout>
                {room ?? time ?? ""}
              </Text>
            </Flex>
            <Text fontWeight={"semibold"} fontSize="xs" as={motion.p} layout>
              {((room && expanded) || !isLoaded) &&
                (time + " " + teacher ?? "")}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </Skeleton>
  );
};

const HomeView = (isLoaded, data) => {
  data =
    data ??
    Array(11).fill({
      name: "Loading... Loading... Loading",
      room: 605,
    });
  return (
    <Flex direction={"column"}>
      <Heading textAlign={"center"} fontFamily={"Poppins, sans-serif"}>
        Your Timetable
      </Heading>
      <LayoutGroup>
        <Flex
          direction={"column"}
          bg={
            useToken("colors", useColorModeValue("gray.300", "gray.500")) + "33"
          }
          rounded={10}
          as={motion.div}
          layout
        >
          {data.map((periodData) => (
            <Period
              periodData={periodData}
              key={periodData["key"]}
              isLoaded={isLoaded}
            />
          ))}
        </Flex>
      </LayoutGroup>
    </Flex>
  );
};

export default function Home() {
  return <QueryHandler query={useDTT()}>{HomeView}</QueryHandler>;
}
