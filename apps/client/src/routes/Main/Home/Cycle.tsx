import {
  Flex,
  useToken,
  useColorModeValue,
  Grid,
  GridItem,
  Text,
} from "@chakra-ui/react";

function Day() {
  return (
    <Flex direction={"column"} align={"center"}>
      <Text color={"gray.500"} fontWeight={"semibold"}>
        Mon A
      </Text>
      <Text>D&T</Text>
      <Text>D&T</Text>
      <Text>D&T</Text>
      <Text>D&T</Text>
      <Text>D&T</Text>
    </Flex>
  );
}

export default function CycleTimetable() {
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
