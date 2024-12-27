import axios from "axios";

import type { InspiringPerson } from "@prisma/client";

import type { InspiringPersonSchema } from "@/features/inspiring-person/model/schema";

export const getInspiringPerson = async (id: string) => {
  return (await axios.get<InspiringPerson>(`/api/inspiring-persons/${id}`))
    .data;
};

export const createInspiringPerson = async (data: InspiringPersonSchema) => {
  return (await axios.post("/api/inspiring-persons", data)).data;
};

export const updateInspiringPerson = async (
  id: string,
  data: InspiringPersonSchema,
) => {
  return (await axios.patch(`/api/inspiring-persons/${id}`, data)).data;
};

export const deleteInspiringPerson = async (id: string) => {
  return (await axios.delete(`/api/inspiring-persons/${id}`)).data;
};
