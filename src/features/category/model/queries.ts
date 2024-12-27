import { useQuery } from "@tanstack/react-query";

import { getCategory } from "@/features/category/api";

export const useGetCategory = (id: string) => {
  return useQuery({
    queryKey: ["category", id],
    queryFn: () => getCategory(id),
  });
};
