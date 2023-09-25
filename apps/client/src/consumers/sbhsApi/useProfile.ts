import OAuth2Actions from "../../services/OAuth2Actions";
import { useAuthActions } from "../../services/UserInterface";
import { profileSchema, sbhsKey } from "./schemas";
import { useQuery } from "@tanstack/react-query";

const queryFn = async (authActions: OAuth2Actions) =>
  profileSchema.parse(
    await authActions.fetchAuthenticated("details/userinfo.json")
  );

const getQueryKey = sbhsKey("details/userinfo.json");

export const useProfile = () => {
  const authActions = useAuthActions();

  return useQuery({
    queryKey: getQueryKey(),
    queryFn: () => queryFn(authActions),
  });
};

useProfile.getQueryKey = getQueryKey;
useProfile.queryFn = queryFn;
