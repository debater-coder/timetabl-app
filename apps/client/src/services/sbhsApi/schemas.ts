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

export const noticesSchema = z
  .object({
    date: z.coerce.number(), // UNIX timestamp
    dayInfo: z.object({
      date: z.coerce.string(), // YYYY-MM-DD
      term: z.coerce.string(), // the school term
      week: z.coerce.string().nullish(), // the week of term
      weekType: z.coerce.string().nullish(), // the week type
      dayNumber: z.coerce.string().nullish(), // day in timetable cycle
    }),
    dateYesterday: z.coerce.number(), // previous school day. UNIX timestamp
    dateTomorrow: z.coerce.number(), // next school day. UNIX timestamp
    notices: z.array(
      z.object({
        // array of notices
        title: z.coerce.string(), // title of the daily notice
        content: z.coerce.string(), // body of the notice (HTML encoded)
        years: z.array(z.coerce.string()), // applicable year groups for the notice
        dates: z.array(z.coerce.string()).nullish(), // array of dates (YYYY-MM-DD) notice will appear
        relativeWeight: z.coerce.number().nullish(), // a priority indicator for the notice
        isMeeting: z.coerce
          .number()
          .transform((isMeeting) => !!isMeeting)
          .nullish(), // Boolean. Meetings have intrinsic +1 relative weight
        meetingDate: z.coerce.string().nullish(), // date of meeting (YYYY-MM-DD), null if not a meeting
        meetingTimeParsed: z.coerce.string().nullish(), // if parsable meeting time converted to HH:MM:SS
        meetingTime: z.coerce.string().nullish(), // "time" the user set the meeting for (string)
        displayYears: z.coerce.string().nullish(), // a nice way of showing message applicability
        authorName: z.coerce.string(), // display name of user who created message
        date: z.coerce.string().optional(), // date notice was created (YYYY-MM-DD) (specific to Timetabl News Only)
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

export type TimetablNotice = z.output<typeof noticesSchema>[0];

export const bellSchema = z.object({
  time: z.string(),
  startTime: z.string(),
  endTime: z.string().nullish(),
  bell: z.string(),
  bellDisplay: z.string(),
  period: z.string(),
});

export const subjectSchema = z.object({
  colour: z.string(),
  fullTeacher: z.string(),
  subject: z.string(),
  title: z.string(),
});

export const periodSchema = z.object({
  fullTeacher: z.string().nullish(),
  teacher: z.string().nullish(),
  title: z.string(),
  year: z.string().nullish(),
  room: z.string().nullish(),
});

export const dttSchema = z.object({
  bells: z.array(bellSchema),
  timetable: z.object({
    subjects: z.record(subjectSchema),
    timetable: z.object({
      periods: z.record(periodSchema),
    }),
  }),
  date: z.string(),
  classVariations: z.object({
    period: z.string().nullish(),
    year: z.string().nullish(),
    title: z.string().nullish(),
    teacher: z.string().nullish(),
    type: z.string(),
    casual: z.string().nullish(),
    casualSurname: z.string().nullish(),
  }),
  roomVariations: z.array(
    z.object({
      roomTo: z.string(),
    })
  ),
});

export const sbhsKey =
  (endpoint: SbhsApiEndpoint) =>
  <T extends Record<string, any>>(options?: T) =>
    [`/sbhs/${endpoint}`, options] as const;
