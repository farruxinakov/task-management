import { useQuery } from "@tanstack/react-query";

import { getDocuments } from "@/features/documents/api";

export const useGetDocuments = () => {
  return useQuery({
    queryKey: ["documents"],
    queryFn: getDocuments,
  });
};
