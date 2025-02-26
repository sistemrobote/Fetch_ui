import { AxiosError } from "axios";
import { apiClient } from "./apiClient";
import { Dog, Match } from "../models/dogs";

interface SearchParams {
  breeds?: string[];
  zipCodes?: string[];
  ageMin?: string;
  ageMax?: string;
  size?: string;
  from?: string;
}

interface SearchResponse {
  resultIds: string[];
  total: number;
  next?: string;
  prev?: string;
}

export const dogsService = {
  getBreeds: async (): Promise<string[]> => {
    try {
      const response = await apiClient.get<string[]>("/dogs/breeds");
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "GET Breeds failed:",
        axiosError.response?.data || axiosError.message
      );
      throw axiosError;
    }
  },
  searchDogs: async (params: SearchParams = {}): Promise<SearchResponse> => {
    try {
      const response = await apiClient.get<SearchResponse>("/dogs/search", {
        params,
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "GET Search Dogs failed:",
        axiosError.response?.data || axiosError.message
      );
      throw axiosError;
    }
  },
  fetchDogsByIds: async (dogIds: string[]): Promise<Dog[]> => {
    if (dogIds.length > 100) {
      throw new Error("No more than 100 dogs at a time.");
    }

    try {
      const response = await apiClient.post<Dog[]>("/dogs", dogIds);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "POST Fetch Dogs by IDs failed:",
        axiosError.response?.data || axiosError.message
      );
      throw axiosError;
    }
  },
  matchDog: async (dogIds: string[]): Promise<string> => {
    if (dogIds.length === 0) {
      throw new Error("Dog IDs array cannot be empty.");
    }

    try {
      const response = await apiClient.post<Match>("/dogs/match", dogIds);
      return response.data.match;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "POST Match Dog failed:",
        axiosError.response?.data || axiosError.message
      );
      throw axiosError;
    }
  },
  fetchLocations: async (zipCodes: string[]): Promise<Location[]> => {
    if (zipCodes.length > 100) {
      throw new Error("Cannot request more than 100 ZIP codes at a time.");
    }

    try {
      const response = await apiClient.post<Location[]>("/locations", zipCodes);
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      console.error(
        "POST Fetch Locations failed:",
        axiosError.response?.data || axiosError.message
      );
      throw axiosError;
    }
  },
};
