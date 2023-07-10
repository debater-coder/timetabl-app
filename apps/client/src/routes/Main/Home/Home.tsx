import {
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tabs,
  Flex,
  Icon,
  TabIndicator,
  useColorModeValue,
  useToken,
  Grid,
  GridItem,
  Text,
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

const ViewTab = (props: {
  tabName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  icon: React.ComponentType<any>;
}) => (
  <Tab
    roundedTop={"lg"}
    _hover={{
      bg: useToken("colors", "primary.500") + "22",
    }}
  >
    <Flex gap={2} align={"center"}>
      <Icon as={props.icon} boxSize={4} />
      {props.tabName}
    </Flex>
  </Tab>
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
      >
        Timer goes here
      </Flex>
      <Tabs variant={"unstyled"} size={{ base: "sm", md: "md" }}>
        <TabList>
          <ViewTab tabName={"Day"} icon={CalendarBlank} />
          <ViewTab tabName={"Week"} icon={Rows} />
          <ViewTab tabName={"Cycle"} icon={SquaresFour} />
        </TabList>
        <TabIndicator
          mt="-1.5px"
          height="2px"
          bg="blue.500"
          borderRadius="1px"
        />
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
