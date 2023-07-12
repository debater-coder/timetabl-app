import { Flex } from "@chakra-ui/react";
import DatePicker from "../../../components/DatePicker/DatePicker";
import { useState } from "react";

export default function DayTimetable() {
  const [selected, setSelected] = useState<Date | undefined>();

  return (
    <Flex direction={"column"} align={"center"}>
      <DatePicker
        onDateSelected={(selectedDate) => {
          setSelected(selectedDate.date);
        }}
        selected={selected}
        firstDayOfWeek={1}
      />
    </Flex>
  );
}
