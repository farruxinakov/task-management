import { z } from "zod";

export const inspiringPersonSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Строка должна содержать хотя бы 1 символ." }),
});

export type InspiringPersonSchema = z.infer<typeof inspiringPersonSchema>;
