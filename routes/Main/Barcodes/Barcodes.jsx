import Barcode from "../../../components/Barcode";
import { useAuth } from "../../../hooks/useAuth";
import useSBHSQuery from "../../../hooks/useSBHSQuery";
import {
  Skeleton,
  Tooltip,
  Icon,
  Flex,
  Heading,
  IconButton,
  useColorModeValue,
  Input,
  Button,
  CloseButton,
  Box,
  Text,
  FormControl,
  FormErrorMessage,
} from "@chakra-ui/react";
import "@fontsource/poppins";
import { Download } from "phosphor-react";
import useDownloadBarcode from "../../../hooks/useDownloadBarcode";
import { useState } from "react";
import { get, update } from "idb-keyval";
import compareObjects from "../../../utils/compareObjects";
import { Formik, Field, Form } from "formik";
import { Barcode as BarcodeIcon } from "phosphor-react";

const YourBarcode = () => {
  const { loading } = useAuth();
  const { data, error } = useSBHSQuery("details/userinfo.json", !loading);
  if (data || !error) {
    return (
      <Flex direction={"column"} align="center" gap={3}>
        <Flex align={"center"} justify="space-between" w={"full"}>
          <Tooltip
            label={
              "You can use this barcode to scan in with your phone or click the button on the right to download the barcode. If you are scanning using your phone, you must use the new scanners, like the ones outside the 600s or the ones outside Main Foyer opposite the Main Office."
            }
            closeOnClick={false}
          >
            <Icon
              boxSize={7}
              color={useColorModeValue("blue.500", "blue.300")}
            />
          </Tooltip>
          <IconButton
            colorScheme={"blue"}
            variant={"ghost"}
            icon={<Download />}
            onClick={() => useDownloadBarcode(data?.["studentId"])}
          />
        </Flex>
        <Skeleton isLoaded={!!data} rounded={5} minH={10}>
          <Barcode value={data?.["studentId"]} />
        </Skeleton>
      </Flex>
    );
  }

  return (
    "An error occured: " +
    error.message +
    ". Try logging in and out if the error persists."
  );
};

const SavedBarcode = ({ name, value, onDelete }) => (
  <Flex direction="column" align={"center"}>
    <Flex justify={"space-between"} align="center" mb={1} w="full">
      <Heading size={"sm"} fontFamily={"Poppins, sans-serif"}>
        {name}
      </Heading>
      <Flex align={"center"}>
        <IconButton
          colorScheme={"blue"}
          variant={"ghost"}
          icon={<Download />}
          onClick={() => useDownloadBarcode(value)}
        />
        <CloseButton onClick={() => onDelete(name)} />
      </Flex>
    </Flex>
    <Barcode value={value} />
  </Flex>
);

const Empty = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Icon boxSize={"50px"} color={"blue.500"} as={BarcodeIcon} />
      <Heading
        as="h2"
        size="xl"
        mt={1}
        mb={2}
        fontFamily={"Poppins, sans-serif"}
      >
        You have no saved barcodes.
      </Heading>
      <Text color={"gray.500"}>
        Type in a name for your barcode and its value, then click the{" "}
        <b>Add Barcode</b> button to save it.
      </Text>
    </Box>
  );
};

const SaveBarcodeForm = ({ addBarcode, barcodes }) => (
  <Formik
    initialValues={{
      name: "",
      value: "",
    }}
    onSubmit={(values, { resetForm }) => {
      addBarcode(values.name, values.value);
      resetForm();
    }}
    validate={(values) => {
      const errors = {};

      if (!values.name) {
        errors.name = "Required";
      } else if (barcodes.some((barcode) => barcode.name === values.name)) {
        errors.name = "Name must be unique";
      }

      if (!values.value) {
        errors.value = "Required";
      }

      return errors;
    }}
  >
    <Form>
      <Flex gap={1} mt={6} mb={3}>
        <Field name="name">
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.name && form.touched.name}>
              <Input {...field} placeholder="Name" variant={"filled"} />
              <FormErrorMessage>{form.errors.name}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name="value">
          {({ field, form }) => (
            <FormControl isInvalid={form.errors.value && form.touched.value}>
              <Input {...field} placeholder="Value" variant={"filled"} />
              <FormErrorMessage>{form.errors.value}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Flex>
      <Button type={"submit"} colorScheme={"blue"}>
        Save Barcode
      </Button>
    </Form>
  </Formik>
);

export default () => {
  const addBarcode = async (name, value) => {
    setBarcodes((barcodes) => [...barcodes, { name, value }]);
    await update("barcodes", (barcodes) => {
      if (!barcodes) {
        return [
          {
            name,
            value,
          },
        ];
      }
      return [...barcodes, { name, value }];
    });
  };

  const getBarcodes = async () => {
    const newBarcodes = await get("barcodes");
    if (!compareObjects(newBarcodes, barcodes)) {
      setBarcodes(newBarcodes ?? []);
    }
  };

  const deleteBarcode = async (name) => {
    setBarcodes((barcodes) =>
      barcodes.filter((barcode) => barcode.name !== name)
    );
    await update("barcodes", (barcodes) =>
      barcodes.filter((barcode) => barcode.name !== name)
    );
  };

  const [barcodes, setBarcodes] = useState([]);

  getBarcodes();

  return (
    <Flex direction={"column"} gap={3} align="center" textAlign={"center"}>
      <Heading fontSize={"xl"} fontFamily={"Poppins, sans-serif"}>
        Your scan in barcode
      </Heading>
      <YourBarcode />
      <Flex align="center" mt={6}>
        <Heading fontFamily={"Poppins, sans-serif"} fontSize="xl" mr={3}>
          Saved barcodes
        </Heading>
        <Tooltip
          label={
            "You can save your own barcodes here if you need to create a barcode with a custom value. Enter the name and value, then click the 'Add Barcode' button to save it. For a student barcode, you enter the student ID as the value."
          }
          closeOnClick={false}
        >
          <Icon boxSize={7} color={useColorModeValue("blue.500", "blue.300")} />
        </Tooltip>
      </Flex>
      <Flex
        direction={"column"}
        align="center"
        gap={3}
        mb={{ base: 80, md: 60 }}
      >
        {barcodes.length > 0 ? (
          barcodes.map(({ name, value }) => (
            <SavedBarcode
              name={name}
              value={value}
              key={name}
              onDelete={deleteBarcode}
            />
          ))
        ) : (
          <Empty />
        )}
      </Flex>
      <Flex
        direction={"column"}
        position={"fixed"}
        bottom={{ base: 20, md: 0 }}
        bg={useColorModeValue("gray.100", "gray.700")}
        p={4}
        roundedTop={10}
        shadow={"outline"}
      >
        <SaveBarcodeForm addBarcode={addBarcode} barcodes={barcodes} />
      </Flex>
    </Flex>
  );
};
