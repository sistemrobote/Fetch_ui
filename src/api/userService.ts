import { AxiosError, AxiosResponse } from "axios";
import { apiClient } from "./apiClient";

export const apiLoginService = {
  login: async (email: string, name: string): Promise<string> => {
    try {
      const response: AxiosResponse<string> = await apiClient.post(
        "/auth/login",
        { email, name }
      );
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
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
};
