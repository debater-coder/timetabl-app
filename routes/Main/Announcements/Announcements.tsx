import { Flex } from "@chakra-ui/react";
import QueriesHandler from "../../../components/QueriesHandler";
import { useDailyNotices } from "../../../hooks/useSBHSQuery";

export default function Announcements() {
  return (
    <QueriesHandler queries={{ notices: useDailyNotices() }}>
      {(isLoaded, { notices }) => (
        <Flex direction={"column"} align="center" gap={3}>
          Annnouncements
        </Flex>
      )}
    </QueriesHandler>
  );
}
