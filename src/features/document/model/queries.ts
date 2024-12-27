import { useQuery } from "@tanstack/react-query";

import { getDocument } from "@/features/document/api";

export const useGetDocument = (id: string) => {
  return useQuery({
    queryKey: ["document", id],
    queryFn: () => getDocument(id),
  });
};
