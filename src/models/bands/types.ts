import { ProfileResponse } from "../auth/types";

export type Band = {
  id: number;
  ownerId: number;
  profile: ProfileResponse;
};
