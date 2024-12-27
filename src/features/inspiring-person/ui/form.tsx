import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { InspiringPerson } from "@prisma/client";

import {
  useCreateInspiringPerson,
  useUpdateInspiringPerson,
} from "@/features/inspiring-person/model/mutations";
import {
  inspiringPersonSchema,
  type InspiringPersonSchema,
} from "@/features/inspiring-person/model/schema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/ui/form";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";

interface InspiringPersonFormProps {
  inspiringPerson: InspiringPerson | null;
}

export function InspiringPersonForm({
  inspiringPerson,
}: InspiringPersonFormProps) {
  const router = useRouter();

  const { isPending: isCreating, mutateAsync: createInspiringPerson } =
    useCreateInspiringPerson();
  const { isPending: isUpdating, mutateAsync: updateInspiringPerson } =
    useUpdateInspiringPerson(inspiringPerson?.id ?? "");

  const form = useForm<InspiringPersonSchema>({
    resolver: zodResolver(inspiringPersonSchema),
    defaultValues: inspiringPerson ?? { name: "" },
  });

  async function onSubmit(values: InspiringPersonSchema) {
    if (inspiringPerson) {
      await updateInspiringPerson(values);
    } else {
      await createInspiringPerson(values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Название</FormLabel>
              <FormControl>
                <Input disabled={isCreating || isUpdating} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            disabled={isCreating || isUpdating}
            onClick={() => router.push("/inspiring-persons")}
            type="button"
            variant="outline"
          >
            Отмена
          </Button>
          <Button disabled={isCreating || isUpdating} type="submit">
            {inspiringPerson
              ? isUpdating
                ? "Сохраняем..."
                : "Сохранить изменения"
              : isCreating
                ? "Создаем..."
                : "Создать"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
