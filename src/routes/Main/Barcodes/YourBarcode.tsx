import { Flex, Skeleton } from "@chakra-ui/react";
import QueriesHandler from "../../../components/QueriesHandler";
import { useStudentID } from "../../../hooks/useSBHSQuery";
import SavedBarcode from "./SavedBarcode";

export default () => (
  <QueriesHandler queries={{ studentID: useStudentID() }}>
    {(isLoaded, { studentID }: { studentID: string }) => (
      <Flex direction={"column"} align="center" gap={3}>
        <Skeleton isLoaded={isLoaded} rounded={5} minH={10}>
          <SavedBarcode name="My ID" value={studentID} readOnly />
        </Skeleton>
      </Flex>
    )}
  </QueriesHandler>
);
