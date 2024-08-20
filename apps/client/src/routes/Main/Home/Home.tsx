import {  Box, Button, Flex, IconButton, Select, Spacer, useBreakpointValue } from "@chakra-ui/react";
import { useQueries } from "@tanstack/react-query";
import { useDataAmalgamator } from "../../../services/UserInterface";
import ErrorAlert from "../../../components/ErrorAlert";
import { detectErrorType } from "../../../components/ErrorAlert/ErrorAlert";
import NotAvailable from "../../../components/NotAvailable";
import Period from "./Period";
import { ArrowLeft, ArrowRight } from "phosphor-react";
import Countdown from "./Countdown";


const DateSelector = () => <Button size="sm" colorScheme="gray">Mon, 24/06/2024, Wk 9B</Button>;

export default function Home() {
  const dttQueries = useQueries({
    queries: useDataAmalgamator().dttQueries('21/06/24')
  });

  if (dttQueries.length != 1 || !dttQueries?.[0]) {
    return <NotAvailable />;
  }

  const { data, isError, isPaused } = dttQueries[0];

  const errorType = detectErrorType(!!data, isError, isPaused);

  const shouldBreakLine = useBreakpointValue(
    { base: true, md: false },
    { ssr: false }
  );

  return (
    <Flex direction={"column"} w={"full"} px={2} maxW={"1000px"} gap={4}>
      <Countdown />
      <Flex align="center" gap={2} w="full">
        <Button size="sm" variant={"outline"} colorScheme="gray">Today</Button>
        <IconButton
              icon={<ArrowLeft />}
              variant="outline"
              colorScheme="gray"
              isRound
              aria-label="Previous day"
              size={"sm"}
            />
            <IconButton
              icon={<ArrowRight />}
              variant="outline"
              colorScheme="gray"
              isRound
              aria-label="Previous day"
              size={"sm"}
            />
            {!shouldBreakLine && <DateSelector />}
            <Spacer />
            <Select w="fit-content" variant={"filled"} rounded="lg" size="sm">
              <option value='option1'>Day</option>
              <option value='option2'>Week</option>
              <option value='option3'>Cycle</option>
            </Select>
      </Flex>
      {shouldBreakLine && <DateSelector />}
      {/** Error state */}
      <ErrorAlert type={errorType} full />
      {/** Happy path */}
      <Flex w="full" direction={"column"}>
        {(!errorType || data) && (data ? data.map(period => <Period period={period} isLoaded={!!data} />) : undefined)}
      </Flex>
    </Flex>
    );
}
