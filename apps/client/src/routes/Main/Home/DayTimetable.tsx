import { Flex } from "@chakra-ui/react";
import DaySelect from "./DaySelect";
import Schedule from "./Schedule";
import { TimetablDtt } from "../../../services/sbhsApi/schemas";

export default function DayTimetable({ dtt }: { dtt?: TimetablDtt }) {
  return (
    <Flex direction={"column"} gap={2} h="full">
      <DaySelect />
      <Schedule dtt={dtt} />
    </Flex>
  );
}
