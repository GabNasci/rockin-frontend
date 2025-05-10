import { useQuery } from "@tanstack/react-query";
import { getProfileTypes } from "./api";

export function useProfileTypes() {
  return useQuery({
    queryKey: ["profile-types"],
    queryFn: () => getProfileTypes(),
  });
}
