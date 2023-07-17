import {
  Flex,
  useToken,
  useColorModeValue,
  Heading,
  Skeleton,
} from "@chakra-ui/react";
import { useDtt } from "../../../services/sbhsApi/useDtt";

export default function Countdown() {
  const { data: dtt } = useDtt();
  const isLoaded = !!dtt;

  return (
    <Skeleton isLoaded={isLoaded}>
      <Flex
        direction={"column"}
        p={3}
        bg={
          useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55"
        }
        rounded={"lg"}
        align={"center"}
      >
        <Heading size={"xs"} fontFamily={"Poppins, sans-serif"}>
          Roll call in
        </Heading>
        <Heading
          size={"lg"}
          fontFamily={"Poppins, sans-serif"}
          fontWeight={"normal"}
        >
          01:30:00
        </Heading>
      </Flex>
    </Skeleton>
  );
}
