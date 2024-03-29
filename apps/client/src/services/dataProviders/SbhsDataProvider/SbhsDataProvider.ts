import { NoticeYear } from "../../../consumers/sbhsApi/schemas";
import { DataProvider, Notice, Period } from "../../../interfaces/DataProvider";
import { DateTime } from "luxon";

export class SbhsDataProvider implements DataProvider<NoticeYear> {
  activate(): void {
    throw new Error("Method not implemented.");
  }
  deactivate(): void {
    throw new Error("Method not implemented.");
  }
  isActivated(): boolean {
    throw new Error("Method not implemented.");
  }

  config = {
    name: { short: "SBHS", long: "SBHS Student Portal" },
    description: "Accesses timetable and notices from the SBHS Student Portal.",
  };

  barcode?:
    | { fetch: () => Promise<unknown>; parse: (data: unknown) => string }
    | undefined;

  dtt?:
    | {
        fetch: (date: DateTime) => Promise<unknown>;
        parse: (data: unknown) => Period[];
      }
    | undefined;

  cycle?:
    | { fetch: () => Promise<unknown>; parse: (data: unknown) => Period[] }
    | undefined;

  notices?:
    | {
        fetch: () => Promise<unknown>;
        parse: (data: unknown) => Notice<NoticeYear>[];
      }
    | undefined;

  newsletter = { downloadUrl: "https://sbhs.co/hnpdf", name: "High Notes" };
}
