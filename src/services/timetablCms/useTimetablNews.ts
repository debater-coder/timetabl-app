import { createQuery } from "react-query-kit";
import HTTPError from "../../errors/HTTPError";
import NetworkError from "../../errors/NetworkError";
import { NoticeYear, TimetablNotice } from "../sbhsApi/types";

const fetchTimetablNews = async (): Promise<
  Awaited<{ data: TimetablCmsAnnouncement[] }>
> => {
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

export type TimetablCmsAnnouncement = {
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
};

export const timetablNewsQuery = createQuery<{
  data: TimetablCmsAnnouncement[];
}>({
  primaryKey: "/cms/news",
  queryFn: fetchTimetablNews,
});

export const useTimetablNews = (
  options: Parameters<typeof timetablNewsQuery>[0]
) =>
  timetablNewsQuery<TimetablNotice[]>({
    ...options,
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
