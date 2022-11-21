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
  Input,
  InputGroup,
  InputLeftElement,
  useColorModeValue,
  Spacer,
  Select,
  FormLabel,
  Highlight,
  FormControl,
} from "@chakra-ui/react";
import QueriesHandler from "../../../components/QueriesHandler";
import "@fontsource/poppins";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import DOMPurify from "dompurify";
import linkifyHtml from "linkify-html";
import { useState } from "react";
import { DateTime } from "luxon";
import { Search2Icon } from "@chakra-ui/icons";
import {
  TimetablNotice,
  NoticeYear,
  useDailyNotices,
} from "../../../hooks/sbhsQuery/use/useDailyNotices";
import { usePersistentState } from "../../../hooks/useSettings";

const timetablNews: TimetablNotice[] = [
  {
    title: "Welcome to Timetabl News!",
    content: "Keep checking back here for the latest news.",
    authorName: "Hamzah Ahmed",
    date: "2022-10-21",
    years: [
      NoticeYear.YEAR7,
      NoticeYear.YEAR8,
      NoticeYear.YEAR9,
      NoticeYear.YEAR10,
      NoticeYear.YEAR11,
      NoticeYear.YEAR12,
      NoticeYear.STAFF,
    ],
  },
];

const filterNotices = (
  notices: TimetablNotice[],
  filter: NoticeYear,
  query: string
) =>
  notices?.filter(
    (notice) =>
      [...(notice?.years ?? []), NoticeYear.ALL].includes(filter) &&
      (notice?.content.toLowerCase().includes(query.toLowerCase()) ||
        notice?.title.toLowerCase().includes(query.toLowerCase()) ||
        notice?.authorName.toLowerCase().includes(query.toLowerCase()))
  );

function Announcement({
  title,
  content,
  authorName,
  date,
  query,
}: {
  title?: string;
  content?: string;
  authorName?: string;
  date?: string;
  query: string;
}) {
  const { isOpen, onToggle } = useDisclosure();
  const [showShowMoreBtn, setShowShowMoreBtn] = useState(true);

  return (
    <Flex direction={"column"} align="left" w="full" maxW={"full"}>
      <Heading fontFamily={"Poppins, sans-serif"} size="md">
        <Highlight
          query={query}
          styles={{ bg: "primary.100", rounded: "5px", p: 1 }}
        >
          {title}
        </Highlight>
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
        <Heading size="sm">
          <Highlight
            query={query}
            styles={{ bg: "primary.100", rounded: "5px", p: 1 }}
          >
            {authorName}
          </Highlight>
        </Heading>
        <Text>
          {date && DateTime.fromISO(date).toLocaleString(DateTime.DATE_FULL)}
        </Text>
      </Flex>
    </Flex>
  );
}
function DailyNotices({
  filter,
  query,
}: {
  filter: NoticeYear;
  query: string;
}) {
  return (
    <QueriesHandler queries={{ notices: useDailyNotices() }}>
      {(isLoaded, { notices }: { notices: TimetablNotice[] }) => (
        <Skeleton isLoaded={isLoaded} rounded={5} minH={10} minW={40}>
          <Flex direction={"column"} align="center" gap={8}>
            {filterNotices(notices, filter, query)?.map((notice, index) => (
              <Announcement key={index} {...notice} query={query} />
            ))}
          </Flex>
        </Skeleton>
      )}
    </QueriesHandler>
  );
}

export default function Announcements() {
  const [tabIndex, setTabIndex] = useState(0);
  const handleTabsChange = (index: number) => {
    setTabIndex(index);
  };

  const [filter, setFilter] = usePersistentState(
    "announcementsFilter",
    "" + NoticeYear.ALL
  );
  const [query, setQuery] = useState("");

  return (
    <Flex w="full" direction={"column"}>
      <Flex
        align="left"
        bg={useColorModeValue("white", "gray.800")}
        w="full"
        zIndex={1}
        p={"5px"}
      >
        <InputGroup maxW="fit-content">
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder={`Search ${
              tabIndex ? "Timetabl News" : "Daily Notices"
            }`}
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </InputGroup>
        <Spacer />
        <FormControl maxW={"fit-content"} display={"flex"} alignItems="center">
          <FormLabel mb="0">Filter</FormLabel>
          <Select
            onChange={(event) => setFilter(event.target.value)}
            value={filter}
          >
            <option value={NoticeYear.ALL}>All</option>
            <option value={NoticeYear.YEAR7}>Year 7</option>
            <option value={NoticeYear.YEAR8}>Year 8</option>
            <option value={NoticeYear.YEAR9}>Year 9</option>
            <option value={NoticeYear.YEAR10}>Year 10</option>
            <option value={NoticeYear.YEAR11}>Year 11</option>
            <option value={NoticeYear.YEAR12}>Year 12</option>
            <option value={NoticeYear.STAFF}>Staff</option>
          </Select>
        </FormControl>
      </Flex>
      <Tabs
        variant="solid-rounded"
        mt={"10px"}
        index={tabIndex}
        onChange={handleTabsChange}
      >
        <TabList>
          <Tab>Daily Notices</Tab>
          <Tab>Timetabl News</Tab>
        </TabList>
        <TabPanels>
          {[0, 1].map((tab) => (
            <TabPanel key={tab}>
              {tab === 1 ? (
                <Flex direction={"column"} align="center" gap={8}>
                  {filterNotices(timetablNews, parseInt(filter), query)?.map(
                    (notice, index) => (
                      <Announcement key={index} {...notice} query={query} />
                    )
                  )}
                </Flex>
              ) : (
                <DailyNotices filter={parseInt(filter)} query={query} />
              )}
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
