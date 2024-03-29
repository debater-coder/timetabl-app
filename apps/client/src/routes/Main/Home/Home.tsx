import ErrorAlert from "../../../components/ErrorAlert";
import Countdown from "./Countdown";
import CycleTimetable from "./Cycle";
import DayTimetable from "./DayTimetable";
import QuickLinks from "./QuickLinks";
import ViewTab from "./ViewTab";
import { TabList, TabPanels, TabPanel, Tabs, Flex } from "@chakra-ui/react";
import { CalendarBlank, SquaresFour } from "phosphor-react";
import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";

export default function Home() {
  const [countdown, setCountdown] = useState("00:00:00");

  return (
    <Flex direction={"column"} w={"full"} px={2} maxW={"1000px"}>
      <QuickLinks />
      <Countdown countdown={countdown} setCountdown={setCountdown} />
      <Tabs variant={"unstyled"} mt={1}>
        <TabList>
          <ViewTab icon={CalendarBlank}>Day</ViewTab>
          <ViewTab icon={SquaresFour}>Cycle</ViewTab>
        </TabList>
        <TabPanels borderTop={"2px solid"} borderColor={"gray.500"}>
          <TabPanel>
            <ErrorBoundary fallback={<ErrorAlert />}>
              <DayTimetable />
            </ErrorBoundary>
          </TabPanel>
          <TabPanel>
            <ErrorBoundary fallback={<ErrorAlert />}>
              <CycleTimetable />
            </ErrorBoundary>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
