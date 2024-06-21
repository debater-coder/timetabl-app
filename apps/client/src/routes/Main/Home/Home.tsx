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
      Home is currently under maintenance bozos.
    </Flex>
  );
}
