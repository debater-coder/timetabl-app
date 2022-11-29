import {
  Heading as ChakraHeading,
  Button as ChakraButton,
  Flex,
  Stack,
  Text as ChakraText,
  Image as ChakraImage,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SignIn } from "phosphor-react";
import { useState } from "react";
import { useAuth } from "../../hooks/useAuth";

const Heading = motion(ChakraHeading);
const Text = motion(ChakraText);
const Button = motion(ChakraButton);
const Image = motion(ChakraImage);

export const Hero = () => {
  const { login } = useAuth();
  const [loggingIn, setLoggingIn] = useState(false);

  const gradients = [
    "linear-gradient(to right, #F56565, #C53030)",
    "linear-gradient(to right, #ED8936, #C05621)",
    "linear-gradient(to right, #ECC94B, #B7791F)",
    "linear-gradient(to right, #48BB78, #2F855A)",
    "linear-gradient(to right, #38B2AC, #2C7A7B)",
    "linear-gradient(to right, #4299e1, #2b6cb0)",
    "linear-gradient(to right, #0BC5EA, #00A3C4)",
    "linear-gradient(to right, #9F7AEA, #6B46C1)",
    "linear-gradient(to right, #ED64A6, #B83280)",
  ];

  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      background: gradients,
      backgroundClip: "text",
      WebkitBackgroundClip: "text",
      transition: {
        delay: 1,
        duration: 20,
        repeat: Infinity,
      },
    },
  };

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
          as={motion.h2}
          variants={variants}
          initial={"hidden"}
          animate={"visible"}
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
      >
        <Image
          alt={"Hero Image"}
          align={"center"}
          src={
            "https://user-images.githubusercontent.com/52619668/195273003-55225579-829c-46c4-bd5b-4b37680bb675.png"
          }
          rounded={"2xl"}
          boxShadow={"2xl"}
          width={"full"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2, delay: 0.3 }}
        />
      </Flex>
    </Stack>
  );
};
