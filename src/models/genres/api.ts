import { api } from "@/api/axios";
import { Genre } from "./types";

export async function getGenres(): Promise<Genre[]> {
  const res = await api.get("/genres");
  return res.data;
}
