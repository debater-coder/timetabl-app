import { Flex, Skeleton } from "@chakra-ui/react";
import QueryHandler from "../../../components/QueryHandler";
import { useStudentID } from "../../../hooks/useSBHSQuery";
import SavedBarcode from "./SavedBarcode";

export default () => (
  <QueryHandler query={useStudentID()}>
    {(isLoaded, studentID) => (
      <Flex direction={"column"} align="center" gap={3}>
        <Skeleton isLoaded={isLoaded} rounded={5} minH={10}>
          <SavedBarcode name="My ID" value={studentID} readOnly />
        </Skeleton>
      </Flex>
    )}
  </QueryHandler>
);
