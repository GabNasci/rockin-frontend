import { SimpleProfile } from "../profiles/types";

export type Post = {
  text?: string | undefined;
  link?: string | undefined;
  medias?: File[] | undefined;
  tagged_profiles?: number[] | undefined;
};

export type Media = {
  id: number;
  url: string;
};

export type PostResponse = {
  id: number;
  text?: string;
  link?: string;
  medias?: Media[];
  tagged_profiles?: SimpleProfile[];
  profile: SimpleProfile;
  created_at: string;
};

export type LinkPreview = {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
} | null;
