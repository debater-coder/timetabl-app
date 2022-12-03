import {
  SimpleGrid,
  Card,
  CardHeader,
  Heading,
  useToken,
  CardBody,
  Icon,
} from "@chakra-ui/react";
import { House, Barcode, Megaphone } from "phosphor-react";

export const Features = () => (
  <SimpleGrid minChildWidth="150px" spacing="40px">
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
  </SimpleGrid>
);
