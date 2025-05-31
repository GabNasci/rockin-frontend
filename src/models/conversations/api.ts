import { api } from "@/api/axios";
import { Conversation } from "./type";

export async function getConversations(): Promise<Conversation[]> {
  const res = await api.get("/conversations");
  return res.data;
}
