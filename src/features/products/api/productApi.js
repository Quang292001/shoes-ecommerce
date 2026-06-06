import { httpClient } from "../../../shared/api/httpClient";

export const authApi = {
  async register(payload) {
    const response = await httpClient.post("/identity/register", payload);
    return response.data;
  },

  async getProduct(payload) {
    const response = await httpClient.post("/product/getProduct", payload);
    return response.data;
  },

  async getProfile() {
    const response = await httpClient.get("/identity/profile");
    return response.data;
  },
};