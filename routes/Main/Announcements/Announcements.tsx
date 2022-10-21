import {
  Avatar,
  Button,
  Collapse,
  Flex,
  Heading,
  Skeleton,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  useDisclosure,
  Text,
} from "@chakra-ui/react";
import QueriesHandler from "../../../components/QueriesHandler";
import { useDailyNotices } from "../../../hooks/useSBHSQuery";
import { TimetablNotices } from "../../../hooks/useSBHSQuery";
import "@fontsource/poppins";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import DOMPurify from "dompurify";
import linkifyHtml from "linkify-html";
import { useState } from "react";
import { DateTime } from "luxon";

function Announcement({
  title,
  content,
  authorName,
  date,
}: {
  title?: string;
  content?: string;
  authorName?: string;
  date?: string;
}) {
  const { isOpen, onToggle } = useDisclosure();
  const [showShowMoreBtn, setShowShowMoreBtn] = useState(true);

  return (
    <Flex direction={"column"} align="left" w="full">
      <Heading fontFamily={"Poppins, sans-serif"} size="md">
        {title}
      </Heading>
      <Collapse in={isOpen} animateOpacity startingHeight={32}>
        <Prose>
          <div
            ref={(content) =>
              setShowShowMoreBtn((content?.offsetHeight / 24 ?? 0) > 1)
            }
            dangerouslySetInnerHTML={{
              __html: linkifyHtml(DOMPurify.sanitize(content), {
                defaultProtocol: "https",
              }),
            }}
          />
        </Prose>
      </Collapse>
      <Flex gap={2} align="center">
        {showShowMoreBtn && (
          <Button size="sm" variant="outline" onClick={onToggle}>
            Show {isOpen ? "less" : "more"}
          </Button>
        )}
        <Avatar size="sm" name={authorName} />
        <Heading size="sm">{authorName}</Heading>
        <Text>
          {date && DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)}
        </Text>
      </Flex>
    </Flex>
  );
}

function DailyNotices() {
  return (
    <QueriesHandler queries={{ notices: useDailyNotices() }}>
      {(isLoaded, { notices }: { notices: TimetablNotices }) => (
        <Flex direction={"column"} align="center" gap={3}>
          <Skeleton isLoaded={isLoaded} rounded={5} minH={10} minW={40}>
            <Flex direction={"column"} gap={5}>
              {notices?.map((notice, index) => (
                <Announcement
                  key={index}
                  title={notice?.["title"]}
                  content={notice?.["content"]}
                  authorName={notice?.["authorName"]}
                />
              ))}
            </Flex>
          </Skeleton>
        </Flex>
      )}
    </QueriesHandler>
  );
}

export default function Announcements() {
  return (
    <Tabs w="full" variant="solid-rounded">
      <TabList>
        <Tab>Daily Notices</Tab>
        <Tab>Timetabl News</Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <DailyNotices />
        </TabPanel>
        <TabPanel>
          <Flex direction={"column"} align="left" w="full">
            <Announcement
              title="Welcome to Timetabl News!"
              content="Keep checking back here for the latest news."
              authorName="Hamzah Ahmed"
              date="2022-10-21"
            />
          </Flex>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}
