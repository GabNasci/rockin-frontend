import { api } from "@/api/axios";
import {
  ChangeProfileResponse,
  Profile,
  SearchProfilesResponse,
} from "./types";
import { ProfileResponse } from "../auth/types";
import { SearchProfilesData } from "@/schemas/SearchProfilesSchema";

export async function createProfile(data: Profile) {
  const res = await api.post("/profiles", data);
  return res.data;
}

export async function findProfileByHandle(
  handle: string,
): Promise<ProfileResponse> {
  const res = await api.get(`/profiles/handle/${handle}`);
  return res.data;
}

export async function getProfiles(): Promise<ProfileResponse[]> {
  const res = await api.get("/profiles");
  return res.data;
}

export async function getProfilesFromUser(): Promise<ProfileResponse[]> {
  const res = await api.get(`/profiles/user`);
  return res.data;
}

export async function changeProfile(
  profileId: number,
): Promise<ChangeProfileResponse> {
  const res = await api.patch(`/profiles/change-profile/${profileId}`);
  return res.data;
}

export async function searchFollowings(search: string) {
  const res = await api.get(`/profiles/followings`, {
    params: { q: search },
  });
  return res.data;
}

export async function searchProfiles(
  search: Omit<SearchProfilesData, "includeBands">,
): Promise<SearchProfilesResponse> {
  const res = await api.post(`/profiles/search`, search);
  return res.data;
}

export async function followProfile(profileId: number) {
  const res = await api.post(`/profiles/${profileId}/follow`);
  return res.data;
}

export async function unfollowProfile(profileId: number) {
  const res = await api.delete(`/profiles/${profileId}/follow`);
  return res.data;
}

export async function checkHandle(handle: string) {
  const res = await api.get(`/profiles/handle/exists/${handle}`);
  return res.data;
}

export async function checkEmail(email: string) {
  const res = await api.get(`/profiles/email/exists/${email}`);
  return res.data;
}
