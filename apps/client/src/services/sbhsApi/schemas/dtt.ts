import { DateTime } from "luxon";
import { z } from "zod";

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

export type TimetablDtt = {
  periods: TimetablPeriod[];
  date: string;
};

export const dttSchema = z
  .object({
    bells: z.array(bellSchema).nullable(),
    timetable: z.union([
      z.object({
        subjects: z.record(subjectSchema),
        timetable: z.object({
          periods: z.record(periodSchema),
        }),
      }),
      z.literal(false),
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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
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

          if (timetable === false) {
            throw Error("This situation should never happen");
          }

          const subjects = timetable.subjects;
          const period = timetable.timetable.periods?.[bell?.bell];

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
              subject = subjects?.[name] ?? subject;

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
