import { api } from "@/api/axios";
import { Speciality } from "./types";

export async function getSpecialitiesByProfileType(
  id: number,
): Promise<Speciality[]> {
  const res = await api.get(`/specialities/profile-types/${id}`);
  return res.data;
}
