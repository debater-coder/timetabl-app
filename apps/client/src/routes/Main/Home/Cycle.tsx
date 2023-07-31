import {
  Flex,
  useToken,
  useColorModeValue,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";
import { useTimetable } from "../../../services/sbhsApi/useTimetable";

function Period() {
  return (
    <Flex
      direction={["column", "column", "row"]}
      bg={useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55"}
      rounded={"lg"}
      gap={1}
      align="center"
      pr={[0, 0, 2]}
      fontFamily={"Poppins, sans-serif"}
    >
      <Text fontSize={"sm"} bg="blue.500" p={2} rounded="lg">
        D&T
      </Text>
      <Text fontSize={"sm"} fontWeight={"bold"}>
        506
      </Text>
    </Flex>
  );
}

function Day() {
  return (
    <Flex direction={"column"} align={"center"} gap={1}>
      <Text color={"gray.500"} fontWeight={"semibold"} fontSize={"sm"}>
        Mon A
      </Text>
      <Period />
      <Period />
      <Period />
      <Period />
      <Period />
    </Flex>
  );
}

export default function CycleTimetable() {
  const { data } = useTimetable();

  console.log(data);

  return (
    <Flex direction={"column"}>
      <Grid
        templateColumns="repeat(5, 1fr)"
        templateRows="repeat(3, 1fr)"
        gap={3}
      >
        <GridItem w="100%">
          <Day />
        </GridItem>
        <GridItem w="100%">
          <Day />
        </GridItem>
        <GridItem w="100%">
          <Day />
        </GridItem>
        <GridItem w="100%">
          <Day />
        </GridItem>
        <GridItem w="100%">
          <Day />
        </GridItem>
        <GridItem w="100%">
          <Day />
        </GridItem>
        <GridItem w="100%">
          <Day />
        </GridItem>
        <GridItem w="100%">
          <Day />
        </GridItem>
        <GridItem w="100%">
          <Day />
        </GridItem>
        <GridItem w="100%">
          <Day />
        </GridItem>
        <GridItem w="100%">
          <Day />
        </GridItem>
        <GridItem w="100%">
          <Day />
        </GridItem>
        <GridItem w="100%">
          <Day />
        </GridItem>
        <GridItem w="100%">
          <Day />
        </GridItem>
        <GridItem w="100%">
          <Day />
        </GridItem>
      </Grid>
    </Flex>
  );
}
