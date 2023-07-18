import { TabList, TabPanels, TabPanel, Tabs, Flex } from "@chakra-ui/react";
import { CalendarBlank, Rows, SquaresFour } from "phosphor-react";
import QuickLinks from "./QuickLinks";
import Countdown from "./Countdown";
import ViewTab from "./ViewTab";
import DayTimetable from "./DayTimetable";
import WeekTimetable from "./WeekTimetable";
import CycleTimetable from "./Cycle";

export default function Home() {
  return (
    <Flex direction={"column"} w={"50vw"} minW="300px" h="full">
      <QuickLinks />
      <Countdown />
      <Tabs variant={"unstyled"} h="full" mt={1}>
        <TabList>
          <ViewTab icon={CalendarBlank}>Day</ViewTab>
          <ViewTab icon={Rows}>Week</ViewTab>
          <ViewTab icon={SquaresFour}>Cycle</ViewTab>
        </TabList>
        <TabPanels borderTop={"2px solid"} borderColor={"gray.500"} h="full">
          <TabPanel h="full">
            <DayTimetable />
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
