import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Post } from "./types";
import { createPost, getLinkPreviewew, getPostsByProfileId } from "./api";
import { toast } from "@/lib/toast";

export function useCreatePost() {
  const router = useRouter();
  return useMutation({
    mutationFn: (data: Post) => createPost(data),
    onSuccess: () => {
      toast.success("Post criado com sucesso!");
      router.push("/home");
    },
  });
}

export function useGetPostsByProfileId(profileId: number | undefined) {
  return useQuery({
    queryKey: ["posts", profileId],
    queryFn: () => getPostsByProfileId(profileId),
  });
}

export function useGetLinkPreview() {
  return useMutation({
    mutationFn: (url: string) => getLinkPreviewew(url),
    meta: {
      silent: true,
    },
  });
}
