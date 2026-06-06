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
  async getProducts(pageNumber=1,pageSize=8){
    const response=await httpClient.get(`/products?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    return response.data;
  },
  async forgotPassword(email) {
  const response = await httpClient.post(
    "/identity/forgot-password",
    { email }
  );

  return response.data;
}
};