import axios from "axios";

import type { Executor } from "@prisma/client";

export const getExecutors = async () => {
  return (await axios.get<Executor[]>("/api/executors")).data;
};
