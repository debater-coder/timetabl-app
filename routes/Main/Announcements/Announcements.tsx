import { Avatar, Flex, Heading, Skeleton } from "@chakra-ui/react";
import QueriesHandler from "../../../components/QueriesHandler";
import { useDailyNotices } from "../../../hooks/useSBHSQuery";
import { TimetablNotices } from "../../../hooks/useSBHSQuery";
import "@fontsource/poppins";
import { Prose } from "@nikolovlazar/chakra-ui-prose";
import DOMPurify from "dompurify";
import linkifyHtml from "linkify-html";

function Announcement({
  title,
  content,
  authorName,
}: {
  title?: string;
  content?: string;
  authorName?: string;
}) {
  return (
    <Flex direction={"column"}>
      <Heading fontFamily={"Poppins, sans-serif"} size="md">
        {title}
      </Heading>
      <Prose>
        <div
          dangerouslySetInnerHTML={{
            __html: linkifyHtml(DOMPurify.sanitize(content), {
              defaultProtocol: "https",
            }),
          }}
        />
      </Prose>
      <Flex gap={2} align="center">
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
