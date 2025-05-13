import { api } from "@/api/axios";
import { Profile } from "./types";

export async function createProfile(data: Profile) {
  const res = await api.post("/profiles", data);
  return res.data;
}
