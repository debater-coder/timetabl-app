import { Flex, Heading, Skeleton } from "@chakra-ui/react";
import { useQueries } from "@tanstack/react-query";
import { useDataAmalgamator } from "../../../services/UserInterface";
import ErrorAlert from "../../../components/ErrorAlert";
import { detectErrorType } from "../../../components/ErrorAlert/ErrorAlert";
import NotAvailable from "../../../components/NotAvailable";
import Period from "./Period";

export default function Home() {
  const dttQueries = useQueries({
    queries: useDataAmalgamator().dttQueries('21/06/24')
  });

  if (dttQueries.length != 1 || !dttQueries?.[0]) {
    return <NotAvailable />;
  }

  const { data, isError, isPaused } = dttQueries[0];

  const errorType = detectErrorType(!!data, isError, isPaused);

  return (
    <Flex direction={"column"} w={"full"} px={2} maxW={"1000px"}>

      {/** Error state */}
      <ErrorAlert type={errorType} full />

      {/** Happy path */}
      {(!errorType || data) && (data ? data.map(period => <Period period={period} isLoaded={!!data}  />) : undefined)}
    </Flex>
    );
}
