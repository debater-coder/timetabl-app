import { useQuery } from "@tanstack/react-query";
import HTTPError from "../../errors/HTTPError";
import NetworkError from "../../errors/NetworkError";
import { authActions } from "../../stores/auth";
import { timetablNewsSchema } from "./schemas";

export const fetchTimetablNews = async () => {
  let res;
  try {
    res = await fetch(
      "https://cms.timetabl.app/api/announcements?populate[0]=createdBy&sort=id:desc"
    );
  } catch (error) {
    if (error instanceof TypeError) {
      throw new NetworkError(error.message);
    } else {
      throw error;
    }
  }
  if (!res.ok) {
    throw new HTTPError(res.status);
  }

  return res.json();
};

const queryFn = async () => {
  return timetablNewsSchema.parse(await fetchTimetablNews());
};

const getQueryKey = () => ["/cms/news"];

export const useTimetablNews = () => {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn,
  });
};

useTimetablNews.getQueryKey = getQueryKey;
useTimetablNews.queryFn = queryFn;
