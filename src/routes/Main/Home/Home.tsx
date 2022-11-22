import {
  As,
  Button,
  Flex,
  IconButton,
  Input,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import "@fontsource/poppins";
import { motion, LayoutGroup, AnimatePresence } from "framer-motion";
import QueriesHandler from "../../../components/QueriesHandler";
import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import { DateTime } from "luxon";
import Empty from "./../../../components/Empty";
import { GiFrenchFries } from "react-icons/gi";
import { useDTT } from "../../../hooks/sbhsQuery/use";
import {
  TimetablDTT,
  TimetablPeriod,
} from "../../../hooks/sbhsQuery/use/useDTT";
import { DTTPeriod } from "../../../components/DTTPeriod";
import NextPeriod from "./NextPeriod";

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

  useEffect(() => {
    if (initialDate === date) {
      onDateChange();
    }
  }, [initialDate, date, onDateChange]);

  const [countdown, setCountdown] = useState("");

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
              <DTTPeriod
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
};

export default function Home() {
  const [date, setDate] = useState<string | undefined>();

  return (
    <QueriesHandler queries={{ dtt: useDTT(true, date), initialDtt: useDTT() }}>
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
