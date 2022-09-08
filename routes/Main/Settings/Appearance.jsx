import {
  FormControl,
  FormLabel,
  RadioGroup,
  Switch,
  useColorMode,
  Radio,
  SimpleGrid,
  useRadio,
  Box,
  useRadioGroup,
} from "@chakra-ui/react";
import useDynamicTheme from "../../../hooks/useDynamicTheme";

const PrimaryColour = (props) => {
  const { getInputProps, getCheckboxProps } = useRadio(props);

  const input = getInputProps();
  const checkbox = getCheckboxProps();

  return (
    <Box as="label">
      <input {...input} />
      <Box
        {...checkbox}
        cursor="pointer"
        _checked={{
          boxShadow: "outline",
        }}
        w={5}
        h={5}
        bg={props.value + ".500"}
        rounded="full"
      ></Box>
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
      <SimpleGrid minChildWidth={5} spacing={5} {...group} w="full">
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
