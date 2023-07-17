import { Flex } from "@chakra-ui/react";
import DaySelect from "./DaySelect";
import Schedule from "./Schedule";
import { useState } from "react";

export default function DayTimetable() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();

  return (
    <Flex direction={"column"} gap={2} h="full">
      <DaySelect selected={selectedDate} setSelected={setSelectedDate} />
      <Schedule date={selectedDate?.toISOString()} />
    </Flex>
  );
}
