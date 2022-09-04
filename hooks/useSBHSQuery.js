import { useQuery, useQueryClient } from "@tanstack/react-query";
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

    throw new Error(`HTTP Error: ${res.status}: ${errorText}`);
  }
  const json = await res.json();
  return json;
};

export default (endpoint, enabled) => {
  const { refreshing, refresh } = useAuth();
  const queryClient = useQueryClient();

  return useQuery(
    ["sbhs", endpoint],
    ({ signal }) => {
      return fetchSBHSApi(endpoint, refresh, signal, queryClient);
    },
    {
      enabled: enabled && !refreshing,
    }
  );
};
