import {
  Text,
  Stack,
  useColorModeValue,
  ButtonGroup,
  IconButton,
  Link,
} from "@chakra-ui/react";
import { TimetablLogo } from "../../components/Nav/Nav";
import { FaGithub } from "react-icons/fa";
import { Envelope } from "phosphor-react";

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
        &copy; {new Date().getFullYear()}, Hamzah Ahmed under{" "}
        <Link
          href="https://github.com/debater-coder/timetabl-app/blob/main/LICENSE"
          color={"primary.500"}
          isExternal
        >
          MIT License.
        </Link>
      </Text>
    </Stack>
  );
};
