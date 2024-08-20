import {
  Flex,
  Heading,
  Spacer,
  useColorModeValue,
  useToken,
} from "@chakra-ui/react";

export default function Countdown() {
  const bgColor =
    useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55";

  return (
    <Flex bg={bgColor} rounded="lg" p={3} w="full" align="center">
      <Flex direction={"column"} align="left">
        <Heading fontFamily={"Poppins, sans-serif"} size="xs">
          Recess in
        </Heading>
        <Heading
          fontFamily={"Poppins, sans-serif"}
          size="lg"
          fontWeight={"Normal"}
        >
          00:00
        </Heading>
      </Flex>
      <Spacer />
      ere u go
    </Flex>
  );
}
