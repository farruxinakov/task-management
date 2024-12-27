import { z } from "zod";

export const executorSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." }),
});

export type ExecutorSchema = z.infer<typeof executorSchema>;
