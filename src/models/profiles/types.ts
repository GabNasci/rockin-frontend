import { Genre } from "../genres/types";
import { Speciality } from "../specialities/types";

export type Profile = {
  email: string;
  name: string;
  handle: string;
  profileTypeId: number;
  password: string;
  specialities: number[];
  genres: number[];
  location: Location;
};

export type SimpleProfile = {
  id: number;
  handle: string;
  name: string;
  profile_type_id: number;
  avatar: string | null;
  specialities: Speciality[];
  band?: {
    members: Member[];
  } | null;
  genres: Genre[];
};

export type Member = Omit<SimpleProfile, "members">;

export type Location = {
  latitude: string;
  longitude: string;
  state: string;
  country: string;
  city: string;
};

export type SearchProfilesResponse = {
  profiles: SimpleProfile[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  nextPage: number | null;
  prevPage: number | null;
};

export type ChangeProfileResponse = {
  token: string;
  profile: SimpleProfile;
};

export type UpdateProfileBody = {
  genres: number[];
  specialities: number[];
  name: string;
  handle: string;
  about: string;
};
