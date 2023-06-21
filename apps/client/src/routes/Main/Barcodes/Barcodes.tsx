import { Flex, Heading, Skeleton } from "@chakra-ui/react";
import Barcode from "../../../components/Barcode";
import { useProfile } from "../../../services/sbhsApi/useProfile";

export default function Barcodes() {
  const { data } = useProfile();

  return (
    <Flex direction={"column"} gap={3} align="center" textAlign={"center"}>
      <Heading fontSize={"xl"} fontFamily={"Poppins, sans-serif"}>
        Scan on with your phone
      </Heading>
      <Flex direction={"column"} align="center" gap={3}>
        <Skeleton isLoaded={!!data} rounded={5} minH={10}>
          {
            data && <Barcode value={data.studentId} /> // This is redundant but makes TS happy
          }
        </Skeleton>
      </Flex>
    </Flex>
  );
}
