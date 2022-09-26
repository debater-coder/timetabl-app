import {
  Button,
  Flex,
  IconButton,
  Input,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import { TimetablDTT, useDTT } from "../../../hooks/useSBHSQuery";
import "@fontsource/poppins";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import QueriesHandler from "../../../components/QueriesHandler";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import { DateTime } from "luxon";
import Period from "./Period";
import NextPeriod from "./NextPeriod";
import Empty from "./Empty";

type HomeViewProps = {
  isLoaded: boolean;
  data: TimetablDTT;
  onDateChange: (date?: string) => void;
  date: string;
  initialDate: string;
  initialData: TimetablDTT;
};

const HomeView = ({
  isLoaded,
  data,
  onDateChange,
  date,
  initialDate,
  initialData,
}: HomeViewProps) => {
  const [countdown, setCountdown] = useState("");
  const periods =
    data?.periods ??
    Array(11).fill({
      name: "Loading... Loading... Loading",
      room: 605,
    });

  const initialPeriods =
    initialData?.periods ??
    Array(11).fill({
      name: "Loading... Loading... Loading",
      room: 605,
    });

  useEffect(() => {
    if (initialDate === date) {
      onDateChange();
    }
  }, [initialDate, date, onDateChange]);

  return (
    <LayoutGroup>
      <Flex direction={"column"} align="center" gap={3}>
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
              onDateChange(
                DateTime.fromISO(date).minus({ days: 1 }).toISODate()
              )
            }
            aria-label="Previous day"
          />
          <Input
            type="date"
            value={date ?? initialDate ?? ""}
            onChange={({ target: { value } }) => onDateChange(value)}
            focusBorderColor="primary.200"
            as={motion.input}
            layout
          />
          <AnimatePresence>
            {date !== initialDate && (
              <Button
                variant="outline"
                onClick={() => onDateChange()}
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
              onDateChange(DateTime.fromISO(date).plus({ days: 1 }).toISODate())
            }
            aria-label="Next day"
          />
        </Flex>
        <Flex
          direction={"column"}
          bg={
            useToken("colors", useColorModeValue("gray.300", "gray.500")) + "33"
          }
          minW={"50vw"}
          rounded={10}
          as={motion.div}
          layout
        >
          {periods.length ? (
            periods.map((period, index) => (
              <Period
                periodData={period}
                key={period["key"] ?? index + 100}
                isLoaded={isLoaded}
                date={date}
                transition={period?.name == "Transition"}
              />
            ))
          ) : (
            <Empty />
          )}
        </Flex>
      </Flex>
    </LayoutGroup>
  );
};

export default function Home() {
  const [date, setDate] = useState<string | undefined>();

  return (
    <QueriesHandler queries={{ dtt: useDTT(date), initialDtt: useDTT() }}>
      {(
        isLoaded: boolean,
        data: {
          dtt: TimetablDTT;
          initialDtt: TimetablDTT;
        }
      ) => (
        <HomeView
          isLoaded={isLoaded}
          data={data?.dtt}
          onDateChange={(date) => {
            setDate(date);
          }}
          date={date ?? data?.dtt?.date}
          initialDate={data?.initialDtt?.date}
          initialData={data?.initialDtt}
        />
      )}
    </QueriesHandler>
  );
}
