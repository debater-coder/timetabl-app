import { useDtt } from "../../../consumers/sbhsApi/useDtt";
import DaySelect from "./DaySelect";
import Schedule from "./Schedule";
import { Flex } from "@chakra-ui/react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";

export default function DayTimetable() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>();
  const { data: dtt } = useDtt();

  useEffect(() => {
    if (!selectedDate && dtt) {
      setSelectedDate(DateTime.fromISO(dtt.date).toJSDate());
    }
  }, [selectedDate, dtt, setSelectedDate]);

  return (
    <Flex direction={"column"} gap={2} h="full">
      <DaySelect selected={selectedDate} setSelected={setSelectedDate} />
      <Schedule date={selectedDate?.toISOString()} />
    </Flex>
  );
}
