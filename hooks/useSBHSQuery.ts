import { QueryClient, useQuery, useQueryClient } from "@tanstack/react-query";
import HTTPError from "../errors/HTTPError";
import NetworkError from "../errors/NetworkError";
import { useAuth } from "./useAuth";

const fetchSBHSApi = async (
  endpoint: string,
  options: any,
  refresh: () => void,
  signal: AbortSignal,
  queryClient: QueryClient
) => {
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

export const useSBHSQuery = (
  endpoint: string,
  options: any,
  enabled = true,
  select: (data: any) => any = noop
) => {
  const { refreshing, refresh, loading } = useAuth();
  const queryClient = useQueryClient();

  return useQuery(
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

const noop = (data: any) => data;

export const useDTT = (date?: string, enabled = true, select = noop) =>
  useSBHSQuery("timetable/daytimetable.json", { date }, enabled, (data: any) =>
    select({
      periods: (data?.["bells"] ?? [])
        .map((bell: any, index: number, bells: any[]) => {
          const timetable = data?.["timetable"];
          const subjects = timetable?.["subjects"];
          const period = timetable?.["timetable"]?.["periods"]?.[bell["bell"]];

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
        .filter((period: any) => period?.time !== period?.endTime),
      date: data?.["date"],
    })
  );

export const useProfile = (enabled: boolean, select = noop) =>
  useSBHSQuery("details/userinfo.json", {}, enabled, select);

export const useStudentID = (enabled: boolean, select = noop) =>
  useProfile(enabled, (data) => select(data?.["studentId"]));
