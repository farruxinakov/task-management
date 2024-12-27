import { useQuery } from "@tanstack/react-query";

import { getInspiringPerson } from "@/features/inspiring-person/api";

export const useGetInspiringPerson = (id: string) => {
  return useQuery({
    queryKey: ["inspiring-person", id],
    queryFn: () => getInspiringPerson(id),
  });
};
