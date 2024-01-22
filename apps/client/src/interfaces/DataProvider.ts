import { DateTime } from "luxon";

export type LongOrShortString = {
  short: string;
  long?: string;
};

export type Period = {
  start: DateTime;
  end: DateTime;
  teacher?: LongOrShortString;
  name?: LongOrShortString;
  location?: LongOrShortString;
};

export const ContentEncodings = ["html", "markdown"] as const;
export type ContentEncoding = typeof ContentEncodings[number];

export type Notice<TAudience> = {
  date: DateTime;
  title: string;
  content: string;
  content_encoding: ContentEncoding;
  audiences: TAudience[];
  author: string;
};

// Fetch output must be serialisable to JSON
export interface DataProvider<TAudience> {
  activate(): void;
  deactivate(): void;
  isActivated(): boolean;

  config: {
    name: LongOrShortString;
    description: LongOrShortString;
  };

  barcode?: {
    fetch: () => Promise<unknown>;
    parse: (data: unknown) => string;
  };

  // Day Timetable
  dtt?: {
    fetch: (date: DateTime) => Promise<unknown>;
    parse: (data: unknown) => Period[];
  };

  cycle?: {
    fetch: () => Promise<unknown>;
    parse: (data: unknown) => Period[];
  };

  notices?: {
    fetch: () => Promise<unknown>;
    parse: (data: unknown) => Notice<TAudience>[];
  };

  newsletter?: {
    newsletterDownloadUrl: string;
  };
}
