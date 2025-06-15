import { api } from "@/api/axios";
import { CreateBandData } from "@/schemas/CreateBandSchema";

export async function createBand(data: CreateBandData) {
  const res = await api.post("/bands/add", data);
  return res.data;
}
