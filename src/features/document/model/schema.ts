import { z } from "zod";

export const documentSchema = z.object({
  categoryId: z.string().trim().min(1, { message: "Выберите категорию." }),
  inspiringPersonId: z
    .string()
    .trim()
    .min(1, { message: "Выберите вдохновляющую личность." }),
  executorId: z.string().trim().min(1, { message: "Выберите исполнителя." }),
  indicatorName: z
    .string()
    .trim()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." }),
  quantity: z
    .string()
    .trim()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." }),
});

export type DocumentSchema = z.infer<typeof documentSchema>;
