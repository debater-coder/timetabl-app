import { DateTime } from "luxon";

// A data provider provides a queryFn and a select function. The result of
// queryFn should be serializable and deserializable with JSON.stringify. THis
// means types like Date will not work, as they will be serialised to a string
// but not deserialised back to a Date.

type LongOrShortString = {
  short: string;
  long?: string;
};

type Period = {
  start: DateTime;
  end: DateTime;
  teacher?: LongOrShortString;
  name?: LongOrShortString;
  location?: LongOrShortString;
};

export interface DataProvider {
  activate(): void;
  deactivate(): void;
  isActivated(): boolean;

  // Returns a scan-on barcode if applicable
  barcode?(): Promise<string>;
}
