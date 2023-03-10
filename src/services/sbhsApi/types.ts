import { DateTime } from "luxon";

/**
 * Possible SBHS API endpoints
 */
export type SbhsApiEndpoint =
  | "calendar/days.json"
  | "calendar/terms.json"
  | "timetable/bells.json"
  | "barcodenews/list.json"
  | "dailynews/list.json" // Used in Announcements
  | "diarycalendar/events.json"
  | "details/particiaption.json"
  | "details/userinfo.json" // Used in Barcodes
  | "timetable/daytimetable.json" // Used in Home
  | "timetable/timetable.json";

export type ApiNotice = {
  title: string;
  content: string;
  authorName?: string;
  years?: string[];
};

export type ApiDailyNews = {
  notices?: ApiNotice[];
};

export type ApiBell = {
  bell?: string;
  bellDisplay?: string;
  endTime?: string;
  period?: string;
  startTime?: string;
  time?: string;
};

export type ApiSubject = {
  colour?: string;
  fullTeacher?: string;
  subject?: string;
  title?: string;
};

export type ApiPeriod = {
  fullTeacher?: string;
  teacher?: string;
  title?: string;
  year?: string;
  room?: string;
  date?: string;
};

export type ApiDtt = {
  bells?: ApiBell[];
  timetable?: {
    subjects?: Record<string, ApiSubject>;
    timetable?: {
      periods?: Record<string, ApiPeriod>;
    };
  };
  date?: string;
  classVariations?: Record<
    string,
    {
      period?: string;
      year?: string;
      title?: string;
      teacher?: string;
      type?: string;
      casual?: string;
      casualSurname?: string;
    }
  >;
  roomVariations?: Record<
    string,
    {
      roomTo?: string;
    }
  >;
};

export type ApiProfile = {
  studentId?: string;
};

export type TimetablPeriod = {
  name?: string;
  room?: string;
  teacher?: string;
  time?: DateTime;
  endTime?: DateTime;
  colour?: string;
  key?: string;
  casual?: string;
  roomTo?: string;
  date?: string;
};

export type TimetablDtt = {
  periods: TimetablPeriod[];
  date: string;
};

export enum NoticeYear {
  ALL,
  YEAR7,
  YEAR8,
  YEAR9,
  YEAR10,
  YEAR11,
  YEAR12,
  STAFF,
  UNKNOWN,
}

export const yearMapping: Record<string, NoticeYear> = {
  "7": NoticeYear.YEAR7,
  "8": NoticeYear.YEAR8,
  "9": NoticeYear.YEAR9,
  "10": NoticeYear.YEAR10,
  "11": NoticeYear.YEAR11,
  "12": NoticeYear.YEAR12,
  staff: NoticeYear.STAFF,
  Staff: NoticeYear.STAFF,
};

export type TimetablNotice = {
  title: string;
  content: string;
  authorName?: string;
  years?: NoticeYear[];
  date?: string;
};
