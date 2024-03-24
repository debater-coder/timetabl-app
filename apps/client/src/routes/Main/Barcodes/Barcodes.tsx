import Barcode from "../../../components/Barcode";
import { useDataAmalgamator } from "../../../services/UserInterface";
import { Flex, Heading, Skeleton } from "@chakra-ui/react";
import { useQueries } from "@tanstack/react-query";
import invariant from "tiny-invariant";

export default function Barcodes() {
  const barcodeQueries = useQueries({
    queries: useDataAmalgamator().barcodeQueries(),
  });

  invariant(barcodeQueries.length == 1, "Expected exactly barcode query");
  invariant(barcodeQueries?.[0], "Expected barcode query to be defined");

  const { data } = barcodeQueries[0];

  return (
    <Flex direction={"column"} gap={3} align="center" textAlign={"center"}>
      <Heading fontSize={"xl"} fontFamily={"Poppins, sans-serif"}>
        Scan on with your phone
      </Heading>
      <Flex direction={"column"} align="center" gap={3}>
        <Skeleton isLoaded={!!data} rounded={5} minH={10}>
          {
            data && <Barcode value={data} /> // This is redundant but makes TS happy
          }
        </Skeleton>
      </Flex>
    </Flex>
  );
}
