import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import HTTPError from "../errors/HTTPError";
import NetworkError from "../errors/NetworkError";
import { useAuth } from "./useAuth";

export const fetchSBHSApi = async <T>(
  endpoint: string,
  options: Record<string, unknown>,
  refresh: () => void,
  signal: AbortSignal,
  queryClient: QueryClient
): Promise<Awaited<T>> => {
  let res;

  try {
    res = await fetch("/api/api", {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ endpoint, options }),
      signal,
    });
  } catch {
    throw new NetworkError("Failed to fetch");
  }

  if (!res.ok) {
    const errorText = await res.text();

    if (errorText === "REFRESH_TOKEN") {
      refresh();
      queryClient.cancelQueries(["sbhs", endpoint]);
    }

    throw new HTTPError(res.status);
  }
  const json = await res.json();
  return json;
};

export const prefetchQuery = async (
  queryClient: QueryClient,
  refresh: () => void,
  endpoint: string,
  options: Record<string, unknown> = {}
) =>
  await queryClient.prefetchQuery(["sbhs", endpoint, {}], ({ signal }) => {
    return fetchSBHSApi(endpoint, options, refresh, signal, queryClient);
  });

export const useSBHSQuery = <TQueryFnData, TError, TData = TQueryFnData>(
  endpoint: string,
  options: Record<string, unknown>,
  enabled = true,
  select: (data: TQueryFnData) => TData
) => {
  const { refreshing, refresh, loading } = useAuth();
  const queryClient = useQueryClient();

  return useQuery<TQueryFnData, TError, TData>(
    ["sbhs", endpoint, options],
    ({ signal }) => {
      return fetchSBHSApi(endpoint, options, refresh, signal, queryClient);
    },
    {
      enabled: enabled && !refreshing && !loading,
      select,
    }
  );
};

type APIBell = {
  bell?: string;
  bellDisplay?: string;
  endTime?: string;
  period?: string;
  startTime?: string;
  time?: string;
};

type APISubject = {
  colour?: string;
  fullTeacher?: string;
  subject?: string;
  title?: string;
};

type APIPeriod = {
  fullTeacher?: string;
  teacher?: string;
  title?: string;
  year?: string;
  room?: string;
  date?: string;
};

type APIDTT = {
  bells?: APIBell[];
  timetable?: {
    subjects?: Record<string, APISubject>;
    timetable?: {
      periods?: Record<string, APIPeriod>;
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
      roomFrom?: string;
      roomTo?: string;
    }
  >;
};

export type TimetablPeriod = {
  name?: string;
  room?: string;
  teacher?: string;
  time?: string;
  endTime?: string;
  colour?: string;
  key?: string;
  casual?: string | false;
};

export type TimetablDTT = {
  periods: TimetablPeriod[];
  date: string;
};

export const useDTT = <TData = TimetablDTT>(
  date?: string,
  enabled = true,
  select?: (data: TimetablDTT) => TData
) =>
  useSBHSQuery<APIDTT, Error, TData>(
    "timetable/daytimetable.json",
    { date },
    enabled,
    (data): TData => {
      // console.log(data);
      const classVariations = data?.classVariations;

      const result = {
        periods: (data?.bells ?? [])
          .map((bell, index, bells) => {
            const timetable = data?.timetable;
            const subjects = timetable?.subjects;
            const period: APIPeriod =
              timetable?.timetable?.periods?.[bell?.bell];

            let subject = null;
            let casual = null;

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
                classVariations?.[bell?.period]?.casual ??
                "" + classVariations?.[bell?.period]?.casualSurname ??
                "";
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
              },
            ];
          })
          .flat()
          .filter((period) => period?.time !== period?.endTime),
        date: data?.date,
      };
      return select ? select(result) : (result as TData);
    }
  );

type APIProfile = {
  studentId: string;
};

export const useProfile = <TData>(
  enabled: boolean,
  select?: (data: APIProfile) => TData
) => useSBHSQuery("details/userinfo.json", {}, enabled, select);

export const useStudentID = <TData>(
  enabled: boolean,
  select?: (studentId: string) => TData
) =>
  useProfile(enabled, ({ studentId }) =>
    select ? select(studentId) : studentId
  );

type APINotice = {
  title?: string;
  content?: string;
  authorName?: string;
  years?: string[];
};

type APINotices = {
  notices: APINotice[];
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

export type TimetablNotice = {
  title?: string;
  content?: string;
  authorName?: string;
  years?: NoticeYear[];
  date?: string;
};

export type TimetablNotices = TimetablNotice[];

export const useDailyNotices = <TData = TimetablNotices>(
  date?: string,
  enabled = true,
  select?: (data: TimetablNotices) => TData
) =>
  useSBHSQuery<APINotices, Error, TData>(
    "dailynews/list.json",
    { date },
    enabled,
    (data) => {
      const result = data?.notices.map((notice) => ({
        ...notice,
        years: notice?.years.map(
          (year) => yearMapping?.[year] ?? NoticeYear.UNKNOWN
        ),
      }));
      return select ? select(result) : (result as TData);
    }
  );
