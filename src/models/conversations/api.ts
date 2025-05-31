import { api } from "@/api/axios";
import { Conversation } from "./type";

export async function getConversations(): Promise<Conversation[]> {
  const res = await api.get("/conversations");
  return res.data;
}

export async function getConversation(
  targetId: number | undefined,
): Promise<Conversation> {
  if (targetId === undefined) return Promise.resolve({} as Conversation);
  const res = await api.get(`/conversations/${targetId}`);
  return res.data;
}

export async function createConversation(
  targetId: number,
): Promise<Conversation> {
  const res = await api.post(`/conversations`, { targetId });
  return res.data;
}
