import PdfViewer from "../../../components/PdfViewer";
import { Heading } from "@chakra-ui/react";

export default function Publications() {
  return (
    <>
      <Heading fontFamily="Poppins, sans-serif" size="md">
        Latest High Notes
      </Heading>
      <PdfViewer src="https://sbhs.co/hnpdf" />
    </>
  );
}
