import {
  FormControl,
  FormLabel,
  Switch,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Button,
  useToast,
} from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";

export default () => {
  const { refresh, refreshing } = useAuth();
  const toast = useToast();

  return (
    <>
      <Alert status="warning" rounded={10}>
        <AlertIcon />
        <Box>
          <AlertTitle>These settings are intended for developers.</AlertTitle>
          <AlertDescription>
            Do not use these unless you know what you are doing.
          </AlertDescription>
        </Box>
      </Alert>
      <FormControl display="flex" alignItems="center">
        <FormLabel htmlFor="dark-mode-switch" mb="0">
          Debug mode
        </FormLabel>
        <Switch
          onChange={() => {
            if (localStorage.getItem("debug") === "true") {
              localStorage.setItem("debug", "false");
              window.location.reload();
            } else {
              if (
                window.confirm("Are you sure you want to enable debug mode?")
              ) {
                localStorage.setItem("debug", "true");
                window.location.reload();
              }
            }
          }}
          isChecked={localStorage.getItem("debug") === "true"}
        />
      </FormControl>
      <Button
        onClick={async () => {
          try {
            await refresh();
            toast({
              title: "Successfully refreshed token",
              status: "success",
            });
          } catch (error) {
            toast({
              title: "Error refreshing token",
              description: error instanceof Error ? error.message : "",
              status: "error",
            });
          }
        }}
        isLoading={refreshing}
      >
        Force Refresh Token
      </Button>
    </>
  );
};
