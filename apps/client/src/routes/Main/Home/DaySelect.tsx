import DatePicker from "../../../components/DatePicker";
import {
  Popover,
  Flex,
  IconButton,
  PopoverTrigger,
  Button,
  PopoverContent,
} from "@chakra-ui/react";
import { DateTime } from "luxon";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import { useRef } from "react";

/**
 * This component displays the current date shown and allows the user to select
 * a different one. If `selected` is undefined, then the button will display the
 * date from the active DTT. When a user selects a date, the `setSelected`
 * callback will be called with the selected date.
 */
export default function DaySelect({
  selected,
  setSelected,
}: {
  selected: Date | undefined;
  setSelected: (date: Date) => void;
}) {
  const initRef = useRef<HTMLButtonElement>(null);
  const { data: dtt } = useDtt();

  const date = selected
    ? DateTime.fromJSDate(selected).toISODate()
    : dtt?.date
    ? DateTime.fromISO(dtt?.date).toISODate()
    : undefined;

  const { data: day } = useDay(date, date);

  const moveDay = (amount: number) =>
    setSelected(
      new Date(
        (date ? DateTime.fromISO(date).toUnixInteger() * 1000 : Date.now()) +
          86400000 * amount
      )
    );

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
              onClick={() => moveDay(-1)}
            />
            <PopoverTrigger>
              <Button
                colorScheme="gray"
                variant={"outline"}
                w="full"
                size={"sm"}
              >
                {date
                  ? `${DateTime.fromISO(date).toLocaleString({
                      weekday: "short",
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })} ${
                      day && day?.[date]?.week && day?.[date]?.weekType
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
              onClick={() => moveDay(1)}
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
