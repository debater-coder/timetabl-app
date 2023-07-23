import { chakra, Button } from "@chakra-ui/react";
import { useState } from "react";

interface PdfViewerProps {
  src: string;
}

export default function PdfViewer({ src }: PdfViewerProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <chakra.object
      data={src}
      type="application/pdf"
      width="100%"
      height="100%"
      p={8}
    >
      <Button
        as="a"
        mt={5}
        href={src}
        isLoading={isLoading}
        loadingText="Opening PDF..."
        onClick={() => setIsLoading(true)}
      >
        Open PDF
      </Button>
    </chakra.object>
  );
}
