import { create } from "zustand";
import { SearchResponse } from "../models/dogs";

interface DogsStore {
  results: SearchResponse | null;
  setResults: (results: SearchResponse | null) => void;
}

export const useDogsStore = create<DogsStore>((set) => ({
  results: null,
  setResults: (results) => set({ results }),
}));
