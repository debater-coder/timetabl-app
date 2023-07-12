import { Flex, Heading, Button } from "@chakra-ui/react";
import { GraduationCap, Envelope } from "phosphor-react";
import CanvasIcon from "../../../components/CanvasIcon/CanvasIcon";
import ClipboardIcon from "../../../components/ClipboardIcon/ClipboardIcon";
import { JSXElementConstructor, ReactElement, ReactNode } from "react";

function QuickLink(props: {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: ReactElement<any, string | JSXElementConstructor<any>> | undefined;
  children: ReactNode;
  to: string;
}) {
  return (
    <Button
      leftIcon={props.icon}
      colorScheme="gray"
      minW="min-content"
      size="sm"
      as={"a"}
      href={props.to}
      target="_blank"
    >
      {props.children}
    </Button>
  );
}

export default function QuickLinks() {
  return (
    <Flex mb={2} gap={4} align={"center"}>
      <Heading size={"xs"} fontFamily={"Poppins, sans-serif"}>
        Quick Links:
      </Heading>
      <Flex overflowX="auto" gap={4}>
        <QuickLink
          to="https://canvas.sbhs.net.au/"
          icon={<CanvasIcon boxSize={4} />}
        >
          Canvas
        </QuickLink>
        <QuickLink to="https://student.sbhs.net.au/" icon={<GraduationCap />}>
          Student Portal
        </QuickLink>
        <QuickLink
          to="https://mail.google.com/a/student.sbhs.nsw.edu.au"
          icon={<Envelope />}
        >
          Mail
        </QuickLink>
        <QuickLink
          to="https://portal.clipboard.app/sbhs/calendar"
          icon={<ClipboardIcon boxSize={4} />}
        >
          Clipboard
        </QuickLink>
      </Flex>
    </Flex>
  );
}
