import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  changeProfile,
  checkEmail,
  checkHandle,
  createProfile,
  deleteProfile,
  deleteProfileAvatar,
  editAvatar,
  findProfileByHandle,
  followProfile,
  getProfiles,
  getProfilesFromUser,
  searchFollowings,
  searchProfiles,
  unfollowProfile,
} from "./api";
import { Profile } from "./types";
import { toast } from "@/lib/toast";
import { useRouter } from "next/navigation";
import { SearchProfilesData } from "@/schemas/SearchProfilesSchema";
import { ProfileResponse } from "../auth/types";
import { useAuth } from "@/lib/contexts/auth.context";
import { TOKEN_KEY } from "@/lib/constants";
import { UpdateProfileAvatarData } from "@/schemas/UpdateProfileAvatarSchema";

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

export function useCheckEmail() {
  return useMutation({
    mutationFn: (email: string) => checkEmail(email),
    meta: {
      silent: true,
    },
  });
}

export function useGetProfilesFromUser() {
  const { user } = useAuth();
  return useQuery({
    queryKey: ["profiles", user?.user_id],
    queryFn: () => getProfilesFromUser(),
    enabled: !!user,
  });
}

export function useChangeProfile() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (profileId: number) => changeProfile(profileId),
    onSuccess: async (data) => {
      localStorage.setItem(TOKEN_KEY, data.token);
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      await queryClient.refetchQueries({ queryKey: ["me"] });
      toast.success("Troca de perfil realizada com sucesso!");
      router.push(`/profile/${data.profile.handle}`);
    },
  });
}

export function useDeleteProfile() {
  const router = useRouter();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (profileId: number) => deleteProfile(profileId),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      await queryClient.refetchQueries({ queryKey: ["me"] });
      await queryClient.setQueryData(["me"], null);
      queryClient.clear();
      localStorage.removeItem(TOKEN_KEY);
      toast.success("Perfil deletado com sucesso!");
      router.push("/login");
    },
  });
}

// export function useUpdateProfile() {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (data: UpdateProfileData) => updateProfile(data),
//     onSuccess: async () => {
//       await queryClient.invalidateQueries({ queryKey: ["me"] });
//       await queryClient.refetchQueries({ queryKey: ["me"] });
//       toast.success("Perfil atualizado com sucesso!");
//     },
//   });
// }

export function useEditAvatar() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useAuth();
  return useMutation({
    mutationFn: (data: UpdateProfileAvatarData) => editAvatar(data),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      await queryClient.refetchQueries({ queryKey: ["me"] });
      toast.success("Avatar atualizado com sucesso!");
      if (user?.avatar) {
        router.push(`/profile/${user?.handle}`);
      } else {
        router.back();
      }
    },
  });
}

export function useDeleteProfileAvatar() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useAuth();
  return useMutation({
    mutationFn: () => deleteProfileAvatar(),
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["me"] });
      await queryClient.refetchQueries({ queryKey: ["me"] });
      toast.success("Avatar deletado com sucesso!");
      if (user?.avatar) {
        router.push(`/profile/${user?.handle}`);
      } else {
        router.back();
      }
    },
  });
}
