import { api } from "@/api/axios";
import { CreateBandData } from "@/schemas/CreateBandSchema";

export async function createBand(data: CreateBandData) {
  const res = await api.post("/bands/add", data);
  return res.data;
}

export async function getBandMembers(profileId: number | undefined) {
  if (!profileId) return [];
  const res = await api.get(`/bands/${profileId}/members`);
  return res.data;
}

export async function addMemberToBand(members: number[]) {
  const res = await api.put(`/bands/members/add`, { members });
  return res.data;
}
