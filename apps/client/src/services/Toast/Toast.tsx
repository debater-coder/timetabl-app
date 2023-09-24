import { Notifier, NotifierOptions } from "../../interfaces/Notifier";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Button,
  Flex,
  UseToastOptions,
  chakra,
  createStandaloneToast,
} from "@chakra-ui/react";

class Toast implements Notifier {
  private ToastContainer: () => JSX.Element;
  private toast: (options: UseToastOptions) => void;

  constructor() {
    const { ToastContainer, toast } = createStandaloneToast();
    this.ToastContainer = ToastContainer;
    this.toast = toast;
  }

  getContainer = () => {
    return this.ToastContainer;
  };

  notify = (options: NotifierOptions) => {
    this.toast({
      duration: 9000,
      render: () => (
        <Alert
          status={options.status}
          variant={"solid"}
          borderRadius={"md"}
          boxShadow={"lg"}
        >
          <AlertIcon />
          <chakra.div flex="1" maxWidth="100%">
            <AlertTitle>{options.title}</AlertTitle>
            {options.message && (
              <AlertDescription display="block">
                {options.message}
              </AlertDescription>
            )}
          </chakra.div>
          <Flex gap={2} ml={2}>
            {options.actions?.map((action, index) => (
              <Button colorScheme="teal" onClick={action.onClick} key={index}>
                {action.label}
              </Button>
            ))}
          </Flex>
        </Alert>
      ),
    });
  };
}

export default Toast;
