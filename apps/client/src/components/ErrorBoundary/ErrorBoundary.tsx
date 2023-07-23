import {
  Flex,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
} from "@chakra-ui/react";
import { Component, ErrorInfo, ReactNode } from "react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <Flex>
          <Alert status="error" rounded={5} m={6}>
            <AlertIcon />
            <AlertTitle>An error occured.</AlertTitle>
            <AlertDescription>
              Check your console for more information.
            </AlertDescription>
          </Alert>
        </Flex>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
