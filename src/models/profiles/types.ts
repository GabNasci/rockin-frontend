export type Profile = {
  email: string;
  name: string;
  handle: string;
  profileType: number;
  password: string;
  specialities: number[];
  genres: number[];
  location: Location;
};

export type Location = {
  latitude: string;
  longitude: string;
  state: string;
  country: string;
  city: string;
};
