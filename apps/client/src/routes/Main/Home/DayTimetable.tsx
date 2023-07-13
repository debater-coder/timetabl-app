import { Box, Flex, useColorModeValue } from "@chakra-ui/react";
import DaySelect from "./DaySelect";
import Period from "./Period";

export default function DayTimetable() {
  return (
    <Flex direction={"column"} gap={2} h="full">
      <DaySelect />
      <Flex h="full">
        <Flex direction={"column"} w="7ch" h="full" mr={1}>
          <Flex
            h="calc(100% / 7)"
            align={"center"}
            justify={"right"}
            color={useColorModeValue("gray.700", "gray.300")}
          >
            9 AM
          </Flex>
          <Flex
            h="calc(100% / 7)"
            align={"center"}
            justify={"right"}
            color={useColorModeValue("gray.700", "gray.300")}
          >
            10 AM
          </Flex>
          <Flex
            h="calc(100% / 7)"
            align={"center"}
            justify={"right"}
            color={useColorModeValue("gray.700", "gray.300")}
          >
            11 AM
          </Flex>
          <Flex
            h="calc(100% / 7)"
            align={"center"}
            justify={"right"}
            color={useColorModeValue("gray.700", "gray.300")}
          >
            12 PM
          </Flex>
          <Flex
            h="calc(100% / 7)"
            align={"center"}
            justify={"right"}
            color={useColorModeValue("gray.700", "gray.300")}
          >
            1 PM
          </Flex>
          <Flex
            h="calc(100% / 7)"
            align={"center"}
            justify={"right"}
            color={useColorModeValue("gray.700", "gray.300")}
          >
            2 PM
          </Flex>
          <Flex
            h="calc(100% / 7)"
            align={"center"}
            justify={"right"}
            color={useColorModeValue("gray.700", "gray.300")}
          >
            3 PM
          </Flex>
        </Flex>
        <Flex direction={"column"} w="full" h="full" position={"relative"}>
          <Flex h="calc(100% / 14)" />
          <Flex
            h="calc(100% / 7)"
            border={"1px solid"}
            borderBottom={"none"}
            borderColor={"gray.500"}
            opacity={"30%"}
            roundedTop={"lg"}
          ></Flex>
          <Flex
            h="calc(100% / 7)"
            border={"1px solid"}
            borderBottom={"none"}
            borderColor={"gray.500"}
            opacity={"30%"}
          ></Flex>
          <Flex
            h="calc(100% / 7)"
            border={"1px solid"}
            borderBottom={"none"}
            borderColor={"gray.500"}
            opacity={"30%"}
          ></Flex>
          <Flex
            h="calc(100% / 7)"
            border={"1px solid"}
            borderBottom={"none"}
            borderColor={"gray.500"}
            opacity={"30%"}
          ></Flex>
          <Flex
            h="calc(100% / 7)"
            border={"1px solid"}
            borderBottom={"none"}
            borderColor={"gray.500"}
            opacity={"30%"}
          ></Flex>
          <Flex
            h="calc(100% / 7)"
            border={"1px solid"}
            borderBottom={"none"}
            borderColor={"gray.500"}
            opacity={"30%"}
          ></Flex>
          <Flex
            h="calc(100% / 28)"
            border={"1px solid"}
            borderBottom={"none"}
            borderColor={"gray.500"}
            opacity={"30%"}
          ></Flex>
          <Box
            position={"absolute"}
            top={"calc(100% / 14)"}
            left={0}
            w="full"
            h={"calc(100% / 7)"}
          >
            <Period />
          </Box>
          <Box
            position={"absolute"}
            top={"calc(100% / 7 + 100% / 14 + 100% / 35)"}
            left={0}
            w="full"
            h={"calc(100% / 7)"}
          >
            <Period />
          </Box>
        </Flex>
      </Flex>
    </Flex>
  );
}
