"use client";

import { use } from "react";

import { LoaderIcon } from "lucide-react";

import { useGetCategory } from "@/features/category/model/queries";
import { CategoryAlertDialog } from "@/features/category/ui/alert-dialog";

import { Container } from "@/shared/custom/container";
import { CategoryForm } from "@/features/category/ui/form";

type Params = Promise<{ id: string }>;

export default function CategoryPage({ params }: { params: Params }) {
  const { id } = use(params);

  const { isPending, data } = useGetCategory(id);

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
                {data?.name ? "Редактирование категории" : "Создание категории"}
              </h1>

              {data && <CategoryAlertDialog id={data.id} />}
            </div>

            <CategoryForm category={data ?? null} />
          </div>
        )}
      </Container>
    </section>
  );
}
