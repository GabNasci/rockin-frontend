import { api } from "@/api/axios";
import { LoginData, LoginResponse, MeResponse } from "./types";

export async function login(payload: LoginData): Promise<LoginResponse> {
  const res = await api.post("/auth/login", payload);
  return res.data;
}

export async function fetchMe(): Promise<MeResponse> {
  const res = await api.get("/profiles/me");
  console.log("/me", res.data);
  return res.data;
}
