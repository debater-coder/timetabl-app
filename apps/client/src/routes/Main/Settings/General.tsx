import { useSettingsStore } from "../../../stores/settings";
import { ColourScheme } from "../../../theme";
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
  Button,
  Input,
  Text,
  Link,
} from "@chakra-ui/react";
import { Check } from "phosphor-react";
import { useState } from "react";

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
  onChange: (nextValue: ColourScheme) => void;
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

export default function General() {
  const { colorMode, toggleColorMode } = useColorMode();
  const {
    primary,
    periodColours,
    setPrimary,
    setPeriodColours,
    reset,
    bgImage,
    setBgImage,
    darkenBlur,
    setDarkenBlur,
    setShowTimes,
    showTimes,
  } = useSettingsStore();

  const [deleting, setDeleting] = useState(false);

  return (
    <>
      <Heading size={"md"} fontFamily={"Poppins, sans-serif"}>
        Appearance
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
        <FormLabel mb="0">Show Times</FormLabel>
        <Switch
          onChange={() => setShowTimes(!showTimes)}
          isChecked={showTimes}
        />
      </FormControl>

      <FormControl display="flex" alignItems="center">
        <FormLabel mb="0">Background Image</FormLabel>
        <Input
          variant="filled"
          placeholder="https://url.to.image"
          value={bgImage}
          onChange={(e) => {
            setBgImage(e.target.value);
          }}
        ></Input>
      </FormControl>
      <Text>
        To use your own images, first upload them to an image hosting service
        such as{" "}
        <Link href="https://imgur.com/" color="primary.500">
          imgur
        </Link>
        .
      </Text>
      <FormControl display="flex" alignItems="center">
        <FormLabel mb="0">
          Darken and blur background for better readability
        </FormLabel>
        <Switch
          isChecked={darkenBlur}
          onChange={() => {
            setDarkenBlur(!darkenBlur);
          }}
        />
      </FormControl>
      <Heading size={"md"} fontFamily={"Poppins, sans-serif"}>
        Recovery
      </Heading>
      <FormControl display="flex">
        <Button
          colorScheme={deleting ? "red" : undefined}
          variant={deleting ? "outline" : undefined}
          onClick={() => {
            if (!deleting) {
              setDeleting(true);
              navigator.vibrate(20);
            } else {
              reset();
              setDeleting(false);
              navigator.vibrate(100);
            }
          }}
        >
          {deleting ? "Are you sure?" : "Reset all settings"}
        </Button>
      </FormControl>
    </>
  );
}
