import { httpClient } from "../../../../shared/api/httpClient";

const baseUrl = "/categories";

const buildCreateCategoryFormData = (request) => {
  const formData = new FormData();

  formData.append("Name", request.name);
  formData.append("Description", request.description);

  if (request.image) {
    formData.append("Image", request.image);
  }

  return formData;
};

const buildUpdateCategoryFormData = (request) => {
  const formData = new FormData();

  formData.append("Name", request.name);
  formData.append("Description", request.description);
  formData.append("IsActive", request.isActive);

  if (request.image) {
    formData.append("Image", request.image);
  }

  return formData;
};

export const adminCategoryApi = {
  getCategories: async (includeInactive = true) => {
    const response = await httpClient.get(baseUrl, {
      params: {
        includeInactive,
      },
    });

    return response.data;
  },

  getCategoryById: async (categoryId) => {
    const response = await httpClient.get(`${baseUrl}/${categoryId}`);
    return response.data;
  },

  createCategory: async (request) => {
    const formData = buildCreateCategoryFormData(request);

    const response = await httpClient.post(baseUrl, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  updateCategory: async (categoryId, request) => {
    const formData = buildUpdateCategoryFormData(request);

    const response = await httpClient.put(`${baseUrl}/${categoryId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  deleteCategory: async (categoryId) => {
    await httpClient.delete(`${baseUrl}/${categoryId}`);
  },
};