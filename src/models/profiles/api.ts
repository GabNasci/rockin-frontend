import { api } from "@/api/axios";
import { Profile } from "./types";
import { ProfileResponse } from "../auth/types";

export async function createProfile(data: Profile) {
  const res = await api.post("/profiles", data);
  return res.data;
}

export async function findProfileByHandle(
  handle: string,
): Promise<ProfileResponse> {
  const res = await api.get(`/profiles/handle/${handle}`);
  return res.data;
}
