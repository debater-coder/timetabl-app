import { Heading } from "@chakra-ui/react";
import PdfViewer from "../../../components/PdfViewer";

export default () => {
  return (
    <>
      <Heading fontFamily="Poppins, sans-serif" size="md">
        Latest High Notes
      </Heading>
      <PdfViewer src="https://sbhs.co/hnpdf" />
    </>
  );
};