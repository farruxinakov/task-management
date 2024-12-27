import axios from "axios";

import type { Category } from "@prisma/client";

import type { CategorySchema } from "@/features/category/model/schema";

export const getCategory = async (id: string) => {
  return (await axios.get<Category>(`/api/categories/${id}`)).data;
};

export const createCategory = async (data: CategorySchema) => {
  return (await axios.post("/api/categories", data)).data;
};

export const updateCategory = async (id: string, data: CategorySchema) => {
  return (await axios.patch(`/api/categories/${id}`, data)).data;
};

export const deleteCategory = async (id: string) => {
  return (await axios.delete(`/api/categories/${id}`)).data;
};
