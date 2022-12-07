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
  console.log("calendar");
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
          Get a bird&apos;s eye view of your timetable, and see what&apos;s
          coming. View your sport from Clipboard, see when you assignments are
          due from Canvas and more.
        </CardBody>
      </Card>
    </Flex>
  );
};
