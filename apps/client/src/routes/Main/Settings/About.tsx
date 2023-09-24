import { version } from "../../../../package.json";
import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Heading,
  Link,
  Text,
} from "@chakra-ui/react";

export default function About() {
  return (
    <>
      <Heading size={"sm"} fontFamily="Poppins, sans-serif">
        version {version}
      </Heading>
      <Text>
        Timetabl is a blazing fast, offline-enabled, installable timetable app
        for SBHS.
      </Text>
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
              {
                'MIT License\n \
\n \
Copyright (c) 2022 Hamzah Ahmed \n \
\n \
Permission is hereby granted, free of charge, to any person obtaining a copy \
of this software and associated documentation files (the "Software"), to deal \
in the Software without restriction, including without limitation the rights \
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell \
copies of the Software, and to permit persons to whom the Software is \
furnished to do so, subject to the following conditions: \n \
\n \
The above copyright notice and this permission notice shall be included in all \
copies or substantial portions of the Software. \n \
\n \
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR \
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, \
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE \
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER \
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, \
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE \
SOFTWARE.'
              }
            </Text>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
