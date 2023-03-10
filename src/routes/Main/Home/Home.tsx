import {
  As,
  Button,
  Flex,
  IconButton,
  Input,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import { DateTime } from "luxon";
import Empty from "./../../../components/Empty";
import { GiFrenchFries } from "react-icons/gi";
import { DTTPeriod } from "../../../components/DTTPeriod";
import { TimetablPeriod } from "../../../services/sbhsApi/types";
import NextPeriod from "./NextPeriod";
import { useDtt } from "../../../services/sbhsApi/useDtt";

export default function Home() {
  const { data: initialData, isLoading: initialIsLoading } = useDtt({
    variables: {},
  });
  const initialDate = initialData?.date ?? DateTime.now().toISODate();
  const [date, setDate] = useState<string>("initial");
  const resetDate = () => setDate("initial");
  const nextDay = () => {
    const newDate = DateTime.fromISO(date === "initial" ? initialDate : date)
      .plus({ days: 1 })
      .toISODate();
    setDate(newDate);
    if (newDate === initialDate) resetDate();
  };

  const previousDay = () => {
    const newDate = DateTime.fromISO(date === "initial" ? initialDate : date)
      .minus({ days: 1 })
      .toISODate();
    setDate(newDate);
    if (newDate === initialDate) resetDate();
  };

  const { data, isLoading } = useDtt(
    {
      variables: {},
    },
    date === "initial" ? undefined : date
  );

  const periods: TimetablPeriod[] =
    data?.periods ??
    Array(7).fill({
      name: "Loading... Loading... Loading",
      room: 605,
    });

  const initialPeriods =
    initialData?.periods ??
    Array(7).fill({
      name: "Loading... Loading... Loading",
      room: 605,
    });

  const [countdown, setCountdown] = useState("");

  const activeIndex =
    date === initialDate
      ? periods.findIndex(
          ({ time, endTime }) =>
            time < DateTime.now() && DateTime.now() < endTime
        )
      : -1;

  return (
    <LayoutGroup>
      <Flex direction={"column"} align="center" gap={1.5}>
        {initialDate === DateTime.now().toISODate() && ( // Initial date === today
          <NextPeriod
            {...{
              periods: initialPeriods,
              date: initialDate,
              countdown,
              setCountdown,
              isLoaded: !initialIsLoading,
            }}
          />
        )}
        <Flex w="full" gap={3} as={motion.div} layout>
          <IconButton
            icon={<ArrowLeft />}
            variant="outline"
            onClick={previousDay}
            aria-label="Previous day"
          />
          <Input
            type="date"
            value={date === "initial" ? initialDate : date}
            onChange={({ target: { value } }) => setDate(value)}
            focusBorderColor="primary.200"
            as={motion.input}
            layout
          />
          <AnimatePresence>
            {date !== "initial" && (
              <Button
                variant="outline"
                onClick={resetDate}
                as={motion.button}
                layout
              >
                Reset
              </Button>
            )}
          </AnimatePresence>
          <IconButton
            icon={<ArrowRight />}
            variant="outline"
            onClick={nextDay}
            aria-label="Next day"
          />
        </Flex>
        <Flex
          direction={"column"}
          bg={`${useToken(
            "colors",
            useColorModeValue("gray.300", "gray.500")
          )}33`}
          minW={"50vw"}
          rounded={10}
          as={motion.div}
          layout
        >
          {periods.length ? (
            periods.map((period, index) => (
              <DTTPeriod
                active={activeIndex === index}
                period={period}
                key={period.key ?? index + 100}
                isLoaded={!isLoading}
              />
            ))
          ) : (
            <Empty
              icon={GiFrenchFries as As}
              colour="yellow.500"
              size="xl"
              heading="No periods on this day"
              text="Chill out, grab some snacks, and enjoy your day off!"
            />
          )}
        </Flex>
      </Flex>
    </LayoutGroup>
  );
}
