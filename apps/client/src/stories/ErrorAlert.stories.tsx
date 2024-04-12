import ErrorAlert from "../components/ErrorAlert/ErrorAlert";
import { ChakraProvider } from "@chakra-ui/react";
import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof ErrorAlert> = {
  component: ErrorAlert,
};

export default meta;

export const Client: StoryObj<typeof ErrorAlert> = {
  render: () => (
    <ChakraProvider>
      <ErrorAlert type="client" />
    </ChakraProvider>
  ),
};

export const Server: StoryObj<typeof ErrorAlert> = {
  render: () => (
    <ChakraProvider>
      <ErrorAlert type="server" />
    </ChakraProvider>
  ),
};

export const Offline: StoryObj<typeof ErrorAlert> = {
  render: () => (
    <ChakraProvider>
      <ErrorAlert type="offline" />
    </ChakraProvider>
  ),
};

export const Authorization: StoryObj<typeof ErrorAlert> = {
  render: () => (
    <ChakraProvider>
      <ErrorAlert type="authorization" />
    </ChakraProvider>
  ),
};
