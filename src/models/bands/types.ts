import { ProfileResponse } from "../auth/types";

export type Band = {
  id: number;
  owner_id: number;
  profile: ProfileResponse;
};
