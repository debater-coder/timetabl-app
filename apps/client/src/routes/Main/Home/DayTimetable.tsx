import { Flex } from "@chakra-ui/react";
import DaySelect from "./DaySelect";

export default function DayTimetable() {
  return (
    <Flex direction={"column"} gap={2} h="full">
      <DaySelect />
      <Flex h="full">
        <Flex direction={"column"} w="7ch" h="full" mr={1}>
          <Flex h="calc(100% / 7)" align={"center"} justify={"right"}>
            9 AM
          </Flex>
          <Flex h="calc(100% / 7)" align={"center"} justify={"right"}>
            10 AM
          </Flex>
          <Flex h="calc(100% / 7)" align={"center"} justify={"right"}>
            11 AM
          </Flex>
          <Flex h="calc(100% / 7)" align={"center"} justify={"right"}>
            12 PM
          </Flex>
          <Flex h="calc(100% / 7)" align={"center"} justify={"right"}>
            1 PM
          </Flex>
          <Flex h="calc(100% / 7)" align={"center"} justify={"right"}>
            2 PM
          </Flex>
          <Flex h="calc(100% / 7)" align={"center"} justify={"right"}>
            3 PM
          </Flex>
        </Flex>
        <Flex direction={"column"} w="full" h="full">
          <Flex h="calc(100% / 14)" />
          <Flex h="calc(100% / 7)" border={"1px solid orange"}>
            hi
          </Flex>
          <Flex h="calc(100% / 7)" border={"1px solid orange"}>
            hi
          </Flex>
          <Flex h="calc(100% / 7)" border={"1px solid orange"}>
            hi
          </Flex>
          <Flex h="calc(100% / 7)" border={"1px solid orange"}>
            hi
          </Flex>
          <Flex h="calc(100% / 7)" border={"1px solid orange"}>
            hi
          </Flex>
          <Flex h="calc(100% / 7)" border={"1px solid orange"}>
            hi
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
