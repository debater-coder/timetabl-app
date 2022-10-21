import {
  Avatar,
  Button,
  Collapse,
  Flex,
  Heading,
  Skeleton,
  useDisclosure,
} from "@chakra-ui/react";
import QueriesHandler from "../../../components/QueriesHandler";
import { useDailyNotices } from "../../../hooks/useSBHSQuery";
import { TimetablNotices } from "../../../hooks/useSBHSQuery";
import "@fontsource/poppins";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import DOMPurify from "dompurify";
import linkifyHtml from "linkify-html";
import { useRef } from "react";

function Announcement({
  title,
  content,
  authorName,
}: {
  title?: string;
  content?: string;
  authorName?: string;
}) {
  const { isOpen, onToggle } = useDisclosure();
  const contentRef = useRef<HTMLDivElement>(null);

  const numberOfLines = contentRef.current?.offsetHeight / 24 ?? false;

  console.log(numberOfLines);

  return (
    <Flex direction={"column"} align="left">
      <Heading fontFamily={"Poppins, sans-serif"} size="md">
        {title}
      </Heading>
      <Collapse in={isOpen} animateOpacity startingHeight={32}>
        <Prose>
          <div
            ref={contentRef}
            dangerouslySetInnerHTML={{
              __html: linkifyHtml(DOMPurify.sanitize(content), {
                defaultProtocol: "https",
              }),
            }}
          />
        </Prose>
      </Collapse>
      <Flex gap={2} align="center">
        {numberOfLines > 1 && (
          <Button size="sm" variant="outline" onClick={onToggle}>
            Show {isOpen ? "less" : "more"}
          </Button>
        )}
        <Avatar size="sm" name={authorName} />
        <Heading size="sm">{authorName}</Heading>
      </Flex>
    </Flex>
  );
}

export default function Announcements() {
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
