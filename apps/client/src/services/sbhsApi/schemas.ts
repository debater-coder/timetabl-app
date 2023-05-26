import { DateTime } from "luxon";
import { z } from "zod";

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

export const profileSchema = z.object({
  username: z.coerce.string(),
  studentId: z.coerce.string(),
  givenName: z.coerce.string(),
  surname: z.coerce.string(),
  rollClass: z.coerce.string(),
  yearGroup: z.coerce.string(),
  role: z.coerce.string(), // may be valid for staff
  department: z.coerce.string(), // may be valid for staff
  office: z.coerce.string(), // may be valid for staff
  email: z.coerce.string().email(),
  decEmail: z.coerce.string().email(),
});

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

export const noticesSchema = z
  .object({
    date: z.coerce.number(), // UNIX timestamp
    dayInfo: z.object({
      date: z.coerce.string(), // YYYY-MM-DD
      term: z.coerce.string(), // the school term
      week: z.coerce.string().optional(), // the week of term
      weekType: z.coerce.string().optional(), // the week type
      dayNumber: z.coerce.string().optional(), // day in timetable cycle
    }),
    dateYesterday: z.coerce.number(), // previous school day. UNIX timestamp
    dateTomorrow: z.coerce.number(), // next school day. UNIX timestamp
    notices: z.array(
      z.object({
        // array of notices
        title: z.coerce.string(), // title of the daily notice
        content: z.coerce.string(), // body of the notice (HTML encoded)
        years: z.array(z.coerce.string()), // applicable year groups for the notice
        dates: z.array(z.coerce.string()), // array of dates (YYYY-MM-DD) notice will appear
        relativeWeight: z.coerce.number(), // a priority indicator for the notice
        isMeeting: z.coerce.number().transform((isMeeting) => !!isMeeting), // Boolean. Meetings have intrinsic +1 relative weight
        meetingDate: z.coerce.string().optional(), // date of meeting (YYYY-MM-DD), null if not a meeting
        meetingTimeParsed: z.coerce.string().optional(), // if parsable meeting time converted to HH:MM:SS
        meetingTime: z.coerce.string().optional(), // "time" the user set the meeting for (string)
        displayYears: z.coerce.string().optional(), // a nice way of showing message applicability
        authorName: z.coerce.string().optional(), // display name of user who created message
      })
    ),
  })
  .transform((notices) => {
    return notices.notices.map((notice) => ({
      ...notice,
      years: notice.years.map(
        (year) => yearMapping?.[year] ?? NoticeYear.UNKNOWN
      ),
    }));
  });

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

export const sbhsKey =
  (endpoint: SbhsApiEndpoint) =>
  <T extends Record<string, any>>(options?: T) =>
    [`/sbhs/${endpoint}`, options] as const;
