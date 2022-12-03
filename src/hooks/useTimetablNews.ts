import { useQuery } from "@tanstack/react-query";
import HTTPError from "../errors/HTTPError";
import NetworkError from "../errors/NetworkError";
import { NoticeYear } from "./sbhsQuery/use/useDailyNotices";

const fetchTimetablNews = async () => {
  let res;
  try {
    res = await fetch(
      "https://cms.timetabl.app/api/announcements?populate[0]=createdBy&sort=id:desc"
    );
  } catch (error) {
    if (error instanceof TypeError) {
      throw new NetworkError(error.message);
    }
  }

  if (!res.ok) {
    throw new HTTPError(res.status);
  }

  return res.json();
};

export const useTimetablNews = () =>
  useQuery(["timetablnews"], fetchTimetablNews, {
    select: (json) => {
      const { data } = json;
      return data?.map(
        (announcement: {
          attributes: {
            title: string;
            content: string;
            createdAt: string;
            createdBy: {
              data: {
                attributes: {
                  firstname: string;
                  lastname: string;
                };
              };
            };
          };
        }) => ({
          ...announcement.attributes,
          years: [
            NoticeYear.YEAR7,
            NoticeYear.YEAR8,
            NoticeYear.YEAR9,
            NoticeYear.YEAR10,
            NoticeYear.YEAR11,
            NoticeYear.YEAR12,
            NoticeYear.STAFF,
          ],
          authorName:
            announcement.attributes.createdBy.data.attributes.firstname +
            " " +
            announcement.attributes.createdBy.data.attributes.lastname,
          date: announcement.attributes.createdAt,
        })
      );
    },
  });
