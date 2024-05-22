import Barcode from "../../../components/Barcode";
import ErrorAlert, {
  detectErrorType,
} from "../../../components/ErrorAlert/ErrorAlert";
import NotAvailable from "../../../components/NotAvailable/NotAvailable";
import { useDataAmalgamator } from "../../../services/UserInterface";
import { Flex, Heading, Skeleton } from "@chakra-ui/react";
import { useQueries } from "@tanstack/react-query";

export default function Barcodes() {
  const barcodeQueries = useQueries({
    queries: useDataAmalgamator().barcodeQueries(),
  });

  if (barcodeQueries.length != 1 || !barcodeQueries?.[0]) {
    return <NotAvailable />;
  }

  const { data, isError, isPaused } = barcodeQueries[0];

  const errorType = detectErrorType(!!data, isError, isPaused);

  return (
    <Flex direction={"column"} gap={3} align="center" textAlign={"center"}>
      <Heading fontSize={"xl"} fontFamily={"Poppins, sans-serif"}>
        Scan on with your phone
      </Heading>

      {/** Error state */}
      <ErrorAlert type={errorType} full />

      {/** Happy path */}
      {(!errorType || data) && (
        <Flex direction={"column"} align="center" gap={3}>
          <Skeleton isLoaded={!!data} rounded={5} minH={10}>
            {data ? <Barcode value={data} /> : <Barcode value={"12345"} />}
          </Skeleton>
        </Flex>
      )}
    </Flex>
  );
}
