import { api } from "@/api/axios";
import { Post, PostResponse } from "./types";

export async function createPost(data: Post) {
  const formData = new FormData();

  if (data.text) formData.append("text", data.text);
  if (data.link) formData.append("link", data.link);

  if (data.tagged_profiles && data.tagged_profiles.length > 0) {
    formData.append("tagged_profiles", JSON.stringify(data.tagged_profiles));
  }

  if (data.medias && data.medias.length > 0) {
    data.medias.forEach((file) => {
      formData.append("medias", file);
    });
  }

  const res = await api.post("/posts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
}

export async function getPostsByProfileId(
  profileId: number | undefined,
): Promise<PostResponse[]> {
  if (!profileId) return [];
  const res = await api.get(`/posts/profile/${profileId}`);
  return res.data;
}

export async function getAllPosts(): Promise<PostResponse[]> {
  const res = await api.get("/posts");
  return res.data;
}

export async function likePost(postId: number) {
  const res = await api.post(`/posts/${postId}/like`);
  return res.data;
}

export async function unlikePost(postId: number) {
  const res = await api.delete(`/posts/${postId}/like`);
  return res.data;
}

export async function getLinkPreviewew(link: string) {
  const res = await api.post(`/posts/link-preview`, { link });
  return res.data;
}

export async function deletePost(postId: number) {
  const res = await api.delete(`/posts/${postId}`);
  return res.data;
}
