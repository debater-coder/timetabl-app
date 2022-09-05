import { withProps } from "../../utils/contextualise";
import handleQuery from "../../utils/handleQuery";
import QueryError from "../QueryError";

export default function QueryHandler({ query, children }) {
  const { data, error } = query;
  return handleQuery(
    data,
    error,
    (isLoaded) => <>{children(isLoaded, data)}</>,
    withProps(QueryError, { error })
  );
}
