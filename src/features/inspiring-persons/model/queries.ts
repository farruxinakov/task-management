import { useQuery } from "@tanstack/react-query";

import { getInspiringPersons } from "@/features/inspiring-persons/api";

export const useGetInspiringPersons = () => {
  return useQuery({
    queryKey: ["inspiring-persons"],
    queryFn: getInspiringPersons,
  });
};
