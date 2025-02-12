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

const yearMapping: Record<string, NoticeYear> = {
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

const bellSchema = z.object({
  time: z.string(),
  startTime: z.string(),
  endTime: z.string().nullish(),
  bell: z.string(),
  bellDisplay: z.string(),
  period: z.string(),
});

const subjectSchema = z.object({
  colour: z.string().nullish(),
  fullTeacher: z.string(),
  subject: z.string(),
  title: z.string(),
});

const periodSchema = z.object({
  fullTeacher: z.string().nullish(),
  teacher: z.string().nullish(),
  title: z.string().nullish(),
  year: z.string().nullish(),
  room: z.string().nullish(),
});

const formatCasual = (casual?: string | null) => {
  if (!casual) return null;
  if (casual.length === 0) return casual;
  if (casual.length === 1) return `${casual.toUpperCase()}.`;

  return `${casual[
    casual.length - 1
  ]?.toUpperCase()} ${casual[0]?.toUpperCase()}${casual
    .substring(1, casual.length - 1)
    .toLowerCase()}.`;
};

export type TimetablPeriod = {
  name: string;
  shortName: string;
  endTime: string;
  startTime: string;
  date: string;
  room?: string;
  teacher?: string;
  colour?: string;
  key: string;
  casual?: string;
  roomTo?: string;
};

type TimetablDtt = {
  periods: TimetablPeriod[];
  date: string;
};

export const dttSchema = z
  .object({
    bells: z.array(bellSchema).nullable(),
    timetable: z.union([
      z.object({
        subjects: z.union([
          z.record(subjectSchema),
          z.array(z.undefined()).max(0),
        ]),
        timetable: z.object({
          periods: z.union([
            z.record(periodSchema),
            z.array(z.undefined()).max(0),
          ]),
        }),
      }),
      z.boolean(),
    ]),
    date: z.string(),
    classVariations: z.union([
      z.record(
        z.object({
          period: z.string().nullish(),
          year: z.string().nullish(),
          title: z.string().nullish(),
          teacher: z.string().nullish(),
          type: z.enum(["nocover", "replacement", "novariation"]),
          casual: z.string().nullish(),
          casualSurname: z.string().nullish(),
        })
      ),
      z.array(z.undefined()).max(0),
    ]),
    roomVariations: z.union([
      z.record(
        z.object({
          roomTo: z.string(),
        })
      ),
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      z.array(z.undefined()).max(0),
    ]),
  })
  .transform((data): TimetablDtt => {
    const classVariations = data.classVariations;
    const roomVariations = data.roomVariations;

    return {
      periods: (data.bells ?? [])
        .flatMap((bell, index, bells) => {
          const timetable = data.timetable;

          if (typeof timetable === "boolean") {
            return [];
          }

          const subjects = timetable.subjects;
          const period = !Array.isArray(timetable.timetable.periods)
            ? timetable.timetable.periods?.[bell?.bell]
            : undefined;

          let subject;
          let casual;
          let roomTo;

          let shortName = bell.bell;
          let name = bell?.bellDisplay;
          const teacher = period?.fullTeacher ?? period?.teacher ?? undefined;

          if (period?.title) {
            name = period?.title;

            if (period?.year) {
              name = period?.year + name;
              shortName = name;
              subject =
                (!Array.isArray(subjects) ? subjects?.[name] : undefined) ??
                subject;

              name = subject?.title ?? name;
            }
          }

          if (
            !Array.isArray(classVariations) &&
            classVariations?.[bell?.period] &&
            classVariations?.[bell?.period]?.type !== "novariation"
          ) {
            casual =
              classVariations?.[bell?.period]?.casualSurname ??
              formatCasual(classVariations?.[bell?.period]?.casual) ??
              "No one";
          }

          if (
            !Array.isArray(roomVariations) &&
            roomVariations?.[bell?.period]
          ) {
            roomTo = roomVariations?.[bell?.period]?.roomTo ?? "-";
          }

          return [
            {
              name: "Transition to " + name,
              endTime: DateTime.fromISO(
                `${data?.date}T${bell?.startTime}`
              ).toISO(),
              startTime: DateTime.fromISO(
                bells?.[index - 1]?.endTime ?? "00:00"
              ).toISO(),
              date: data?.date,
              key: `${bell.bell}-transition`,
              shortName: "transition",
            },
            {
              name,
              room: period?.room ?? undefined,
              teacher,
              startTime: DateTime.fromISO(
                `${data?.date}T${bell?.startTime}`
              ).toISO(),
              endTime: DateTime.fromISO(
                `${data?.date}T${bell?.endTime}`
              ).toISO(),
              colour:
                subject?.colour && period?.room
                  ? `#${subject?.colour}`
                  : "transparent",
              key: bell.bell,
              casual,
              roomTo,
              date: data?.date,
              shortName,
            },
          ];
        })
        .filter((period) => period?.startTime !== period?.endTime),
      date: DateTime.fromISO(data?.date).toISO(),
    };
  });

export const sbhsKey =
  (endpoint: SbhsApiEndpoint) =>
  <T extends Record<string, string>>(options?: T) =>
    [`/sbhs/${endpoint}`, options] as const;

export const daySchema = z.record(
  z.object({
    date: z.string(),
    term: z.coerce.number().nullish(),
    week: z.coerce.number().nullish(),
    weekType: z.string().length(1).nullish(),
    dayNumber: z.coerce.number().nullish(),
    dayName: z.string().nullish(),
  })
);

const timetablePeriodSchema = z.object({
  // corresponds to routine
  title: z.string(), // short name for class
  teacher: z.string().nullish(), // teacher code for class
  room: z.string().nullish(), // room for class
  year: z.string().nullish(), // year for class (Note [1])
});
export type TimetablePeriod = z.output<typeof timetablePeriodSchema>;

const timetableDaySchema = z.object({
  dayname: z.string(), // name of the day
  routine: z.string(), // routine (see timetable/daytimetable()
  rollcall: z.object({
    // roll call info for this day
    title: z.string(), // name of roll class
    teacher: z.string().nullish(), // teacher code for roll class
    room: z.string().nullish(), // room for roll call
  }),
  periods: z.union([
    z.record(timetablePeriodSchema),
    z.array(timetablePeriodSchema).transform((periods) => {
      return periods.reduce(
        (acc: Record<number, typeof periods[number]>, curr, index) => {
          acc[index] = curr;
          return acc;
        },
        {}
      );
    }),
  ]),
});

export type TimetableDay = z.infer<typeof timetableDaySchema>;

const timetableSubjectSchema = z.object({
  title: z.string(),
  shortTitle: z.string(),
  subject: z.string(),
  teacher: z.string().nullish(),
  fullTeacher: z.string().nullish(),
  year: z.coerce.string().nullish(),
  colour: z.string().nullish(),
});
export type TimetableSubject = z.infer<typeof timetableSubjectSchema>;

export const timetableSchema = z
  .object({
    student: z.object({
      surname: z.string(),
      givenname: z.string(),
      sex: z.string().nullish(), // "M"/"B" for male
      DOB: z.string().nullish(), // date of birth. Unix timestamp
      roll: z.coerce.string().nullish(), // index of roll class
      lines: z.record(z.coerce.number()).nullish(),
      extraLines: z.record(z.coerce.number()).nullish(),
      BoSNumber: z.coerce.number().nullish(), // Board of Studies number. 0 if not available
      studentId: z.string().nullish(), // Student ID number
      year: z.string().nullish(), // student's [primary] year group
      years: z.string().array().nullish(), // array of years the student is in
    }),
    days: z.record(timetableDaySchema),
    subjects: z.array(timetableSubjectSchema),
    extraSubjects: z
      .record(
        z.object({
          // these subjects have no timetable classes
          title: z.string(), // title of the class
          shortTitle: z.string(), // corresponds to period.title
          teacher: z.string().nullish(), // teacher code for the class teacher
          fullTeacher: z.string().nullish(), // full name of the teacher
        })
      )
      .nullish(),

    rollcall: z.object({
      // roll class details
      title: z.string(), // title of the class
      teacher: z.string(), // teacher code for the teacher
      fullTeacher: z.string(), // full name of the teacher
      room: z.string().nullish(), // roll class room
    }),
    advisor: z.string(), // year adviser
  })
  .transform((data) => {
    return { days: Object.values(data.days), subjects: data.subjects };
  });
