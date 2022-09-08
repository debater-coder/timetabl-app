import {
  FormControl,
  FormLabel,
  RadioGroup,
  Switch,
  useColorMode,
  Radio,
  VStack,
} from "@chakra-ui/react";
import useDynamicTheme from "../../../hooks/useDynamicTheme";

export default () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { primary, setPrimary } = useDynamicTheme();

  return (
    <>
      <FormControl display="flex" alignItems="center">
        <FormLabel mb="0">Dark mode</FormLabel>
        <Switch onChange={toggleColorMode} isChecked={colorMode === "dark"} />
      </FormControl>
      <FormControl display="flex">
        <FormLabel mb="0">Primary Colour</FormLabel>
        <RadioGroup onChange={setPrimary} value={primary}>
          <VStack spacing="24px" align={"left"}>
            <Radio value="red">Red</Radio>
            <Radio value="orange">Orange</Radio>
            <Radio value="yellow">Yellow</Radio>
            <Radio value="green">Green</Radio>
            <Radio value="teal">Teal</Radio>
            <Radio value="blue">Blue</Radio>
            <Radio value="cyan">Cyan</Radio>
            <Radio value="purple">Purple</Radio>
            <Radio value="pink">Pink</Radio>
          </VStack>
        </RadioGroup>
      </FormControl>
    </>
  );
};
