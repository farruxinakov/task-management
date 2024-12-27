import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import {
  createDocument,
  deleteDocument,
  updateDocument,
} from "@/features/document/api";
import type { DocumentSchema } from "@/features/document/model/schema";

import { queryClient } from "@/shared/lib/react-query";
import { useToast } from "@/shared/model/use-toast";

export const useCreateDocument = () => {
  const router = useRouter();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ["create-document"],
    mutationFn: createDocument,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });

      toast({
        description: "Документ успешно создан.",
      });

      router.push("/documents");
    },
    onError: () => {
      toast({
        title: "Произошла ошибка при создании документа",
        description: "Попробуйте еще раз. Возможно, документ уже существует.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateDocument = (id: string) => {
  const router = useRouter();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ["update-document", id],
    mutationFn: (data: DocumentSchema) => updateDocument(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });

      toast({
        description: "Документ успешно обновлен.",
      });

      router.push("/documents");
    },
    onError: () => {
      toast({
        title: "Произошла ошибка при обновлении документа",
        description: "Попробуйте еще раз. Возможно, документ уже существует.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteDocument = (id: string) => {
  const router = useRouter();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ["delete-document", id],
    mutationFn: () => deleteDocument(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["documents"] });

      toast({
        description: "Документ успешно удален.",
      });

      router.push("/documents");
    },
    onError: () => {
      toast({
        title: "Произошла ошибка при удалении документа",
        description:
          "Попробуйте еще раз. Возможно, документ используется в документах.",
        variant: "destructive",
      });
    },
  });
};
