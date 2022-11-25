import { fetchDayTimetable } from "../fetch";
import { APIPeriod } from "../fetch/fetchDayTimetable";
import { useSBHSQuery } from "./useSBHSQuery";

export type TimetablPeriod = {
  name?: string;
  room?: string;
  teacher?: string;
  time?: string;
  endTime?: string;
  colour?: string;
  key?: string;
  casual?: string;
  roomTo?: string;
};

export type TimetablDTT = {
  periods: TimetablPeriod[];
  date: string;
};

// Thanks Andrew!
const formatCasual = (casual?: string) => {
  if (!casual) return null;
  if (casual.length === 0) return casual;
  if (casual.length === 1) return `${casual.toUpperCase()}.`;

  return `${casual[
    casual.length - 1
  ].toUpperCase()} ${casual[0].toUpperCase()}${casual
    .substring(1, casual.length - 1)
    .toLowerCase()}.`;
};

/**
 * Hook to get the daily timetable.
 * @param enabled Whether to enable the query
 * @returns Query result for daily timetable.
 */
export const useDTT = (enabled?: boolean, date?: string) =>
  useSBHSQuery(
    "timetable/daytimetable.json",
    fetchDayTimetable,
    { date },
    (data) => {
      const classVariations = data?.classVariations;
      const roomVariations = data?.roomVariations;

      const result = {
        periods: (data?.bells ?? [])
          .map((bell, index, bells) => {
            const timetable = data?.timetable;
            const subjects = timetable?.subjects;
            const period: APIPeriod =
              timetable?.timetable?.periods?.[bell?.bell];

            let subject = null;
            let casual = null;
            let roomTo = null;

            let name = bell?.bellDisplay;
            const teacher = period?.fullTeacher ?? period?.teacher;

            if (period?.title) {
              name = period?.title;

              if (period?.year) {
                name = period?.year + name;
                subject = subjects?.[name] ?? subject;
                name = subject?.title ?? name;
              }
            }

            if (classVariations?.[bell?.period]) {
              casual =
                classVariations?.[bell?.period]?.casualSurname ??
                formatCasual(classVariations?.[bell?.period]?.casual) ??
                "No one";
            }

            if (roomVariations?.[bell?.period]) {
              roomTo = roomVariations?.[bell?.period]?.roomTo ?? "-";
            }

            return [
              {
                name: "Transition",
                endTime: bell?.startTime,
                time: bells?.[index - 1]?.endTime ?? "00:00",
              },
              {
                name,
                room: period?.room,
                teacher,
                time: bell?.startTime,
                endTime: bell?.endTime,
                colour:
                  subject?.colour && period?.room
                    ? `#${subject?.colour}`
                    : "transparent",
                key: bell?.bell,
                casual,
                roomTo,
              },
            ];
          })
          .flat()
          .filter((period) => period?.time !== period?.endTime),
        date: data?.date,
      };
      return result;
    },
    enabled
  );
