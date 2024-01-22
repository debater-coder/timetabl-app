import { DataProvider } from "../../../interfaces/DataProvider";
import { z } from "zod";

export class TestDataProvider implements DataProvider {
  private activated = false;

  activate = () => {
    this.activated = true;
  };

  deactivate = () => {
    this.activated = false;
  };

  isActivated = () => this.activated;

  config = {
    name: { short: "Test" },
    description: "Test",
  };

  // Example implentation of fetch and parse
  barcode = {
    fetch: async () => ({
      barcode: "Test Barcode", // In reality, this would be fetched from the API
    }),

    parse: (data: unknown) => {
      const barcodeSchema = z.object({
        barcode: z.string(),
      });
      const { barcode } = barcodeSchema.parse(data);

      return barcode;
    },
  };
}
