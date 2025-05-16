import { Genre } from "../genres/types";
import { Speciality } from "../specialities/types";

export type LoginData = {
  email: string;
  password: string;
};

export type LoginResponse = {
  token: string;
};

export type MeResponse = {
  id: number;
  name: string;
  handle: string;
  email: string;
  avatar: string | null;
  profile_type_id: number;
  user_id: number;
  specialities: Speciality[];
  genres: Genre[];
};
