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
  Heading,
  RadioGroup,
  Radio,
  VStack,
} from "@chakra-ui/react";
import { Check } from "phosphor-react";
import useSettings from "../../../hooks/useSettings";
import "@fontsource/poppins";

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

const ColourPicker = ({ value, onChange }) => {
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
    onChange,
    value,
  });

  const group = getRootProps();

  return (
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
  );
};

export default () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const { primary, setPrimary, periodColours, setPeriodColours } =
    useSettings();

  return (
    <>
      <Heading size={"md"} fontFamily={"Poppins, sans-serif"}>
        Colours
      </Heading>
      <FormControl display="flex" alignItems="center">
        <FormLabel mb="0">Dark mode</FormLabel>
        <Switch onChange={toggleColorMode} isChecked={colorMode === "dark"} />
      </FormControl>
      <FormControl display="flex">
        <FormLabel mb="0">Primary Colour</FormLabel>
        <ColourPicker value={primary} onChange={setPrimary} />
      </FormControl>
      <FormControl display="flex">
        <FormLabel mb="0">Period colours</FormLabel>
        <RadioGroup value={periodColours} onChange={setPeriodColours}>
          <VStack align={"left"}>
            <Radio value="default">Default colours</Radio>
            <Radio value="primary">Primary colour</Radio>
            <Radio value="none">No colour coding</Radio>
          </VStack>
        </RadioGroup>
      </FormControl>
    </>
  );
};
