import { httpClient } from "../../../shared/api/httpClient";

export const authApi = {
  async register(payload) {
    const response = await httpClient.post("/identity/register", payload);
    return response.data;
  },

  async login(payload) {
    const response = await httpClient.post("/identity/login", payload);
    return response.data;
  },

  async getProfile() {
    const response = await httpClient.get("/identity/profile");
    return response.data;
  },
  async getProducts(){
    const response=await httpClient.get("/products");
    return response.data;
  }
};