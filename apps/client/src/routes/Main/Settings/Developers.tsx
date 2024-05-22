import { DeleteIcon } from "@chakra-ui/icons";
import {
  FormControl,
  FormLabel,
  Switch,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Heading,
  useColorModeValue,
  Flex,
  Text,
  useToken,
  Button,
  IconButton,
  CloseButton,
  Select,
} from "@chakra-ui/react";
import { Plus } from "phosphor-react";

export default function Developers() {
  return (
    <>
      <Alert status="warning" rounded={10}>
        <AlertIcon />
        <Box>
          <AlertTitle>These settings are intended for developers.</AlertTitle>
          <AlertDescription>
            Do not use these unless you know what you are doing.
          </AlertDescription>
        </Box>
      </Alert>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="dark-mode-switch" mb="0">
          Debug mode
        </FormLabel>
        <Switch
          onChange={() => {
            if (localStorage.getItem("debug") === "true") {
              localStorage.setItem("debug", "false");
              window.location.reload();
            } else {
              if (
                window.confirm("Are you sure you want to enable debug mode?")
              ) {
                localStorage.setItem("debug", "true");
                window.location.reload();
              }
            }
          }}
          isChecked={localStorage.getItem("debug") === "true"}
        />
      </FormControl>
      <Heading size={"sm"} fontFamily="Poppins, sans-serif">
        Data Providers
      </Heading>
      <Flex
        bg={
          useToken("colors", useColorModeValue("gray.300", "gray.700")) + "55"
        }
        p={6}
        rounded="lg"
        justify="space-between"
        align="top"
      >
        <Flex direction="column" align="left">
          <Heading size={"md"} fontFamily="Poppins, sans-serif">
            SBHS Student Portal
          </Heading>
          <Text>
            Accesses timetable and notices from the SBHS Student Portal.
          </Text>
          <Button
            colorScheme={true ? "primary" : "gray"}
            size="sm"
            maxW="fit-content"
            mt={2}
          >
            {true ? "Deactivate" : "Activate"}
          </Button>
        </Flex>
        <CloseButton />
      </Flex>
      <Flex justify="space-between" gap={12}>
        <Select variant="filled">
          <option value="sbhs">SBHS Student Portal</option>
          <option value="test">Test Data Provider</option>
        </Select>
        <Button variant="outline" leftIcon={<Plus />}>
          Add
        </Button>
      </Flex>
    </>
  );
}
