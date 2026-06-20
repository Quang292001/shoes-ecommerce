import { httpClient } from "/src/shared/api/httpClient";

const baseUrl = "/cart";

export const cartApi = {
  getCart: async () => {
    const response = await httpClient.get(baseUrl);

    return response.data;
  },

  addItem: async (request) => {
    const response = await httpClient.post(`${baseUrl}/items`, {
      productId: request.productId,
      quantity: request.quantity,
    });

    return response.data;
  },

  updateItem: async (cartItemId, request) => {
    const response = await httpClient.put(`${baseUrl}/items/${cartItemId}`, {
      quantity: request.quantity,
    });

    return response.data;
  },

  removeItem: async (cartItemId) => {
    await httpClient.delete(`${baseUrl}/items/${cartItemId}`);
  },

  clearCart: async () => {
    await httpClient.delete(baseUrl);
  },
};