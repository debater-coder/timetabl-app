import {
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  useToken,
  CardBody,
  Icon,
  Badge,
} from "@chakra-ui/react";
import { House, Barcode, Megaphone, Calendar, Check } from "phosphor-react";
import "@fontsource/poppins";

export const Features = () => (
  <SimpleGrid minChildWidth="270px" spacing="40px">
    <Card bg="transparent" shadow="xl">
      <CardHeader>
        <Heading size="md" display={"flex"} alignItems="center" gap={2}>
          <Icon
            rounded="full"
            as={House}
            bg={useToken("colors", "primary.400") + "22"}
            boxSize={10}
            p={2}
            color="primary.400"
          />
          Day Timetable
        </Heading>
      </CardHeader>
      <CardBody>
        View a colour coded timetable with a countdown for any day.
      </CardBody>
    </Card>
    <Card bg="transparent" shadow="xl">
      <CardHeader>
        <Heading size="md" display={"flex"} alignItems="center" gap={2}>
          <Icon
            rounded="full"
            as={Barcode}
            bg={useToken("colors", "primary.400") + "22"}
            boxSize={10}
            p={2}
            color="primary.400"
          />
          Barcodes
        </Heading>
      </CardHeader>
      <CardBody>
        Scan on even without your ID card! Scan on with your phone, or download
        the barcode to print it out.
      </CardBody>
    </Card>
    <Card bg="transparent" shadow="xl">
      <CardHeader>
        <Heading size="md" display={"flex"} alignItems="center" gap={2}>
          <Icon
            rounded="full"
            as={Megaphone}
            bg={useToken("colors", "primary.400") + "22"}
            boxSize={10}
            p={2}
            color="primary.400"
            mirrored
          />
          Announcements
        </Heading>
      </CardHeader>
      <CardBody>
        Access your daily notices, filter to your year group and search for
        specific notices.
      </CardBody>
    </Card>
    <Card bg="transparent" shadow="xl">
      <CardHeader>
        <Heading size="md" display={"flex"} alignItems="center" gap={2}>
          <Icon
            rounded="full"
            as={Calendar}
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
        coming. View your sport from Clipboard, see when you assignments are due
        from Canvas and more.
      </CardBody>
    </Card>
    <Card bg="transparent" shadow="xl">
      <CardHeader>
        <Heading size="md" display={"flex"} alignItems="center" gap={2}>
          <Icon
            rounded="full"
            as={Check}
            bg={useToken("colors", "primary.400") + "22"}
            boxSize={10}
            p={2}
            color="primary.400"
          />
          Timetabl Tasks<Badge>Coming soon</Badge>
        </Heading>
      </CardHeader>
      <CardBody>
        Organise like a boss &mdash; record your homework, set due dates and get
        reminders for what homework to do and when.
      </CardBody>
    </Card>
    <Card bg="transparent" shadow="xl">
      <CardHeader>
        <Heading fontFamily={"Poppins, sans-serif"} size="md">
          And plenty more features to come!
        </Heading>
      </CardHeader>
    </Card>
  </SimpleGrid>
);
