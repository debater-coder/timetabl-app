import {
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  SimpleGrid,
  useRadio,
  Box,
  useRadioGroup,
  Icon,
  Flex,
} from "@chakra-ui/react";
import { Check } from "phosphor-react";
import useDynamicTheme from "../../../hooks/useDynamicTheme";

const PrimaryColour = (props) => {
  const { state, getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Flex
        {...checkbox}
        cursor="pointer"
        p={2}
        minW={10}
        bg={props.value + ".500"}
        rounded="full"
        align={"center"}
        justify={"center"}
      >
        <Icon
          color={"white"}
          as={Check}
          visibility={!state.isChecked && "hidden"}
          boxSize={5}
        />
      </Flex>
    </Box>
  );
};

const PrimaryColourPicker = () => {
  const { primary, setPrimary } = useDynamicTheme();

  const options = [
    "red",
    "orange",
    "yellow",
    "green",
    "teal",
    "blue",
    "cyan",
    "purple",
    "pink",
  ];

  const { getRootProps, getRadioProps } = useRadioGroup({
    onChange: setPrimary,
    value: primary,
  });

  const group = getRootProps();

  return (
    <FormControl display="flex">
      <FormLabel mb="0">Primary Colour</FormLabel>
      <SimpleGrid minChildWidth={20} spacing={5} {...group} w="full">
        {options.map((value) => {
          const radio = getRadioProps({ value });
          return (
            <PrimaryColour key={value} {...radio}>
              {value}
            </PrimaryColour>
          );
        })}
      </SimpleGrid>
    </FormControl>
  );
};

export default () => {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <>
      <FormControl display="flex" alignItems="center">
        <FormLabel mb="0">Dark mode</FormLabel>
        <Switch onChange={toggleColorMode} isChecked={colorMode === "dark"} />
      </FormControl>
      <PrimaryColourPicker />
    </>
  );
};
