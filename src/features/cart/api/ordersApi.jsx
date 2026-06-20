import { httpClient } from "../../../shared/api/httpClient";

const baseUrl = "/orders";

const createIdempotencyKey = () => {
  return crypto.randomUUID();
};

export const ordersApi = {
  checkoutCart: async () => {
    const response = await httpClient.post(`${baseUrl}/checkout-cart`, {
      idempotencyKey: createIdempotencyKey(),
    });

    return response.data;
  },
};