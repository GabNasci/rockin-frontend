import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { Post, PostResponse } from "./types";
import {
  createPost,
  getAllPosts,
  getLinkPreviewew,
  getPostsByProfileId,
  likePost,
  unlikePost,
} from "./api";
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

export function useGetAllPosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: () => getAllPosts(),
  });
}

export function useLikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => likePost(postId),

    onMutate: async (postId: number) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData<PostResponse[]>(["posts"]);

      queryClient.setQueryData(["posts"], (old: PostResponse[] | undefined) =>
        old?.map((post) =>
          post.id === postId
            ? {
                ...post,
                likesCount: post.likesCount + 1,
                likedByCurrentUser: true,
              }
            : post,
        ),
      );

      return { previousPosts };
    },

    onError: (_err, postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
  });
}

export function useUnlikePost() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (postId: number) => unlikePost(postId),

    onMutate: async (postId: number) => {
      await queryClient.cancelQueries({ queryKey: ["posts"] });

      const previousPosts = queryClient.getQueryData<PostResponse[]>(["posts"]);

      queryClient.setQueryData(["posts"], (old: PostResponse[] | undefined) =>
        old?.map((post) =>
          post.id === postId
            ? {
                ...post,
                likesCount: Math.max(0, post.likesCount - 1),
                likedByCurrentUser: false,
              }
            : post,
        ),
      );

      return { previousPosts };
    },

    onError: (_err, postId, context) => {
      if (context?.previousPosts) {
        queryClient.setQueryData(["posts"], context.previousPosts);
      }
    },

    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });
    },
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
