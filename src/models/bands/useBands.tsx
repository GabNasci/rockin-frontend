import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addMemberToBand, createBand, getBandMembers } from "./api";
import { CreateBandData } from "@/schemas/CreateBandSchema";
import { useRouter } from "next/navigation";
import { toast } from "@/lib/toast";

export function useCreateBand(handle?: string) {
  const router = useRouter();

  return useMutation({
    mutationFn: async (data: CreateBandData) => createBand(data),
    onSuccess: () => {
      toast.success("Banda criada com sucesso!");
      if (handle) {
        router.push(`/profile/${handle}`);
      } else {
        router.back();
      }
    },
  });
}

export function useGetMembersByBandProfileId(
  profileId: number | undefined,
  enabled = true,
) {
  return useQuery({
    queryKey: ["members"],
    queryFn: () => getBandMembers(profileId),
    enabled,
  });
}

export function useAddMemberToBand() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (members: number[]) => addMemberToBand(members),
    onSuccess: () => {
      toast.success("Membro adicionado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["members"] });
    },
  });
}
