import { useQuery } from "react-query";

const fetchSBHSApi = async ({ queryKey: [_key, endpoint] }) => {
  const res = await fetch("/api/api", {
    credentials: "same-origin",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ endpoint }),
  });

  if (!res.ok) {
    throw new Error(`HTTP Error: ${res.status}: ${res.statusText}`);
  }

  return res.json();
};

export default (endpoint, enabled) =>
  useQuery(["sbhs", endpoint], fetchSBHSApi, {
    enabled: enabled,
  });
