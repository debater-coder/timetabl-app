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
import { ApiDtt, TimetablPeriod } from "../../../services/sbhsApi/types";
import NextPeriod from "./NextPeriod";
import { dttQuery, useDtt } from "../../../services/sbhsApi/useDtt";
import { useLoaderData } from "react-router-dom";
import { createLoader } from "../../../utils/createLoader";

export const loader = createLoader({ queryHook: dttQuery });

export default function Home() {
  const { data: initialData, isLoading } = useDtt({
    initialData: (useLoaderData() as [ApiDtt])[0],
    variables: {},
  });
  const [date, setDate] = useState<string | undefined>();
  const { data } = useDtt({
    variables: { date },
  });

  const initialDate = initialData?.date;

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

  const isLoaded = !isLoading;

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
        {initialDate === DateTime.now().toISODate() && (
          <NextPeriod
            {...{
              periods: initialPeriods,
              date: initialDate,
              countdown,
              setCountdown,
              isLoaded,
            }}
          />
        )}
        <Flex w="full" gap={3} as={motion.div} layout>
          <IconButton
            icon={<ArrowLeft />}
            variant="outline"
            onClick={() =>
              setDate(DateTime.fromISO(date).minus({ days: 1 }).toISODate())
            }
            aria-label="Previous day"
          />
          <Input
            type="date"
            value={date ?? initialDate ?? ""}
            onChange={({ target: { value } }) => setDate(value)}
            focusBorderColor="primary.200"
            as={motion.input}
            layout
          />
          <AnimatePresence>
            {date !== initialDate && (
              <Button
                variant="outline"
                onClick={() => setDate(undefined)}
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
            onClick={() =>
              setDate(DateTime.fromISO(date).plus({ days: 1 }).toISODate())
            }
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
                isLoaded={isLoaded}
              />
            ))
          ) : (
            <Empty
              icon={GiFrenchFries as As}
              colour="yellow.500"
              size="xl"
              heading="No periods on this day"
              text="Chill out, grab some Oporto, and enjoy your day off!"
            />
          )}
        </Flex>
      </Flex>
    </LayoutGroup>
  );
}
