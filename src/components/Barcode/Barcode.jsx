import JsBarcode from "jsbarcode";
import { chakra } from "@chakra-ui/react";

export default ({ value }) => {
  const barcodeCallback = (el) => {
    if (el) {
      JsBarcode(el, value);
    }
  };

  return <chakra.svg shadow={"lg"} ref={barcodeCallback} rounded={10} />;
};
