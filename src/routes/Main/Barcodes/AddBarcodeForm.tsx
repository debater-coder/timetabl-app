import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  Input,
} from "@chakra-ui/react";
import { Field, FieldProps, Form, Formik } from "formik";
import { Barcode } from "./Barcodes";

export const AddBarcodeForm = ({
  addBarcode,
  barcodes,
}: {
  addBarcode: (name: string, value: string) => void;
  barcodes: Barcode[];
}) => (
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
      const errors: { name?: string; value?: string } = {};

      if (!values.name) {
        errors.name = "Required";
      } else if (barcodes.some((barcode) => barcode.name === values.name)) {
        errors.name = "Name must be unique";
      }

      if (!values.value) {
        errors.value = "Required";
      } else if (values.value.length > 100) {
        errors.value = "Value cannot exceed 100 characters";
      } else if (/[^ -~]+/.test(values.value)) {
        errors.value = "Value cannot contain fancy characters";
      }

      return errors;
    }}
  >
    <Form>
      <Flex gap={1} mt={6} mb={3}>
        <Field name="name">
          {({ field, form }: FieldProps<string, Barcode>) => (
            <FormControl isInvalid={!!form.errors.name && !!form.touched.name}>
              <Input {...field} placeholder="Name" variant={"filled"} />
              <FormErrorMessage>{form.errors.name}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
        <Field name="value">
          {({ field, form }: FieldProps<string, Barcode>) => (
            <FormControl isInvalid={form.errors.value && form.touched.value}>
              <Input {...field} placeholder="Value" variant={"filled"} />
              <FormErrorMessage>{form.errors.value}</FormErrorMessage>
            </FormControl>
          )}
        </Field>
      </Flex>
      <Button type={"submit"}>Add Barcode</Button>
    </Form>
  </Formik>
);
