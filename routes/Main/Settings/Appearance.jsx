import { FormControl, FormLabel, Switch, useColorMode } from "@chakra-ui/react";

export default () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <FormControl display="flex" alignItems="center">
      <FormLabel htmlFor="dark-mode-switch" mb="0">
        Dark mode
      </FormLabel>
      <Switch onChange={toggleColorMode} isChecked={colorMode === "dark"} />
    </FormControl>
  );
};
