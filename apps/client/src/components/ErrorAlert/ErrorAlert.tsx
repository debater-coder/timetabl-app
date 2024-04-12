import { Alert, AlertIcon, AlertTitle, Button } from "@chakra-ui/react";
import * as Sentry from "@sentry/react";
import invariant from "tiny-invariant";

export const detectErrorType = (
  data: boolean,
  isError: boolean,
  isPaused: boolean
) => {
  if (!data && isPaused) {
    return "offline";
  }

  if (isError) {
    return "server";
  }

  return null;
};

export default function ErrorAlert({
  type,
  full,
}: {
  type: "offline" | "authorization" | "server" | "client" | null;
  full?: boolean;
}) {
  if (!type) {
    return null;
  }

  switch (type) {
    case "offline":
      return (
        <Alert
          status="info"
          rounded={5}
          maxW={!full ? "fit-content" : undefined}
        >
          <AlertIcon />
          <AlertTitle>You are offline.</AlertTitle>
        </Alert>
      );
    case "authorization":
      return (
        <Alert
          status="warning"
          rounded={5}
          maxW={!full ? "fit-content" : undefined}
        >
          <AlertIcon />
          <AlertTitle>Log in for the latest data</AlertTitle>
          <Button size="sm" colorScheme="orange" ml={6}>
            Login
          </Button>
        </Alert>
      );
    case "server":
      return (
        <Alert
          status="error"
          rounded={5}
          maxW={!full ? "fit-content" : undefined}
        >
          <AlertIcon />
          <AlertTitle>
            An error occured while fetching the latest data.
          </AlertTitle>
        </Alert>
      );
    case "client":
      return (
        <Alert
          status="error"
          rounded={5}
          maxW={!full ? "fit-content" : undefined}
        >
          <AlertIcon />
          <AlertTitle>Something went wrong.</AlertTitle>
          <Button
            size="sm"
            colorScheme="red"
            ml={6}
            onClick={() => Sentry.showReportDialog()}
          >
            Send feedback
          </Button>
        </Alert>
      );
    default:
      invariant(false, `Unknown error type: ${type}`);
      return null;
  }
}
