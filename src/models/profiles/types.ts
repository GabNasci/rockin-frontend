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
    members: Omit<SimpleProfile, "members">[];
  } | null;
  genres: Genre[];
};

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
