import { api } from "@/api/axios";
import { Post } from "./types";

export async function createPost(data: Post) {
  const formData = new FormData();
  if (data.text) formData.append("text", data.text);
  if (data.link) formData.append("link", data.link);

  if (data.tagged_profiles && data.tagged_profiles.length > 0) {
    data.tagged_profiles.forEach((id) => {
      formData.append("tagged_profiles", id.toString());
    });
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
