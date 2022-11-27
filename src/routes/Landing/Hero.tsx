import {
  Heading as ChakraHeading,
  Button as ChakraButton,
  Flex as ChakraFlex,
  Box,
  Stack,
  Text as ChakraText,
  Image,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SignIn } from "phosphor-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Heading = motion(ChakraHeading);
const Text = motion(ChakraText);
const Button = motion(ChakraButton);
const Flex = motion(ChakraFlex);

export const Hero = () => {
  const { login } = useAuth();
  const [loggingIn, setLoggingIn] = useState(false);

  return (
    <Stack
      align={"center"}
      spacing={{ base: 8, md: 10 }}
      py={{ base: 20, md: 28 }}
      direction={{ base: "column", md: "row" }}
    >
      <Stack flex={1} spacing={{ base: 5, md: 10 }} align="left">
        <Heading
          fontSize={{ base: "3xl", sm: "4xl", lg: "6xl" }}
          fontFamily="Poppins, sans-serif"
          bgClip={"text"}
          pb={"5px"} // Fix clipping bug
          bgGradient="linear(to-r, primary.400, primary.600)"
          as={motion.h2}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2 }}
        >
          Never be late again.
        </Heading>
        <Text
          fontSize={"xl"}
          color="gray.500"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.1 }}
        >
          Timetabl is a fast, reliable, timetable app for Sydney Boys High
          School students.
        </Text>
        <Button
          maxW={"fit-content"}
          leftIcon={<SignIn />}
          isLoading={loggingIn}
          loadingText="Logging you in..."
          onClick={() => {
            setLoggingIn(true);
            login();
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.2 }}
        >
          Login with SBHS
        </Button>
      </Stack>
      <Flex
        flex={1}
        justify={"center"}
        align={"center"}
        position={"relative"}
        w={"full"}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 2, delay: 0.3 }}
      >
        <Box
          position={"relative"}
          height={"300px"}
          rounded={"2xl"}
          boxShadow={"2xl"}
          width={"full"}
          overflow={"hidden"}
        >
          <Image
            alt={"Hero Image"}
            align={"center"}
            w={"100%"}
            h={"100%"}
            src={
              "https://user-images.githubusercontent.com/52619668/195273003-55225579-829c-46c4-bd5b-4b37680bb675.png"
            }
          />
        </Box>
      </Flex>
    </Stack>
  );
};
