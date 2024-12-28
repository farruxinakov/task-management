import axios from "axios";

import type {
  Category,
  Document,
  Executor,
  InspiringPerson,
} from "@prisma/client";

import type { DocumentSchema } from "@/features/document/model/schema";

export const getDocument = async (id: string) => {
  return (
    await axios.get<{
      document: Document;
      categories: Category[];
      inspiringPersons: InspiringPerson[];
      executors: Executor[];
    }>(`/api/documents/${id}`)
  ).data;
};

export const createDocument = async (data: DocumentSchema) => {
  return (await axios.post("/api/documents", data)).data;
};

export const updateDocument = async (id: string, data: DocumentSchema) => {
  return (await axios.patch(`/api/documents/${id}`, data)).data;
};

export const deleteDocument = async (id: string) => {
  return (await axios.delete(`/api/documents/${id}`)).data;
};
