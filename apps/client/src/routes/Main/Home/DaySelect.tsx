import {
  Popover,
  Flex,
  IconButton,
  PopoverTrigger,
  Button,
  PopoverContent,
} from "@chakra-ui/react";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import DatePicker from "../../../components/DatePicker";
import { useRef } from "react";
import { DateTime } from "luxon";
import { useDtt } from "../../../consumers/sbhsApi/useDtt";
import { useDay } from "../../../consumers/sbhsApi/useDay";

export default function DaySelect({
  selected,
  setSelected,
}: {
  selected: Date | undefined;
  setSelected: (date: Date) => void;
}) {
  const initRef = useRef<HTMLButtonElement>(null);
  const date = selected ? DateTime.fromJSDate(selected).toISODate() : undefined;
  const { data: dtt } = useDtt();
  const { data: day } = useDay(date, date);

  return (
    <Popover closeOnBlur={false} initialFocusRef={initRef}>
      {({ onClose }) => (
        <>
          <Flex gap={3}>
            <IconButton
              icon={<ArrowLeft />}
              variant="outline"
              aria-label="Previous day"
              size={"sm"}
              onClick={() => {
                setSelected(
                  new Date((selected?.getTime() ?? Date.now()) - 86400000)
                );
              }}
            />
            <PopoverTrigger>
              <Button
                colorScheme="gray"
                variant={"outline"}
                w="full"
                size={"sm"}
              >
                {selected
                  ? `${selected.toLocaleDateString(undefined, {
                      weekday: "short",
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })} ${
                      date && day?.[date]?.week && day?.[date]?.weekType
                        ? `Wk ${day?.[date]?.week}${day?.[date]?.weekType}`
                        : ""
                    }`
                  : "Select date"}
              </Button>
            </PopoverTrigger>
            {selected &&
              dtt &&
              !DateTime.fromISO(dtt?.date).hasSame(
                DateTime.fromJSDate(selected),
                "day"
              ) && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    console.log(
                      DateTime.fromISO(dtt?.date),
                      DateTime.fromJSDate(selected)
                    );
                    if (dtt) {
                      setSelected(DateTime.fromISO(dtt.date).toJSDate());
                    }
                  }}
                >
                  Reset
                </Button>
              )}
            <IconButton
              icon={<ArrowRight />}
              variant="outline"
              aria-label="Next day"
              size={"sm"}
              onClick={() => {
                setSelected(
                  new Date((selected?.getTime() ?? Date.now()) + 86400000)
                );
              }}
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
              minDate={DateTime.now()
                .set({
                  month: 0,
                  day: 0,
                  hour: 0,
                  minute: 0,
                  second: 0,
                  millisecond: 0,
                })
                .toJSDate()}
            />
          </PopoverContent>
        </>
      )}
    </Popover>
  );
}
