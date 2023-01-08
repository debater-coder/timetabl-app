import { Button, chakra, Heading } from "@chakra-ui/react";
import { useState } from "react";

export default () => {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <>
      <Heading fontFamily="Poppins, sans-serif" size="md">
        Latest High Notes
      </Heading>
      <chakra.object
        data="https://sbhs.co/hnpdf"
        type="application/pdf"
        width="100%"
        height="100%"
        p={8}
      >
        <Button
          as="a"
          mt={5}
          href="https://sbhs.co/hnpdf"
          isLoading={isLoading}
          loadingText="Opening PDF..."
          onClick={() => setIsLoading(true)}
        >
          Open PDF
        </Button>
      </chakra.object>
    </>
  );
};
