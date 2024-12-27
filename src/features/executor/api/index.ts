import axios from "axios";

import type { Executor } from "@prisma/client";

import type { ExecutorSchema } from "@/features/executor/model/schema";

export const getExecutor = async (id: string) => {
  return (await axios.get<Executor>(`/api/executors/${id}`)).data;
};

export const createExecutor = async (data: ExecutorSchema) => {
  return (await axios.post("/api/executors", data)).data;
};

export const updateExecutor = async (id: string, data: ExecutorSchema) => {
  return (await axios.patch(`/api/executors/${id}`, data)).data;
};

export const deleteExecutor = async (id: string) => {
  return (await axios.delete(`/api/executors/${id}`)).data;
};
