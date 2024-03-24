import { DataProvider } from "../../../interfaces/DataProvider";
import { DateTime } from "luxon";

export class TestDataProvider implements DataProvider {
  constructor(public id: string) {}

  activate = () => {
    localStorage.setItem("TestDataProviderActivated", "true");
    window.location.reload();
  };

  deactivate = () => {
    localStorage.setItem("TestDataProviderActivated", "false");
    window.location.reload();
  };

  isActivated = () =>
    localStorage.getItem("TestDataProviderActivated") === "true";

  config = {
    name: { short: "Test" },
    description: "Test Data Provider",
  };

  barcode = {
    queryFn: async () => "1234567890",
    gcTime: Infinity,
    id: "barcode",
  };

  dtt = {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    queryFn: async (date: string) => [
      {
        start: DateTime.fromISO("2023-09-20T09:00:00.000Z").toJSDate(),
        end: DateTime.fromISO("2023-09-20T10:00:00.000Z").toJSDate(),
        name: { short: "8LAT1", long: "8 Latin 1" },
        teacher: { short: "JSM", long: "Mr Smith" },
        location: { short: "203", long: "Room 203" },
        color: "#79f2cc",
      },
      {
        start: DateTime.fromISO("2023-09-20T10:05:00.000Z").toJSDate(),
        end: DateTime.fromISO("2023-09-20T11:05:00.000Z").toJSDate(),
        name: { short: "8MA1", long: "8 Math 1" },
        teacher: { short: "JBA", long: "Ms Bash" },
        location: { short: "103", long: "Room 103" },
        color: "#f28579",
      },
      {
        start: DateTime.fromISO("2023-09-20T11:10:00.000Z").toJSDate(),
        end: DateTime.fromISO("2023-09-20T11:40:00.000Z").toJSDate(),
        name: { short: "RCS", long: "Recess" },
      },
    ],

    gcTime: 1000 * 60 * 60 * 24 * 7,
    id: "dtt",
  };
}
