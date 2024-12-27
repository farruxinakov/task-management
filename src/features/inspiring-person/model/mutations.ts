import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";

import {
  createInspiringPerson,
  deleteInspiringPerson,
  updateInspiringPerson,
} from "@/features/inspiring-person/api";
import type { InspiringPersonSchema } from "@/features/inspiring-person/model/schema";

import { queryClient } from "@/shared/lib/react-query";
import { useToast } from "@/shared/model/use-toast";

export const useCreateInspiringPerson = () => {
  const router = useRouter();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ["create-inspiring-person"],
    mutationFn: createInspiringPerson,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inspiring-persons"] });

      toast({
        description: "Вдохновляющая личность успешно создана.",
      });

      router.replace("/inspiring-persons");
    },
    onError: () => {
      toast({
        title: "Произошла ошибка при создании вдохновляющей личности",
        description:
          "Попробуйте еще раз. Возможно, вдохновляющая личность уже существует.",
        variant: "destructive",
      });
    },
  });
};

export const useUpdateInspiringPerson = (id: string) => {
  const router = useRouter();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ["update-inspiring-person", id],
    mutationFn: (data: InspiringPersonSchema) =>
      updateInspiringPerson(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inspiring-persons"] });

      toast({
        description: "Вдохновляющая личность успешно обновлена.",
      });

      router.replace("/inspiring-persons");
    },
    onError: () => {
      toast({
        title: "Произошла ошибка при обновлении вдохновляющей личности",
        description:
          "Попробуйте еще раз. Возможно, вдохновляющая личность уже существует.",
        variant: "destructive",
      });
    },
  });
};

export const useDeleteInspiringPerson = (id: string) => {
  const router = useRouter();

  const { toast } = useToast();

  return useMutation({
    mutationKey: ["delete-inspiring-person", id],
    mutationFn: () => deleteInspiringPerson(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["inspiring-persons"] });

      toast({
        description: "Вдохновляющая личность успешно удалена.",
      });

      router.replace("/inspiring-persons");
    },
    onError: () => {
      toast({
        title: "Произошла ошибка при удалении вдохновляющей личности",
        description:
          "Попробуйте еще раз. Возможно, вдохновляющая личность используется в документах.",
        variant: "destructive",
      });
    },
  });
};
