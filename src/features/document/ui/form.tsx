import { useRouter } from "next/navigation";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import type {
  Category,
  Executor,
  InspiringPerson,
  Document,
} from "@prisma/client";

import {
  useCreateDocument,
  useUpdateDocument,
} from "@/features/document/model/mutations";
import {
  documentSchema,
  type DocumentSchema,
} from "@/features/document/model/schema";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shared/ui/select";

interface DocumentFormProps {
  document: Document | null;
  categories: Category[];
  inspiringPersons: InspiringPerson[];
  executors: Executor[];
}

export function DocumentForm({
  document,
  categories,
  inspiringPersons,
  executors,
}: DocumentFormProps) {
  const router = useRouter();

  const { isPending: isCreating, mutateAsync: createDocument } =
    useCreateDocument();
  const { isPending: isUpdating, mutateAsync: updateDocument } =
    useUpdateDocument(document?.id ?? "");

  const form = useForm<DocumentSchema>({
    resolver: zodResolver(documentSchema),
    defaultValues: document ?? {
      categoryId: "",
      inspiringPersonId: "",
      executorId: "",
      indicatorName: "",
      quantity: "",
    },
  });

  async function onSubmit(values: DocumentSchema) {
    console.log(values);
    if (document) {
      await updateDocument(values);
    } else {
      await createDocument(values);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <FormField
            control={form.control}
            name="categoryId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Категория</FormLabel>
                <Select
                  disabled={isCreating || isUpdating}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите категорию" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {categories.length > 0 ? (
                      categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="no-category">
                        Создайте категорию.
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="inspiringPersonId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Вдохновляющая личность</FormLabel>
                <Select
                  disabled={isCreating || isUpdating}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите вдохновляющую личность" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {inspiringPersons.length > 0 ? (
                      inspiringPersons.map((inspiringPerson) => (
                        <SelectItem
                          key={inspiringPerson.id}
                          value={inspiringPerson.id}
                        >
                          {inspiringPerson.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="no-inspiring-person">
                        Создайте вдохновляющую личность.
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="executorId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Исполнитель</FormLabel>
                <Select
                  disabled={isCreating || isUpdating}
                  defaultValue={field.value}
                  onValueChange={field.onChange}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Выберите исполнителя" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {executors.length > 0 ? (
                      executors.map((executor) => (
                        <SelectItem key={executor.id} value={executor.id}>
                          {executor.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem disabled value="no-executor">
                        Создайте исполнителя.
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="indicatorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Название индикаторов</FormLabel>
                <FormControl>
                  <Input disabled={isCreating || isUpdating} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Количество</FormLabel>
                <FormControl>
                  <Input disabled={isCreating || isUpdating} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Button
            disabled={isCreating || isUpdating}
            onClick={() => router.push("/documents")}
            type="button"
            variant="outline"
          >
            Отмена
          </Button>
          <Button disabled={isCreating || isUpdating} type="submit">
            {document
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
