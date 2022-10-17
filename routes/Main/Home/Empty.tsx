import { Box, Heading, Icon, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { GiFrenchFries } from "react-icons/gi";

const MotionIcon = motion(Icon);

export default () => {
  return (
    <Box textAlign="center" py={10} px={6} as={motion.div} layout>
      <MotionIcon
        boxSize={"50px"}
        color={"yellow.500"}
        as={GiFrenchFries}
        layout
      />
      <Heading
        size="xl"
        mt={1}
        mb={2}
        fontFamily={"Poppins, sans-serif"}
        as={motion.h2}
        layout
      >
        No periods on this day
      </Heading>
      <Text color={"gray.500"} as={motion.p} layout>
        Chill out, grab some Oporto, and enjoy your day off!{" "}
        {/* Or Subway :) */}
      </Text>
    </Box>
  );
};
