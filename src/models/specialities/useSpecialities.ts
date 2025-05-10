import { useQuery } from "@tanstack/react-query";
import { getSpecialitiesByProfileType } from "./api";

export function useSpecialitiesByProfileType(
  profileTypeId: number,
  enabled = true,
) {
  return useQuery({
    queryKey: ["specialities", "profileType", profileTypeId],
    queryFn: () => getSpecialitiesByProfileType(profileTypeId),
    enabled: !!profileTypeId && enabled,
  });
}
