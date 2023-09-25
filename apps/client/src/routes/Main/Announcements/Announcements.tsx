import Empty from "../../../components/Empty";
import { NoticeYear, TimetablNotice } from "../../../consumers/sbhsApi/schemas";
import { useDailyNotices } from "../../../consumers/sbhsApi/useDailyNotices";
import { Search2Icon } from "@chakra-ui/icons";
import {
  Avatar,
  Button,
  Collapse,
  Flex,
  Heading,
  Skeleton,
  useDisclosure,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Select,
  FormLabel,
  Highlight,
  FormControl,
  Alert,
  AlertDescription,
  AlertTitle,
  Box,
} from "@chakra-ui/react";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import DOMPurify from "dompurify";
import linkifyHtml from "linkify-html";
import { DateTime } from "luxon";
import { MegaphoneSimple } from "phosphor-react";
import { useState } from "react";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

type AnnouncementState = {
  year: NoticeYear;
  setYear: (year: NoticeYear) => void;
};

const useAnnouncementStore = create<AnnouncementState>()(
  devtools(
    persist(
      (set): AnnouncementState => ({
        year: NoticeYear.ALL,
        setYear: (year) => set({ year }),
      }),
      {
        name: "announcement-storage",
      }
    )
  )
);

const filterNotices = (
  notices: TimetablNotice[] | undefined,
  filter: NoticeYear,
  query: string
) =>
  notices?.filter(
    (notice) =>
      [...(notice?.years ?? []), NoticeYear.ALL].includes(filter) &&
      (notice?.content?.toLowerCase().includes(query.toLowerCase()) ||
        notice?.title?.toLowerCase().includes(query.toLowerCase()) ||
        notice?.authorName?.toLowerCase().includes(query.toLowerCase()))
  );

function Announcement({
  title,
  content,
  authorName,
  date,
  query,
}: {
  title: string;
  content: string;
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
              setShowShowMoreBtn((content?.offsetHeight ?? 0) / 24 > 1)
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
            {authorName ?? ""}
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
  dailyNoticesLoading,
  dailyNotices,
}: {
  filter: NoticeYear;
  query: string;
  dailyNoticesLoading: boolean;
  dailyNotices?: TimetablNotice[];
}) {
  const notices = filterNotices(dailyNotices, filter, query);

  return (
    <Skeleton isLoaded={!dailyNoticesLoading} rounded={5} minH={10} minW={40}>
      <Flex direction={"column"} align="center" gap={8}>
        {notices?.length ? (
          notices?.map((notice, index) => {
            return <Announcement key={index} query={query} {...notice} />;
          })
        ) : (
          <Empty
            icon={MegaphoneSimple}
            text={"Keep checking back for the latest notices."}
            heading={"No notices for now"}
            colour={"primary.500"}
            size={"xl"}
          />
        )}
      </Flex>
    </Skeleton>
  );
}

export default function Announcements() {
  const { year, setYear } = useAnnouncementStore();

  const { data: dailyNotices, isLoading: dailyNoticesLoading } =
    useDailyNotices();

  const [query, setQuery] = useState("");
  const [isDownloading, setIsDownloading] = useState(false);

  return (
    <Flex w="full" direction={"column"} px={"30px"} gap={"20px"}>
      <Alert status="info" rounded={"md"}>
        <Box>
          <AlertTitle mb={2} fontFamily={"Poppins, sans-serif"}>
            Read the latest edition of the High Notes
          </AlertTitle>
          <AlertDescription>
            <Button
              as="a"
              href="https://sbhs.co/hnpdf"
              onClick={() => setIsDownloading(true)}
              isLoading={isDownloading}
              loadingText="Downloading PDF..."
            >
              Download High Notes PDF
            </Button>
          </AlertDescription>
        </Box>
      </Alert>
      <Flex align="" w="full" zIndex={1}>
        <InputGroup maxW="fit-content">
          <InputLeftElement pointerEvents="none">
            <Search2Icon color="gray.300" />
          </InputLeftElement>
          <Input
            placeholder={"Search Daily Notices"}
            value={query}
            variant="filled"
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
            onChange={(event) => setYear(parseInt(event.target.value))}
            value={year}
            variant="filled"
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
      <DailyNotices
        filter={year}
        query={query}
        dailyNotices={dailyNotices}
        dailyNoticesLoading={dailyNoticesLoading}
      />
    </Flex>
  );
}
