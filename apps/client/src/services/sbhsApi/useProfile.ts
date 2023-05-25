import { useQuery } from "@tanstack/react-query";
import { authActions } from "../../stores/auth";
import { profileSchema, sbhsKey } from "./schemas";

const queryFn = async () => {
  return profileSchema.parse(
    await authActions.fetchAuthenticated("details/userinfo.json")
  );
};

const getQueryKey = sbhsKey("details/userinfo.json");

export const useProfile = () => {
  return useQuery({
    queryKey: getQueryKey(),
    queryFn,
  });
};

useProfile.getQueryKey = getQueryKey;
useProfile.queryFn = queryFn;
