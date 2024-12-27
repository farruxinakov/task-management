import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Executor } from "@prisma/client";

import {
  useCreateExecutor,
  useUpdateExecutor,
} from "@/features/executor/model/mutations";
import {
  executorSchema,
  type ExecutorSchema,
} from "@/features/executor/model/schema";

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

interface ExecutorFormProps {
  executor: Executor | null;
}

export function ExecutorForm({ executor }: ExecutorFormProps) {
  const router = useRouter();

  const { isPending: isCreating, mutateAsync: createExecutor } =
    useCreateExecutor();
  const { isPending: isUpdating, mutateAsync: updateExecutor } =
    useUpdateExecutor(executor?.id ?? "");

  const form = useForm<ExecutorSchema>({
    resolver: zodResolver(executorSchema),
    defaultValues: executor ?? { name: "" },
  });

  async function onSubmit(values: ExecutorSchema) {
    if (executor) {
      await updateExecutor(values);
    } else {
      await createExecutor(values);
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
            onClick={() => router.push("/executors")}
            type="button"
            variant="outline"
          >
            Отмена
          </Button>
          <Button disabled={isCreating || isUpdating} type="submit">
            {executor
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
