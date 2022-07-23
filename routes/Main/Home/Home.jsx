import { Skeleton } from "@chakra-ui/react";
import { useAuth } from "../../../hooks/useAuth";
import useSBHSQuery from "../../../hooks/useSBHSQuery";

export default () => {
  const { loading } = useAuth();
  const { data, error } = useSBHSQuery("details/userinfo.json", !loading);

  if (data || !error) {
    return (
      <Skeleton isLoaded={!!data} rounded={5}>
        G&apos;day {data?.givenName}, you are now logged in!
      </Skeleton>
    );
  }

  return (
    "An error occured: " +
    error.message +
    ". Try logging in and out if the error persists."
  );
};
