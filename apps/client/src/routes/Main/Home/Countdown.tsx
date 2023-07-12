import {
  Flex,
  useToken,
  useColorModeValue,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { TimetablDtt } from "../../../services/sbhsApi/schemas";

export default function Countdown(props: { dtt?: TimetablDtt }) {
  const isLoaded = !!props.dtt;

  return (
    <Skeleton isLoaded={isLoaded}>
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
    </Skeleton>
  );
}
