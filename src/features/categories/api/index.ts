import axios from "axios";

import type { Category } from "@prisma/client";

export const getCategories = async () => {
  return (await axios.get<Category[]>("/api/categories")).data;
};
