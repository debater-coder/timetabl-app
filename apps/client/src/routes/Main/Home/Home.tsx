import { TabList, TabPanels, TabPanel, Tabs, Flex } from "@chakra-ui/react";
import { CalendarBlank, Rows, SquaresFour } from "phosphor-react";
import QuickLinks from "./QuickLinks";
import Countdown from "./Countdown";
import ViewTab from "./ViewTab";
import DayTimetable from "./DayTimetable";
import WeekTimetable from "./WeekTimetable";
import CycleTimetable from "./Cycle";
import { useState } from "react";

export default function Home() {
  const [countdown, setCountdown] = useState("00:00:00");

  return (
    <Flex direction={"column"} w={"50vw"} minW="320px">
      <QuickLinks />
      <Countdown countdown={countdown} setCountdown={setCountdown} />
      <Tabs variant={"unstyled"} mt={1}>
        <TabList>
          <ViewTab icon={CalendarBlank}>Day</ViewTab>
          <ViewTab icon={Rows}>Week</ViewTab>
          <ViewTab icon={SquaresFour}>Cycle</ViewTab>
        </TabList>
        <TabPanels borderTop={"2px solid"} borderColor={"gray.500"}>
          <TabPanel>
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
