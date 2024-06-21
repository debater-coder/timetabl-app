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
    queryFn: async () => {
      return "1234567890";
    },
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
        teacher: [{ short: "JSM", long: "Mr Smith" }],
        location: [{ short: "203", long: "Room 203" }],
        color: "#79f2cc",
      },
      {
        start: DateTime.fromISO("2023-09-20T10:05:00.000Z").toJSDate(),
        end: DateTime.fromISO("2023-09-20T11:05:00.000Z").toJSDate(),
        name: { short: "8MA1", long: "8 Math 1" },
        teacher: [{ short: "JBA", long: "Ms Bash" }],
        location: [{ short: "103", long: "Room 103" }],
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

  notices = {
    queryFn: async () => [
      {
        date: DateTime.fromISO("2023-09-20T00:00:00.000Z").toJSDate(),
        title: "Test Notice",
        content: "This is a test notice.",
        content_encoding: "markdown" as const,
        audiences: ["ALL" as const],
        author: "Test Author",
      },
      {
        date: DateTime.fromISO("2024-04-01T00:00:00.000Z").toJSDate(),
        title: "Test Notice 2",
        content: `Certainly! Let's delve into the arcane and invent some truly one-of-a-kind Latin species names for these tech errors:

        Bugus Clientus Crypticus: A client-side bug that materializes only when the moon is in retrograde, whispering secrets to ancient compilers.
        Errorus Serverus Enigmatica: A spectral server error that manifests as a riddle in forgotten dialects, challenging sysadmins to decipher its cryptic runes.
        Offlineus WiFicus: A reclusive species dwelling in the shadowy realms of Wi-Fi dead zones, communicating via carrier pigeons and smoke signals.
        Authorizatus Rebellica: An audacious error that defies authentication protocols, wearing sunglasses indoors and sipping unauthorized access like a forbidden elixir.
        Remember, these species exist solely in the whimsical corridors of our imagination! 🌟🦄`,
        content_encoding: "markdown" as const,
        audiences: ["ALL" as const],
        author: "GPT-4",
      },
    ],
    gcTime: 1000 * 60 * 60 * 24 * 7,
    id: "notices",
  };

  nextSchoolDay = {
    queryFn: async () => "2024-06-21",
    gcTime: 1000 * 60 * 60 * 24,
    id: "nextSchoolDay"
  };

  newsletter = {
    downloadUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    name: "Rickroll Notes",
  };
}
