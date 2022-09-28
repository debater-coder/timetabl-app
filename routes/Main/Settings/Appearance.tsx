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
  UseRadioProps,
} from "@chakra-ui/react";
import { Check } from "phosphor-react";
import useSettings from "../../../hooks/useSettings";
import "@fontsource/poppins";

const PrimaryColour = (props: UseRadioProps) => {
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
          visibility={state.isChecked ? "visible" : "hidden"}
          boxSize={5}
        />
      </Flex>
    </Box>
  );
};

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

const ColourPicker = ({
  value,
  onChange,
}: {
  value: string;
  onChange: (nextValue: string) => void;
}) => {
  const { getRootProps, getRadioProps } = useRadioGroup({
    onChange,
    value,
  });

  const group = getRootProps();

  return (
    <SimpleGrid minChildWidth={20} spacing={5} {...group} w="full">
      {options.map((value) => {
        const radio = getRadioProps({ value });
        return <PrimaryColour key={value} {...radio} />;
      })}
    </SimpleGrid>
  );
};

export default () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    primary,
    setPrimary,
    periodColours,
    setPeriodColours,
    setExpanded,
    expanded,
    hoverExpand,
    setHoverExpand,
  } = useSettings();

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
      <FormControl display="flex" alignItems="center">
        <FormLabel mb="0">Expand periods by default</FormLabel>
        <Switch
          onChange={() => {
            if (expanded === "false") setHoverExpand("false");
            setExpanded(expanded === "true" ? "false" : "true");
          }}
          isChecked={expanded === "true"}
        />
      </FormControl>
      <FormControl display="flex" alignItems="center">
        <FormLabel mb="0">Hover to expand</FormLabel>
        <Switch
          isChecked={hoverExpand === "true"}
          onChange={() => {
            setHoverExpand(hoverExpand === "true" ? "false" : "true");
          }}
          disabled={expanded === "true"}
        />
      </FormControl>
    </>
  );
};
