import { api } from "@/api/axios";
import { Speciality } from "./types";

export async function getSpecialitiesByProfileType(
  id: number | undefined,
): Promise<Speciality[]> {
  if (!id) return [];
  const res = await api.get(`/specialities/profile-types/${id}`);
  return res.data;
}
