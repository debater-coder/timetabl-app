import { UseQueryResult } from "@tanstack/react-query";
import handleQuery from "../../utils/handleQuery";
import QueryError from "../QueryError";

export default function QueryHandler({
  queries,
  children,
}: {
  queries: Record<string, UseQueryResult>;
  children: (isLoaded: boolean, data: Record<string, unknown>) => JSX.Element;
}) {
  const errors: unknown[] = [];
  let isLoaded = true;

  Object.entries(queries).forEach(([, query]) => {
    const { data, error } = query;
    if (error) {
      errors.push(error);
    }

    if (!data) {
      isLoaded = false;
    }
  });

  const data: Record<string, unknown> = {};

  Object.entries(queries).forEach(([key, query]) => {
    data[key] = query.data;
  });

  return handleQuery(
    isLoaded,
    errors.length,
    (isLoaded) => <>{children(isLoaded, data)}</>,
    <>
      {errors.map((error, index) => (
        <QueryError key={index} error={error} />
      ))}
    </>
  );
}
