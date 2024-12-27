"use client";

import { useRouter } from "next/navigation";

import { format } from "date-fns";

import { LoaderIcon, PlusIcon } from "lucide-react";

import { useGetCategories } from "@/features/categories/model/queries";
import { categoriesColumns } from "@/features/categories/ui/columns";

import { Container } from "@/shared/custom/container";
import { Button } from "@/shared/ui/button";
import { DataTable } from "@/shared/ui/data-table";

export default function CategoriesPage() {
  const router = useRouter();

  const { isPending, data } = useGetCategories();

  const formattedData = data?.map((category) => ({
    id: category.id,
    name: category.name,
    createdAt: format(category.createdAt, "dd.MM.yyyy"),
    updatedAt: format(category.updatedAt, "dd.MM.yyyy"),
  }));

  return (
    <section className="py-12">
      <Container>
        {isPending ? (
          <div className="flex h-[calc(100dvh-250px)] items-center justify-center">
            <LoaderIcon className="animate-spin" />
          </div>
        ) : (
          <div className="space-y-10">
            <div className="flex flex-col gap-y-6">
              <h1 className="text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
                Категории ({formattedData?.length})
              </h1>

              <Button onClick={() => router.push("/categories/create")}>
                Добавить
                <PlusIcon />
              </Button>
            </div>

            <DataTable columns={categoriesColumns} data={formattedData ?? []} />
          </div>
        )}
      </Container>
    </section>
  );
}
