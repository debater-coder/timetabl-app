import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Flex,
} from "@chakra-ui/react";

export default () => (
  <Flex>
    <Alert status="error" rounded={5} m={6}>
      <AlertIcon />
      <AlertTitle>An error occured.</AlertTitle>
      <AlertDescription>
        Try logging in and out if the error persists.
      </AlertDescription>
    </Alert>
  </Flex>
);
