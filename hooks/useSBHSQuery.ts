import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import HTTPError from "../errors/HTTPError";
import NetworkError from "../errors/NetworkError";
import { useAuth } from "./useAuth";

const fetchSBHSApi = async <T>(
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
      const result = {
        periods: (data?.["bells"] ?? [])
          .map((bell, index, bells) => {
            const timetable = data?.["timetable"];
            const subjects = timetable?.["subjects"];
            const period =
              timetable?.["timetable"]?.["periods"]?.[bell["bell"]];

            let subject = null;

            let name = bell["bellDisplay"];
            const teacher = period?.["fullTeacher"] ?? period?.["teacher"];

            if (period?.["title"]) {
              name = period["title"];

              if (period?.["year"]) {
                name = period["year"] + name;
                subject = subjects?.[name] ?? subject;
                name = subject?.["title"] ?? name;
              }
            }

            return [
              {
                name: "Transition",
                endTime: bell?.["startTime"],
                time: bells?.[index - 1]?.["endTime"] ?? "00:00",
              },
              {
                name,
                room: period?.["room"],
                teacher,
                time: bell?.["startTime"],
                endTime: bell?.["endTime"],
                colour:
                  subject?.["colour"] && period?.["room"]
                    ? `#${subject?.["colour"]}`
                    : "transparent",
                key: bell["bell"],
              },
            ];
          })
          .flat()
          .filter((period) => period?.time !== period?.endTime),
        date: data?.["date"],
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
  title: string;
  content: string;
  authorName: string;
};

type APINotices = {
  notices: APINotice[];
};

export type TimetablNotices = APINotice[];

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
      const result = data["notices"];
      return select ? select(result) : (result as TData);
    }
  );
