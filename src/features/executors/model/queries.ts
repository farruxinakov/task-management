import { useQuery } from "@tanstack/react-query";

import { getExecutors } from "@/features/executors/api";

export const useGetExecutors = () => {
  return useQuery({
    queryKey: ["executors"],
    queryFn: getExecutors,
  });
};
