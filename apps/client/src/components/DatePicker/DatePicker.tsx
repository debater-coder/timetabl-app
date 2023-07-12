import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import {
  Box,
  Button,
  Flex,
  IconButton,
  Spacer,
  Text,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import { Props, useDayzed } from "dayzed";

const monthNamesShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
const weekdayNamesShort = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

export default function DatePicker(
  props: Omit<Props, "children" | "render"> & {
    onDone?: () => void;
  }
) {
  const { calendars, getBackProps, getForwardProps, getDateProps } =
    useDayzed(props);

  if (calendars.length > 0) {
    return (
      <Flex
        maxW="300px"
        direction={"column"}
        bg={
          useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55"
        }
        p={4}
        rounded={"lg"}
      >
        {calendars.map((calendar) => (
          <Flex key={`${calendar.month}${calendar.year}`} direction={"column"}>
            <Flex align="center">
              <Text fontFamily={"Poppins, sans-serif"}>
                {monthNamesShort[calendar.month]} {calendar.year}
              </Text>
              <Spacer />
              <IconButton
                aria-label="back"
                {...getBackProps({ calendars })}
                icon={<ChevronLeftIcon />}
                variant={"ghost"}
              />
              <IconButton
                aria-label="forward"
                {...getForwardProps({ calendars })}
                icon={<ChevronRightIcon />}
                variant={"ghost"}
              />
            </Flex>
            <Flex>
              {weekdayNamesShort.map((weekday) => (
                <Text
                  key={`${calendar.month}${calendar.year}${weekday}`}
                  color={useColorModeValue("gray.500", "gray.300")}
                  fontFamily={"Poppins, sans-serif"}
                  w="calc(100% / 7)"
                  textAlign={"center"}
                >
                  {weekday}
                </Text>
              ))}
            </Flex>
            <Flex flexFlow={"row wrap"}>
              {calendar.weeks.map((week, weekIndex) =>
                week.map((dateObj, index) => {
                  const key = `${calendar.month}${calendar.year}${weekIndex}${index}`;
                  if (!dateObj) {
                    return <Box key={key} w="calc(100% / 7)" />;
                  }
                  const { date, selected, selectable } = dateObj;
                  return (
                    <Flex
                      key={key}
                      w="calc(100% / 7)"
                      align={"center"}
                      justify={"center"}
                      direction={"column"}
                    >
                      <Button
                        variant={selected ? "solid" : "ghost"}
                        key={key}
                        {...getDateProps({ dateObj })}
                        size="sm"
                      >
                        {selectable ? date.getDate() : "X"}
                      </Button>
                    </Flex>
                  );
                })
              )}
            </Flex>
          </Flex>
        ))}
        <Flex justify="end" gap={4}>
          <Button onClick={props?.onDone}>Done</Button>
        </Flex>
      </Flex>
    );
  }

  return null;
}
