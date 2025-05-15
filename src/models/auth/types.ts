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
  email: string;
  avatar: string;
  profile_type_id: number;
  user_id: number;
};
