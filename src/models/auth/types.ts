import { Band } from "../bands/types";
import { Genre } from "../genres/types";
import { Speciality } from "../specialities/types";

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type Recomendation = {
  followingId: number;
  followerId: number;
};

export type ProfileResponse = {
  id: number;
  name: string;
  about: string | null;
  handle: string;
  email: string;
  avatar: string | null;
  profile_type_id: number;
  user_id: number;
  specialities: Speciality[];
  genres: Genre[];
  followers: Recomendation[];
  following: Recomendation[];
  bands: Band[];
  posts: { text: string }[];
};
