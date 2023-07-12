import {
  Button,
  Flex,
  IconButton,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@chakra-ui/react";
import DatePicker from "../../../components/DatePicker/DatePicker";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "phosphor-react";

export default function DayTimetable() {
  const [selected, setSelected] = useState<Date | undefined>();
  const initRef = useRef<HTMLButtonElement>(null);

  return (
    <Flex direction={"column"}>
      <Popover closeOnBlur={false} initialFocusRef={initRef}>
        {({ onClose }) => (
          <>
            <Flex gap={3}>
              <IconButton
                icon={<ArrowLeft />}
                variant="outline"
                aria-label="Previous day"
              />
              <PopoverTrigger>
                <Button colorScheme="gray" variant={"outline"} w="full">
                  {selected
                    ? `${selected.toLocaleDateString(undefined, {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })} Week 7`
                    : "Select date"}
                </Button>
              </PopoverTrigger>
              <IconButton
                icon={<ArrowRight />}
                variant="outline"
                aria-label="Next day"
              />
            </Flex>
            <PopoverContent border={"none"}>
              <DatePicker
                onDateSelected={(selectedDate) => {
                  setSelected(selectedDate.date);
                }}
                selected={selected}
                firstDayOfWeek={1}
                onDone={onClose}
                focusRef={initRef}
              />
            </PopoverContent>
          </>
        )}
      </Popover>
    </Flex>
  );
}
