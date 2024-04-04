import { TimetablLogo } from "../../components/Nav/Nav";
import {
  Text,
  Stack,
  useColorModeValue,
  ButtonGroup,
  IconButton,
  Link,
  Box,
} from "@chakra-ui/react";
import { Envelope } from "phosphor-react";
import { FaGithub } from "react-icons/fa";

export const Footer = () => {
  return (
    <Stack spacing={{ base: "4", md: "5" }}>
      <Stack justify="space-between" direction="row" align="center">
        <TimetablLogo
          color={useColorModeValue("primary.700", "primary.200")}
          loggedIn={false}
        />
        <ButtonGroup variant="ghost" colorScheme={"gray"}>
          <IconButton
            as="a"
            href="mailto:feedback.timetabl@outlook.com"
            aria-label="LinkedIn"
            icon={<Envelope fontSize="1.25rem" />}
          />
          <IconButton
            as="a"
            href="https://github.com/debater-coder/timetabl-app"
            aria-label="GitHub"
            icon={<FaGithub fontSize="1.25rem" />}
          />
        </ButtonGroup>
      </Stack>
      <Text fontSize="sm" color="subtle">
        &copy; {new Date().getFullYear()}, Hamzah Ahmed
      </Text>
      <Box
        mt="6"
        fontSize="sm"
        fontWeight="semibold"
        display="inline-block"
        bg="black"
        color="white"
        px="4"
        py="2"
        rounded="lg"
        alignSelf={"center"}
        as="a"
        target="_blank"
        href="https://vercel.com"
      >
        Deployed by{" "}
        <span role="img" aria-label="Vercel logo">
          ▲
        </span>{" "}
        Vercel
      </Box>
    </Stack>
  );
};
