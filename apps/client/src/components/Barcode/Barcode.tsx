import { chakra } from "@chakra-ui/react";
import JsBarcode from "jsbarcode";

export default function Barcode({ value }: { value: string }) {
  const barcodeCallback = (el: Element | null) => {
    if (el) {
      JsBarcode(el, value);
    }
  };

  return <chakra.svg shadow={"lg"} ref={barcodeCallback} rounded={10} />;
}
