import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import {
  createCategory,
  deleteCategory,
  updateCategory,
} from "@/features/category/api";
import type { CategorySchema } from "@/features/category/model/schema";

import { queryClient } from "@/shared/lib/react-query";
import { useToast } from "@/shared/model/use-toast";

export const useCreateCategory = () => {
  const router = useRouter();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ["create-category"],
    mutationFn: createCategory,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      toast({
        description: "Категория успешно создана.",
      });

      router.replace("/categories");
    },
    onError: () => {
      toast({
        title: "Произошла ошибка при создании категории",
        description: "Попробуйте еще раз. Возможно, категория уже существует.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateCategory = (id: string) => {
  const router = useRouter();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ["update-category", id],
    mutationFn: (data: CategorySchema) => updateCategory(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      toast({
        description: "Категория успешно обновлена.",
      });

      router.replace("/categories");
    },
    onError: () => {
      toast({
        title: "Произошла ошибка при обновлении категории",
        description: "Попробуйте еще раз. Возможно, категория уже существует.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteCategory = (id: string) => {
  const router = useRouter();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ["delete-category", id],
    mutationFn: () => deleteCategory(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });

      toast({
        description: "Категория успешно удалена.",
      });

      router.replace("/categories");
    },
    onError: () => {
      toast({
        title: "Произошла ошибка при удалении категории",
        description:
          "Попробуйте еще раз. Возможно, категория используется в документах.",
        variant: "destructive",
      });
    },
  });
};
