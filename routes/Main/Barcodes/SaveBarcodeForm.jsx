import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Field, Form, Formik } from "formik";

export default ({ addBarcode, barcodes }) => (
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
