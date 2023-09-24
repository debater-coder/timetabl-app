import { useAuthActions } from "../../services/UserInterface";
import { AuthActions } from "../../stores/auth";
import { profileSchema, sbhsKey } from "./schemas";
import { useQuery } from "@tanstack/react-query";

const queryFn = async (authActions: AuthActions) =>
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
