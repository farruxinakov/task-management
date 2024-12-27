import { useQuery } from "@tanstack/react-query";

import { getCategories } from "@/features/categories/api";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
