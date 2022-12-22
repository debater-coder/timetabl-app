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
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import DOMPurify from "dompurify";
import linkifyHtml from "linkify-html";
import { useState } from "react";
import { DateTime } from "luxon";
import { Search2Icon } from "@chakra-ui/icons";
import { micromark } from "micromark";

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
  markdown,
}: {
  title?: string;
  content?: string;
  authorName?: string;
  date?: string;
  query: string;
  markdown?: boolean;
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
              __html: linkifyHtml(
                DOMPurify.sanitize(markdown ? micromark(content) : content),
                {
                  defaultProtocol: "https",
                }
              ),
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
  tab,
}: {
  filter: NoticeYear;
  query: string;
  tab: number;
}) {
  const dailyNotices = useDailyNotices();
  const timetablNews = useTimetablNews();

  return (
    <QueriesHandler queries={{ dailyNotices, timetablNews }}>
      {(
        isLoaded,
        {
          dailyNotices,
          timetablNews,
        }: { dailyNotices: TimetablNotice[]; timetablNews: TimetablNotice[] }
      ) => (
        <Skeleton isLoaded={isLoaded} rounded={5} minH={10} minW={40}>
          <Flex direction={"column"} align="center" gap={8}>
            {filterNotices(
              tab ? timetablNews : dailyNotices,
              filter,
              query
            )?.map((notice, index) => {
              return (
                <Announcement
                  key={index}
                  {...notice}
                  query={query}
                  markdown={!!tab}
                />
              );
            })}
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
        <FormControl
          maxW={"fit-content"}
          display={"flex"}
          alignItems="center"
          ml={"10px"}
        >
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
              <DailyNotices filter={parseInt(filter)} query={query} tab={tab} />
            </TabPanel>
          ))}
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
