import {
  Flex,
  IconButton,
  Input,
  InputGroup,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";
import { useDTT } from "../../../hooks/useSBHSQuery";
import "@fontsource/poppins";
import { motion, LayoutGroup } from "framer-motion";
import QueriesHandler from "../../../components/QueriesHandler";
import { useState } from "react";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import { DateTime } from "luxon";
import Period from "./Period";
import NextPeriod from "./NextPeriod";
import Empty from "./Empty";

const HomeView = ({
  isLoaded,
  data,
  onDateChange,
  date,
  initialDate,
  initialData,
}) => {
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

  return (
    <Flex direction={"column"} align="center" gap={3}>
      <NextPeriod
        {...{
          periods: initialPeriods,
          date: initialDate,
          countdown,
          setCountdown,
          isLoaded,
        }}
      />
      <Flex w="full" gap={3}>
        <IconButton
          icon={<ArrowLeft />}
          variant="outline"
          onClick={() =>
            onDateChange(DateTime.fromISO(date).minus({ days: 1 }).toISODate())
          }
          aria-label="Previous day"
        />
        <InputGroup>
          <Input
            type="date"
            value={date ?? initialDate ?? ""}
            onChange={(event) => onDateChange(event.target.value)}
            focusBorderColor="primary.200"
          />
        </InputGroup>
        <IconButton
          icon={<ArrowRight />}
          variant="outline"
          onClick={() =>
            onDateChange(DateTime.fromISO(date).plus({ days: 1 }).toISODate())
          }
          aria-label="Next day"
        />
      </Flex>
      <LayoutGroup>
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
      </LayoutGroup>
    </Flex>
  );
};

export default function Home() {
  const [date, setDate] = useState();

  return (
    <QueriesHandler queries={{ dtt: useDTT(date), initialDtt: useDTT() }}>
      {(isLoaded, data) => (
        <HomeView
          isLoaded={isLoaded}
          data={data?.dtt}
          onDateChange={setDate}
          date={date ?? data?.dtt?.date}
          initialDate={data?.initialDtt?.date}
          initialData={data?.initialDtt}
        />
      )}
    </QueriesHandler>
  );
}
