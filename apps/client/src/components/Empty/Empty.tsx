import { As, Box, Heading, Icon, Text } from "@chakra-ui/react";
import { ReactNode } from "react";

export default function Empty({
  icon,
  text,
  heading,
  colour,
  size,
}: {
  icon: As;
  text: ReactNode;
  heading: ReactNode;
  colour: string;
  size: string;
}) {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Icon boxSize={"50px"} color={colour} as={icon} />
      <Heading
        as="h2"
        size={size}
        mt={1}
        mb={2}
        fontFamily={"Poppins, sans-serif"}
      >
        {heading}
      </Heading>
      <Text color={"gray.500"}>{text}</Text>
    </Box>
  );
}
