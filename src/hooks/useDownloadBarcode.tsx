import JsBarcode from "jsbarcode";

/**
 * Download a `png` image of a barcode from a string
 */
export default (value: string) => {
  const canvas = document.createElement("canvas");
  JsBarcode(canvas, value, {
    displayValue: false,
  });
  const imageUrl = canvas.toDataURL("image/png");
  const anchor = document.createElement("a");
  anchor.href = imageUrl;
  anchor.download = "barcode.png";
  anchor.click();
};
