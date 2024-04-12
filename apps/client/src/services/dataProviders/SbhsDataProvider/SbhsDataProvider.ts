import { DataProvider } from "../../../interfaces/DataProvider";

export class SbhsDataProvider implements DataProvider {
  constructor(public id: string) {}

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

  newsletter = { downloadUrl: "https://sbhs.co/hnpdf", name: "High Notes" };
}
