import { httpClient } from "../../../../shared/api/httpClient";

const baseUrl = "/products";

const buildCreateProductFormData = (request) => {
  const formData = new FormData();

  formData.append("CategoryId", request.categoryId);
  formData.append("Name", request.name);
  formData.append("Description", request.description);
  formData.append("Price", request.price);
  formData.append("InitialStock", request.initialStock);

  if (request.image) {
    formData.append("Image", request.image);
  }

  return formData;
};

const buildUpdateProductFormData = (request) => {
  const formData = new FormData();

  formData.append("CategoryId", request.categoryId);
  formData.append("Name", request.name);
  formData.append("Description", request.description);
  formData.append("Price", request.price);
  formData.append("Status", request.status);

  if (request.image) {
    formData.append("Image", request.image);
  }

  return formData;
};

export const adminProductApi = {
  getProducts: async () => {
    const response = await httpClient.get(baseUrl);
    return response.data;
  },

  getProductById: async (productId) => {
    const response = await httpClient.get(`${baseUrl}/${productId}`);
    return response.data;
  },

  createProduct: async (request) => {
    const formData = buildCreateProductFormData(request);

    const response = await httpClient.post(baseUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  updateProduct: async (productId, request) => {
    const formData = buildUpdateProductFormData(request);

    const response = await httpClient.put(`${baseUrl}/${productId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  deleteProduct: async (productId) => {
    await httpClient.delete(`${baseUrl}/${productId}`);
  },
};