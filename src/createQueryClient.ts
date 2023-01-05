import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";
import { QueryClient, QueryCache } from "@tanstack/react-query";
import NetworkError from "./errors/NetworkError";
import { UnauthorizedError } from "./errors/UnauthorisedError";
import { toast } from "./toast";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: Infinity,
      refetchInterval: 5 * 60 * 1000, // 5 minutes
      refetchIntervalInBackground: true,
      networkMode: "always",
      useErrorBoundary: (error, query) =>
        !(error instanceof UnauthorizedError) &&
        !(error instanceof NetworkError) &&
        !query.state.data,
    },
  },
  queryCache: new QueryCache({
    onError: (error) => {
      if (
        error instanceof Error &&
        !(error instanceof UnauthorizedError) &&
        !(error instanceof NetworkError)
      ) {
        toast({
          title:
            "Something went wrong, try logging in and out if the issue persists.",
          description: error.message,
          status: "error",
          isClosable: true,
        });
      }
    },
  }),
});

export const persister = createSyncStoragePersister({
  storage: window.localStorage,
});
