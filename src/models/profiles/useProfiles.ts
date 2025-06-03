import { useMutation, useQuery } from "@tanstack/react-query";
import {
  createProfile,
  findProfileByHandle,
  getProfiles,
  searchFollowings,
  searchProfiles,
} from "./api";
import { Profile } from "./types";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { SearchProfilesData } from "@/schemas/SearchProfilesSchema";

export function useCreateProfile() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: Profile) => createProfile(data),
    onSuccess: () => {
      toast.success("Perfil criado com sucesso!");
      router.push("/login");
    },
  });
}

export function useGetProfileByHandle(handle: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ["profile", handle],
    queryFn: () => findProfileByHandle(handle),
    enabled,
  });
}

export function useGetProfiles() {
  return useQuery({
    queryKey: ["profiles"],
    queryFn: () => getProfiles(),
  });
}

export function useSearchFollowings() {
  return useMutation({
    mutationFn: (search: string) => searchFollowings(search),
  });
}

export function useSearchProfiles() {
  return useMutation({
    mutationFn: (search: SearchProfilesData) => searchProfiles(search),
  });
}
