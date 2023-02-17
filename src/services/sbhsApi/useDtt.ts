import { DateTime } from "luxon";
import { createQuery } from "react-query-kit";
import { fetchSbhsApi } from "./fetchSbhsApi";
import { ApiDtt, TimetablDtt } from "./types";

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

export const dttQuery = createQuery<ApiDtt, { date?: string }>({
  primaryKey: "/sbhs/timetable/daytimetable.json",
  queryFn: ({ queryKey: [, variables] }) => {
    return fetchSbhsApi("timetable/daytimetable.json", variables);
  },
});

export const useDtt = (
  options?: Parameters<typeof dttQuery>[0],
  date?: string
) => {
  return dttQuery<TimetablDtt>({
    ...options,
    variables: { date },
    select: (data) => {
      const classVariations = data?.classVariations;
      const roomVariations = data?.roomVariations;

      const result = {
        periods: (data?.bells ?? [])
          .flatMap((bell, index, bells) => {
            const timetable = data?.timetable;
            const subjects = timetable?.subjects;
            const period = timetable?.timetable?.periods?.[bell?.bell];

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
                endTime: DateTime.fromISO(`${data?.date}T${bell?.startTime}`),
                time: DateTime.fromISO(bells?.[index - 1]?.endTime ?? "00:00"),
                date: data?.date,
              },
              {
                name,
                room: period?.room,
                teacher,
                time: DateTime.fromISO(`${data?.date}T${bell?.startTime}`),
                endTime: DateTime.fromISO(`${data?.date}T${bell?.endTime}`),
                colour:
                  subject?.colour && period?.room
                    ? `#${subject?.colour}`
                    : "transparent",
                key: bell?.bell,
                casual,
                roomTo,
                date: data?.date,
              },
            ];
          })
          .filter((period) => period?.time !== period?.endTime),
        date: data?.date,
      };
      return result;
    },
  });
};
