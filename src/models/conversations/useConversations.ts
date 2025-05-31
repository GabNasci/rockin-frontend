import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createConversation, getConversation, getConversations } from "./api";
import { Conversation } from "./type";

export function useConversations() {
  return useQuery({
    queryKey: ["conversations"],
    queryFn: () => getConversations(),
  });
}

export function useGetConversation(
  targetId: number | undefined,
  enabled: boolean,
) {
  return useQuery({
    queryKey: ["conversations", targetId],
    queryFn: () => getConversation(targetId),
    enabled,
  });
}

export function useCreateConversation() {
  return useMutation({
    mutationFn: (targetId: number) => createConversation(targetId),
  });
}

export function useEnsureConversation() {
  const queryClient = useQueryClient();
  const create = useMutation({
    mutationFn: (targetId: number) => createConversation(targetId),
  });

  return async function ensureConversation(
    targetId: number,
  ): Promise<Conversation> {
    const cached = queryClient.getQueryData<Conversation>([
      "conversations",
      targetId,
    ]);

    if (cached) return cached;

    const newConversation = await create.mutateAsync(targetId);

    queryClient.setQueryData(["conversations", targetId], newConversation);
    queryClient.invalidateQueries({ queryKey: ["conversations"] });

    return newConversation;
  };
}
