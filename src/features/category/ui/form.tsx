import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type { Category } from "@prisma/client";

import {
  useCreateCategory,
  useUpdateCategory,
} from "@/features/category/model/mutations";
import {
  categorySchema,
  type CategorySchema,
} from "@/features/category/model/schema";

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

interface CategoryFormProps {
  category: Category | null;
}

export function CategoryForm({ category }: CategoryFormProps) {
  const router = useRouter();

  const { isPending: isCreating, mutateAsync: createCategory } =
    useCreateCategory();
  const { isPending: isUpdating, mutateAsync: updateCategory } =
    useUpdateCategory(category?.id ?? "");

  const form = useForm<CategorySchema>({
    resolver: zodResolver(categorySchema),
    defaultValues: category ?? { name: "" },
  });

  async function onSubmit(values: CategorySchema) {
    if (category) {
      await updateCategory(values);
    } else {
      await createCategory(values);
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
            onClick={() => router.push("/categories")}
            type="button"
            variant="outline"
          >
            Отмена
          </Button>
          <Button disabled={isCreating || isUpdating} type="submit">
            {category
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
