import { api } from "@/api/axios";
import { LoginData, LoginResponse, ProfileResponse } from "./types";

export async function login(payload: LoginData): Promise<LoginResponse> {
  const res = await api.post("/auth/login", payload);
  return res.data;
}

export async function fetchMe(): Promise<ProfileResponse> {
  const res = await api.get("/profiles/me");
  return res.data;
}
