import { Heading } from "@chakra-ui/react";
import {
  Switch,
  Flex,
  FormControl,
  FormLabel,
  useColorMode,
} from "@chakra-ui/react";

export default () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Flex direction={"column"} width="full" textAlign={"center"} p={5}>
      <Heading>Settings</Heading>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="dark-mode-switch" mb="0">
          Dark mode
        </FormLabel>
        <Switch
          id="dark-mode-switch"
          onChange={toggleColorMode}
          isChecked={colorMode === "dark"}
        />
      </FormControl>
    </Flex>
  );
};
