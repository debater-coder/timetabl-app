import {
  Card,
  CardHeader,
  Heading,
  useToken,
  Badge,
  CardBody,
  Icon,
  Flex,
  Link
} from "@chakra-ui/react";

import { Calendar as CalendarIcon } from "phosphor-react";

export const Calendar = () => {
  return (
    <Flex w={"full"} h="full" direction={"column"} align="center">
      <Card bg="transparent" shadow="xl">
        <CardHeader>
          <Heading size="md" display={"flex"} alignItems="center" gap={2}>
            <Icon
              rounded="full"
              as={CalendarIcon}
              bg={useToken("colors", "primary.400") + "22"}
              boxSize={10}
              p={2}
              color="primary.400"
            />
            Calendar<Badge>Coming soon</Badge>
          </Heading>
        </CardHeader>
        <CardBody>
          Calendar is currently in development. Please check back in a few days.
          Currently planned features:
          <NodeList>
            <Node>Get a bird&apos;s eye view of your timetable</Node>
            <Node>View your sport from Clipboard</Node>
            <Node>See when your Canvas assignments are due</Node>
          </NodeList>
          If you have any suggestions, <Link
            href="https://github.com/debater-coder/timetabl-app/issues/new?assignees=debater-coder&labels=&template=feature_request.md&title=Feature%20Request%20for%20Calendar"
            color={"primary.500"}
          isExternal>please make a feature request</Link>.
        </CardBody>
      </Card>
    </Flex>
  );
};
