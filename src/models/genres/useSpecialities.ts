import { useQuery } from "@tanstack/react-query";
import { getGenres } from "./api";

export function useGenres() {
  return useQuery({
    queryKey: ["genres"],
    queryFn: () => getGenres(),
  });
}
