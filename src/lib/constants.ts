export const routesWithBackButton = ["/profile", "/post", "/messages"];

export const NAME_REGEX = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;

export const HANDLE_REGEX = /^[a-zA-Z0-9._]+$/;

export const TOKEN_KEY = "äuth_token";

export const MAX_PROFILES = 1;

export enum ProfileTypeID {
  MUSICIAN = 1,
  ESTABLISHMENT = 2,
  BAND = 3,
}

export const pageTitles = [
  {
    path: "/post",
    title: "Publicação",
  },
  {
    path: "/messages",
    title: "Conversas",
  },
];

export const navRoutes = ["/home", "/feed", "/search", "/profile"];

export const mustHideNavbarRoutes = ["/post", "/signup", "/messages"];

export const routesWithoutMessageButton = ["/messages", "/post/add"];
