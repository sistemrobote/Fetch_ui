import axios from "axios";

const baseApiUrl = "https://frontend-take-home-service.fetch.com";

export const apiClient = axios.create({
  baseURL: baseApiUrl,
  withCredentials: true, // Ensure cookies are sent with requests
  headers: {
    "Content-Type": "application/json",
  },
});
