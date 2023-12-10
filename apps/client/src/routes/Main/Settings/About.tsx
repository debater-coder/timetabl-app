import { version } from "../../../../package.json";
import ReleaseNotes from "../../../components/ReleaseNotes/ReleaseNotes";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Heading,
  Link,
  Text,
  useDisclosure,
} from "@chakra-ui/react";

export default function About() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Heading size={"sm"} fontFamily="Poppins, sans-serif">
        version {version}
      </Heading>
      <Text>
        Timetabl is a blazing fast, offline-enabled, installable timetable app
        for SBHS.
      </Text>
      <Button variant={"outline"} alignSelf={"flex-start"} onClick={onOpen}>
        Release notes
      </Button>
      <ReleaseNotes isOpen={isOpen} onClose={onClose} />
      <Text>
        Source code can be found on Github{" "}
        <Link
          href="https://github.com/debater-coder/timetabl-app"
          isExternal
          color={"primary.500"}
        >
          here
          <ExternalLinkIcon mx="2px" />
        </Link>
        . Also check out the slack forum{" "}
        <Link
          href="https://join.slack.com/t/timetabl/shared_invite/zt-1dhr2v791-G0IDTb~kLRXT~0vjmyEtmw"
          isExternal
          color={"primary.500"}
        >
          here
          <ExternalLinkIcon mx="2px" />
        </Link>
      </Text>
      <Text>
        Built by Hamzah Ahmed, with React and Chakra UI. Hosted by Vercel.
      </Text>
      <Accordion allowToggle>
        <AccordionItem>
          <AccordionButton>
            <Box flex="1" textAlign="left">
              <Heading fontFamily={"Poppins, sans-serif"} size="md">
                License
              </Heading>
            </Box>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel>
            <Text whiteSpace="pre-line">
              {"Copyright (c) 2022 Hamzah Ahmed"}
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
