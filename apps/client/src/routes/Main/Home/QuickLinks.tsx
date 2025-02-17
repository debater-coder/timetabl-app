import CanvasIcon from "../../../components/CanvasIcon";
import ClipboardIcon from "../../../components/ClipboardIcon";
import { Flex, Button } from "@chakra-ui/react";
import { GraduationCap, Envelope, MapTrifold} from "phosphor-react";
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
    <Flex mb={2} gap={4} align={"center"} justify={"center"}>
      <Flex overflowX="auto" gap={3} align={"center"}>
        <QuickLink
          to="https://canvas.sbhs.net.au/"
          icon={<CanvasIcon boxSize={3} />}
        >
          Canvas
        </QuickLink>
        <QuickLink to="https://student.sbhs.net.au/" icon={<GraduationCap />}>
          Portal
        </QuickLink>
        <QuickLink
          to="https://mail.google.com/a/student.sbhs.nsw.edu.au"
          icon={<Envelope />}
        >
          Mail
        </QuickLink>
        <QuickLink
          to="https://portal.clipboard.app/sbhs/calendar"
          icon={<ClipboardIcon boxSize={3} />}
        >
          Clipboard
        </QuickLink>
        <QuickLink to="https://sydneyhigh.school/publications/document-library/doc_view/7752-school-map" icon={<MapTrifold />}>School Map</QuickLink>
      </Flex>
    </Flex>
  );
}
