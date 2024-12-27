import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import {
  createExecutor,
  deleteExecutor,
  updateExecutor,
} from "@/features/executor/api";
import type { ExecutorSchema } from "@/features/executor/model/schema";

import { queryClient } from "@/shared/lib/react-query";
import { useToast } from "@/shared/model/use-toast";

export const useCreateExecutor = () => {
  const router = useRouter();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ["create-executor"],
    mutationFn: createExecutor,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["executors"] });

      toast({
        description: "Исполнитель успешно создан.",
      });

      router.replace("/executors");
    },
    onError: () => {
      toast({
        title: "Произошла ошибка при создании исполнителя",
        description:
          "Попробуйте еще раз. Возможно, исполнитель уже существует.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateExecutor = (id: string) => {
  const router = useRouter();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ["update-executor", id],
    mutationFn: (data: ExecutorSchema) => updateExecutor(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["executors"] });

      toast({
        description: "Исполнитель успешно обновлен.",
      });

      router.replace("/executors");
    },
    onError: () => {
      toast({
        title: "Произошла ошибка при обновлении исполнителя",
        description:
          "Попробуйте еще раз. Возможно, исполнитель уже существует.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteExecutor = (id: string) => {
  const router = useRouter();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ["delete-executor", id],
    mutationFn: () => deleteExecutor(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["executors"] });

      toast({
        description: "Исполнитель успешно удален.",
      });

      router.replace("/executors");
    },
    onError: () => {
      toast({
        title: "Произошла ошибка при удалении исполнителя",
        description:
          "Попробуйте еще раз. Возможно, исполнитель используется в документах.",
        variant: "destructive",
      });
    },
  });
};
