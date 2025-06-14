import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  checkHandle,
  createProfile,
  findProfileByHandle,
  followProfile,
  getProfiles,
  searchFollowings,
  searchProfiles,
  unfollowProfile,
} from "./api";
import { Profile } from "./types";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { SearchProfilesData } from "@/schemas/SearchProfilesSchema";
import { ProfileResponse } from "../auth/types";

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

export function useFollowProfile(handle: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileId: number) => followProfile(profileId),

    onMutate: async () => {
      const profileKey = ["profile", handle];
      const profilesKey = ["profiles"];

      await Promise.all([
        queryClient.cancelQueries({ queryKey: profileKey }),
        queryClient.cancelQueries({ queryKey: profilesKey }),
      ]);

      const previousProfile =
        queryClient.getQueryData<ProfileResponse>(profileKey);
      const previousProfiles =
        queryClient.getQueryData<ProfileResponse[]>(profilesKey);

      queryClient.setQueryData<ProfileResponse>(profileKey, (old) =>
        old
          ? {
              ...old,
              followersCount: old.followersCount + 1,
              isFollowing: true,
            }
          : old,
      );

      queryClient.setQueryData<ProfileResponse[]>(profilesKey, (old) =>
        old
          ? old.map((profile) =>
              profile.handle === handle
                ? {
                    ...profile,
                    followersCount: profile.followersCount + 1,
                    isFollowing: true,
                  }
                : profile,
            )
          : old,
      );

      return { previousProfile, previousProfiles };
    },

    onError: (_err, _profileId, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(["profile", handle], context.previousProfile);
      }
      if (context?.previousProfiles) {
        queryClient.setQueryData(["profiles"], context.previousProfiles);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", handle] });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
}

export function useUnFollowProfile(handle: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileId: number) => unfollowProfile(profileId),

    onMutate: async () => {
      const profileKey = ["profile", handle];
      const profilesKey = ["profiles"];

      await Promise.all([
        queryClient.cancelQueries({ queryKey: profileKey }),
        queryClient.cancelQueries({ queryKey: profilesKey }),
      ]);

      const previousProfile =
        queryClient.getQueryData<ProfileResponse>(profileKey);
      const previousProfiles =
        queryClient.getQueryData<ProfileResponse[]>(profilesKey);

      queryClient.setQueryData<ProfileResponse>(profileKey, (old) =>
        old
          ? {
              ...old,
              followersCount: Math.max(0, old.followersCount - 1),
              isFollowing: false,
            }
          : old,
      );

      queryClient.setQueryData<ProfileResponse[]>(profilesKey, (old) =>
        old
          ? old.map((profile) =>
              profile.handle === handle
                ? {
                    ...profile,
                    followersCount: Math.max(0, profile.followersCount - 1),
                    isFollowing: false,
                  }
                : profile,
            )
          : old,
      );

      return { previousProfile, previousProfiles };
    },

    onError: (_err, _profileId, context) => {
      if (context?.previousProfile) {
        queryClient.setQueryData(["profile", handle], context.previousProfile);
      }
      if (context?.previousProfiles) {
        queryClient.setQueryData(["profiles"], context.previousProfiles);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["profile", handle] });
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });
}

export function useCheckHandle() {
  return useMutation({
    mutationFn: (handle: string) => checkHandle(handle),
    meta: {
      silent: true,
    },
  });
}
