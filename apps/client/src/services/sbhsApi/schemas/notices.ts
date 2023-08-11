import { z } from "zod";

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
