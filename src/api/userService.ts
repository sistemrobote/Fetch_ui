import axios, { AxiosError, AxiosResponse } from "axios";
import { LoginResponse, ApiError } from "../models/api";

const baseApiUrl = "https://frontend-take-home-service.fetch.com";

const apiClient = axios.create({
  baseURL: baseApiUrl,
  withCredentials: true, // Ensure cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});

export const apiLoginService = {
  login: async (name: string, email: string): Promise<LoginResponse> => {
    try {
      const response: AxiosResponse<LoginResponse> = await apiClient.post(
        "/auth/login",
        { name, email }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError<ApiError>;
      console.error(
        "Login failed:",
        axiosError.response?.data || axiosError.message
      );
      throw error;
    }
  },

  logout: async (): Promise<void> => {
    try {
      await apiClient.post("/auth/logout");
    } catch (error) {
      const axiosError = error as AxiosError;

      console.error(
        "Logout failed:",
        axiosError.response?.data || axiosError.message
      );
      throw error;
    }
  },

  //   get: async (endpoint, params = {}) => {
  //     try {
  //       const response = await apiClient.get(endpoint, { params });
  //       return response.data;
  //     } catch (error) {
  //       console.error(
  //         "GET request failed:",
  //         error.response?.data || error.message
  //       );
  //       throw error;
  //     }
  //   },
};
