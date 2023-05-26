import { z } from "zod";
import { NoticeYear } from "../sbhsApi/schemas";

export const timetablNewsSchema = z
  .object({
    data: z.array(
      z.object({
        attributes: z.object({
          title: z.string(),
          content: z.string(),
          createdAt: z.string(),
          createdBy: z.object({
            data: z.object({
              attributes: z.object({
                firstname: z.string(),
                lastname: z.string(),
              }),
            }),
          }),
        }),
      })
    ),
  })
  .transform((data) => {
    return data.data.map(
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
  });
