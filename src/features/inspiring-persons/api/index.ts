import axios from "axios";

import type { InspiringPerson } from "@prisma/client";

export const getInspiringPersons = async () => {
  return (await axios.get<InspiringPerson[]>("/api/inspiring-persons")).data;
};
