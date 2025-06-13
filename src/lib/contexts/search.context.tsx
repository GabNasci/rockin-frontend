"use client";

import { createContext, useContext, useState } from "react";
import { SearchProfilesData } from "@/schemas/SearchProfilesSchema";

type SearchContextType = {
  filters: SearchProfilesData;
  setFilters: (filters: SearchProfilesData) => void;
  updateFilters: (updates: Partial<SearchProfilesData>) => void;
  resetFilters: () => void;
};

const defaultFilters: SearchProfilesData = {
  search: "",
  profileTypes: ["Músico(a)", "Banda"],
  genres: [],
  specialities: [],
  includeBands: true,
  searchByRadius: false,
  radius: undefined,
  page: 1,
  limit: 20,
};

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: React.ReactNode }) => {
  const [filters, setFiltersState] =
    useState<SearchProfilesData>(defaultFilters);

  const setFilters = (newFilters: SearchProfilesData) => {
    setFiltersState(newFilters);
  };

  const updateFilters = (updates: Partial<SearchProfilesData>) => {
    setFiltersState((prev) => ({
      ...prev,
      ...updates,
    }));
  };

  const resetFilters = () => {
    setFiltersState(defaultFilters);
  };

  return (
    <SearchContext.Provider
      value={{ filters, setFilters, updateFilters, resetFilters }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearchContext = () => {
  const context = useContext(SearchContext);
  if (!context)
    throw new Error("useSearchContext must be used within a SearchProvider");
  return context;
};
