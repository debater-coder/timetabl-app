import { Heading, Button, Flex, Stack, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { SignIn } from "phosphor-react";
import { lazy, Suspense, useState } from "react";
import { ErrorBoundary } from "../../../components/ErrorBoundary";
import { authActions } from "../../../stores/auth";

const HeroExperience = lazy(() => import("./HeroExperience"));

export const Hero = () => {
  const { login } = authActions;
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
        <Text fontSize={"xl"} color="gray.500">
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
        h="60vh"
        display={{ base: "none", md: "block" }}
      >
        <Suspense fallback={null}>
          <ErrorBoundary>
            <HeroExperience />
          </ErrorBoundary>
        </Suspense>
      </Flex>
    </Stack>
  );
};
