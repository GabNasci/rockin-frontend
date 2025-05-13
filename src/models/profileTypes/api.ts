import { api } from "@/api/axios";
import { ProfileType } from "./types";

export async function getProfileTypes(): Promise<ProfileType[]> {
  const res = await api.get("/profiles/profile-types");
  return res.data;
}
