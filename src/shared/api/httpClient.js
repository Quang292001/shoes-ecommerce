import axios from "axios";
import { environment } from "../config/environment";
import { tokenStorage } from "../auth/tokenStorage";

const httpClient = axios.create({
  baseURL: environment.apiBaseUrl,
});

httpClient.interceptors.request.use((config) => {
  const accessToken = tokenStorage.getAccessToken();

  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  if (!(config.data instanceof FormData)) {
    config.headers["Content-Type"] = "application/json";
  }

  return config;
});

export { httpClient };