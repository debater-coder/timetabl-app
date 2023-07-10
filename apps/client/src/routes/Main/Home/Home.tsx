import {
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  Icon,
  useColorModeValue,
  useToken,
  Grid,
  GridItem,
  useMultiStyleConfig,
  useTab,
  Button,
  Flex,
  Heading,
} from "@chakra-ui/react";
import { CalendarBlank, Rows, SquaresFour } from "phosphor-react";
import React from "react";

const DayTimetable = () => {
  return <>Day Timetable</>;
};

const CycleTimetable = () => {
  return (
    <Flex
      direction={"column"}
      p={5}
      bg={useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55"}
      rounded={"lg"}
    >
      <Grid
        templateColumns="repeat(5, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap={3}
      >
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
        <GridItem w="100%" h="10" bg="blue.500" />
      </Grid>
    </Flex>
  );
};

// eslint-disable-next-line react/display-name
const ViewTab = React.forwardRef(
  (
    props: {
      tabName: string;
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      icon: React.ComponentType<any>;
    },
    ref: React.Ref<HTMLElement>
  ) => {
    const tabProps = useTab({ ...props, ref });
    const styles = useMultiStyleConfig("Tabs", tabProps);

    return (
      <Button
        __css={styles.tab}
        {...tabProps}
        roundedTop={"lg"}
        _hover={{
          bg: useToken("colors", "primary.500") + "22",
        }}
      >
        <Flex gap={2} align={"center"}>
          <Icon as={props.icon} boxSize={4} />
          {props.tabName}
        </Flex>
      </Button>
    );
  }
);

export default function Home() {
  return (
    <Flex direction={"column"} gap={1.5} w={"50vw"} minW={"300px"}>
      <Flex
        direction={"column"}
        p={5}
        bg={
          useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55"
        }
        rounded={"lg"}
        align={"center"}
      >
        <Heading size={"sm"} fontFamily={"Poppins, sans-serif"}>
          Roll call in
        </Heading>
        <Heading size={"2xl"} fontWeight={"normal"}>
          01:30:00
        </Heading>
      </Flex>
      <Tabs variant={"unstyled"} size={{ base: "sm", md: "md" }}>
        <TabList>
          <ViewTab tabName={"Day"} icon={CalendarBlank} />
          <ViewTab tabName={"Week"} icon={Rows} />
          <ViewTab tabName={"Cycle"} icon={SquaresFour} />
        </TabList>
        <TabPanels borderTop={"2px solid"} borderColor={"gray.500"}>
          <TabPanel>
            <DayTimetable />
          </TabPanel>
          <TabPanel>Weekly view is coming soon™️</TabPanel>
          <TabPanel>
            <CycleTimetable />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}
