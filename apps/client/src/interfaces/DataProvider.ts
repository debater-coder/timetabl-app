export type LongOrShortString = {
  short: string;
  long?: string;
};

export type Period = {
  start: Date;
  end: Date;
  name: LongOrShortString;
  teacher?: LongOrShortString;
  location?: LongOrShortString;
  color?: string;
};

export const contentEncodings = ["html", "markdown"] as const;
export type ContentEncoding = typeof contentEncodings[number];

export const dataProviderQueries = [
  "barcode",
  "dtt",
  "cycle",
  "notices",
  "nextSchoolDay",
] as const;

export type DataProviderQuery = typeof dataProviderQueries[number];

export type Notice<TAudience> = {
  date: Date;
  title: string;
  content: string;
  content_encoding: ContentEncoding;
  audiences: TAudience[];
  author: string;
};

export interface DataProvider<TAudience = never> {
  activate(): void;
  deactivate(): void;
  isActivated(): boolean;

  id: string;

  config: {
    name: LongOrShortString;
    description: string;
  };

  barcode?: {
    queryFn: () => Promise<string>;
    gcTime: number;
    id: string;
  };

  // Day Timetable
  dtt?: {
    queryFn: (date: string) => Promise<Period[]>;
    gcTime: number;
    id: string;
  };

  cycle?: {
    queryFn: () => Promise<Period[]>;
    gcTime: number;
    id: string;
  };

  notices?: {
    queryFn: () => Promise<Notice<TAudience>[]>;
    gcTime: number;
    id: string;
  };

  nextSchoolDay?: {
    queryFn: () => Promise<string | null>;
    gcTime: number;
    id: string;
  };

  newsletter?: {
    downloadUrl: string;
    name: string;
  };
}
