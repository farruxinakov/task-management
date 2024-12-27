import { useQuery } from "@tanstack/react-query";

import { getExecutor } from "@/features/executor/api";

export const useGetExecutor = (id: string) => {
  return useQuery({
    queryKey: ["executor", id],
    queryFn: () => getExecutor(id),
  });
};
