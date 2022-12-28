import { Flex, Spinner } from "@chakra-ui/react";
import { ReactNode, Suspense } from "react";

export default function SpinnerSuspense({ children }: { children: ReactNode }) {
  return (
    <Suspense
      fallback={
        <Flex w="full" h="full" align={"center"} justify="center">
          <Spinner size="xl" />
        </Flex>
      }
    >
      {children}
    </Suspense>
  );
}
