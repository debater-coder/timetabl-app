import { Flex, Skeleton } from "@chakra-ui/react";
import { ApiProfile } from "../../../services/sbhsApi/types";
import SavedBarcode from "./SavedBarcode";

export default ({
  data,
  isLoading,
}: {
  data: ApiProfile;
  isLoading: boolean;
}) => (
  <Flex direction={"column"} align="center" gap={3}>
    <Skeleton isLoaded={!isLoading} rounded={5} minH={10}>
      <SavedBarcode name="My ID" value={data?.studentId} readOnly />
    </Skeleton>
  </Flex>
);
