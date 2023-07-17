import {
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  useColorModeValue,
  useToken,
  Grid,
  GridItem,
  Flex,
} from "@chakra-ui/react";
import { CalendarBlank, Rows, SquaresFour } from "phosphor-react";
import QuickLinks from "./QuickLinks";
import Countdown from "./Countdown";
import ViewTab from "./ViewTab";
import { useDtt } from "../../../services/sbhsApi/useDtt";
import DayTimetable from "./DayTimetable";
import WeekTimetable from "./WeekTimetable";

const CycleTimetable = () => {
  return (
    <Flex
      direction={"column"}
      p={5}
      bg={useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55"}
      rounded={"lg"}
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
  const { data: dttNext } = useDtt();

  return (
    <Flex direction={"column"} w={"50vw"} minW={"300px"} h="full">
      <QuickLinks />
      <Countdown dtt={dttNext} />
      <Tabs variant={"unstyled"} size={"sm"} h="full" mt={1}>
        <TabList>
          <ViewTab icon={CalendarBlank}>Day</ViewTab>
          <ViewTab icon={Rows}>Week</ViewTab>
          <ViewTab icon={SquaresFour}>Cycle</ViewTab>
        </TabList>
        <TabPanels borderTop={"2px solid"} borderColor={"gray.500"} h="full">
          <TabPanel h="full">
            <DayTimetable dtt={dttNext} />
          </TabPanel>
          <TabPanel>
            <WeekTimetable />
          </TabPanel>
          <TabPanel>
            <CycleTimetable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
