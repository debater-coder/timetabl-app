import {
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tabs,
  Flex,
  Icon,
  TabIndicator,
  useColorModeValue,
  useToken,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import { CalendarBlank, SquaresFour } from "phosphor-react";

const DayTimetable = () => {
  return <>Day Timetable</>;
};

const CycleTimetable = () => {
  return (
    <Flex
      direction={"column"}
      p={5}
      bg={useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55"}
      rounded={"lg"}
      w={"50vw"}
      minW={"300px"}
    >
      <Grid
        templateColumns="repeat(5, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap={3}
      >
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
      </Grid>
    </Flex>
  );
};

export default function Home() {
  return (
    <Flex direction={"column"} align="center" gap={1.5}>
      <Tabs variant={"unstyled"}>
        <TabList>
          <Tab>
            <Flex gap={2}>
              <Icon as={CalendarBlank} boxSize={6} />
              Day View
            </Flex>
          </Tab>
          <Tab>
            <Flex gap={2}>
              <Icon as={SquaresFour} boxSize={6} />
              Cycle View
            </Flex>
          </Tab>
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
        <TabPanels borderTop={"2px solid"} borderColor={"gray.500"}>
          <TabPanel>
            <DayTimetable />
          </TabPanel>
          <TabPanel>
            <CycleTimetable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
