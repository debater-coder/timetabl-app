import { useQuery, useQueryClient } from "@tanstack/react-query";
import HTTPError from "../errors/HTTPError";
import NetworkError from "../errors/NetworkError";
import { useAuth } from "./useAuth";

const fetchSBHSApi = async (endpoint, refresh, signal, queryClient) => {
  let res;
  try {
    res = await fetch("/api/api", {
      credentials: "same-origin",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ endpoint }),
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

export const useSBHSQuery = (endpoint, enabled = true, select) => {
  const { refreshing, refresh, loading } = useAuth();
  const queryClient = useQueryClient();

  return useQuery(
    ["sbhs", endpoint],
    ({ signal }) => {
      return fetchSBHSApi(endpoint, refresh, signal, queryClient);
    },
    {
      enabled: enabled && !refreshing && !loading,
      select,
    }
  );
};

const noop = (data) => data;

export const useDTT = (enabled, select = noop) =>
  useSBHSQuery("timetable/daytimetable.json", enabled, (data) =>
    data?.["bells"].map((bell) => {
      const timetable = data?.["timetable"];
      const subjects = timetable?.["subjects"];
      const period = timetable?.["timetable"]?.["periods"]?.[bell["bell"]];

      let subject = null;

      let name = bell["bellDisplay"];
      let teacher = period?.["fullTeacher"] ?? period?.["teacher"];
      const active = false;

      if (period?.["title"]) {
        name = period["title"];

        if (period?.["year"]) {
          name = period["year"] + name;
          subject = subjects?.[name] ?? subject;
          name = subject?.["title"] ?? name;
        }
      }

      return select({
        name,
        room: period?.["room"],
        teacher,
        time: bell?.["startTime"],
        colour: subject?.["colour"] ? `#${subject?.["colour"]}` : "transparent",
        key: bell["bell"],
        active,
      });
    })
  );

export const useProfile = (enabled, select = noop) =>
  useSBHSQuery("details/userinfo.json", enabled, select);

export const useStudentID = (enabled, select = noop) =>
  useSBHSQuery("details/userinfo.json", enabled, (data) =>
    select(data?.["studentId"])
  );
