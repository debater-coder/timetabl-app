import { DataProvider } from "../../../interfaces/DataProvider";
import { DateTime } from "luxon";
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

  dtt = {
    fetch: async () => undefined,
    parse: (data: unknown) => [
      {
        start: DateTime.fromISO("2023-09-20T09:00:00.000Z"),
        end: DateTime.fromISO("2023-09-20T10:00:00.000Z"),
        name: { short: "8LAT1", long: "8 Latin 1" },
        teacher: { short: "JSM", long: "Mr Smith" },
        location: { short: "203", long: "Room 203" },
        color: "#79f2cc",
      },
      {
        start: DateTime.fromISO("2023-09-20T10:05:00.000Z"),
        end: DateTime.fromISO("2023-09-20T11:05:00.000Z"),
        name: { short: "8MA1", long: "8 Math 1" },
        teacher: { short: "JBA", long: "Ms Bash" },
        location: { short: "103", long: "Room 103" },
        color: "#f28579",
      },
      {
        start: DateTime.fromISO("2023-09-20T11:10:00.000Z"),
        end: DateTime.fromISO("2023-09-20T11:40:00.000Z"),
        name: { short: "RCS", long: "Recess" },
      },
    ],
  };
}
