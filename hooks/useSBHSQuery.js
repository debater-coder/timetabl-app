import { useQuery, useQueryClient } from "@tanstack/react-query";
import { DateTime } from "luxon";
import HTTPError from "../errors/HTTPError";
import NetworkError from "../errors/NetworkError";
import { useAuth } from "./useAuth";

const fetchSBHSApi = async (
  endpoint,
  options,
  refresh,
  signal,
  queryClient
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

export const useSBHSQuery = (endpoint, options, enabled = true, select) => {
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

const noop = (data) => data;

export const useDTT = (date, enabled, select = noop) =>
  useSBHSQuery("timetable/daytimetable.json", { date }, enabled, (data) =>
    select({
      periods: (data?.["bells"] ?? []).map((bell) => {
        const timetable = data?.["timetable"];
        const subjects = timetable?.["subjects"];
        const period = timetable?.["timetable"]?.["periods"]?.[bell["bell"]];

        let subject = null;

        let name = bell["bellDisplay"];
        let teacher = period?.["fullTeacher"] ?? period?.["teacher"];
        const active =
          DateTime.fromISO(`${data?.["date"]}T${bell?.["startTime"]}`) <
            DateTime.now() &&
          DateTime.now() <
            DateTime.fromISO(`${data?.["date"]}T${bell?.["endTime"]}`);

        if (period?.["title"]) {
          name = period["title"];

          if (period?.["year"]) {
            name = period["year"] + name;
            subject = subjects?.[name] ?? subject;
            name = subject?.["title"] ?? name;
          }
        }

        return {
          name,
          room: period?.["room"],
          teacher,
          time: bell?.["startTime"],
          colour:
            subject?.["colour"] && period?.["room"]
              ? `#${subject?.["colour"]}`
              : "transparent",
          key: bell["bell"],
          active,
        };
      }),
      date: data?.["date"],
    })
  );

export const useProfile = (enabled, select = noop) =>
  useSBHSQuery("details/userinfo.json", {}, enabled, select);

export const useStudentID = (enabled, select = noop) =>
  useProfile(enabled, (data) => select(data?.["studentId"]));
