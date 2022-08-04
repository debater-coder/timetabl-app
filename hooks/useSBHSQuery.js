import { useQuery } from "@tanstack/react-query";
import { useAuth } from "./useAuth";

const fetchSBHSApi = async (endpoint, refresh) => {
  const res = await fetch("/api/api", {
    credentials: "same-origin",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ endpoint }),
  });

  if (!res.ok) {
    const errorText = await res.text();

    if (errorText === "REFRESH_TOKEN") {
      refresh();
    }

    throw new Error(`HTTP Error: ${res.status}: ${errorText}`);
  }
  const json = await res.json();
  return json;
};

export default (endpoint, enabled) => {
  const { refreshing, refresh } = useAuth();
  return useQuery(
    ["sbhs", endpoint],
    () => {
      return fetchSBHSApi(endpoint, refresh);
    },
    {
      enabled: enabled && !refreshing,
    }
  );
};
