"use client";

import { useRouter } from "next/navigation";

import { format } from "date-fns";

import { LoaderIcon, PlusIcon } from "lucide-react";

import { useGetDocuments } from "@/features/documents/model/queries";
import { documentsColumns } from "@/features/documents/ui/columns";

import { Container } from "@/shared/custom/container";
import { Button } from "@/shared/ui/button";
import { DataTable } from "@/shared/ui/data-table";

export default function DocumentsPage() {
  const router = useRouter();

  const { isPending, data } = useGetDocuments();

  const formattedData = data?.documents.map((item) => ({
    id: item.id,
    category: item.category.name,
    inspiringPerson: item.inspiringPerson.name,
    executor: item.executor.name,
    indicatorName: item.indicatorName,
    quantity: item.quantity,
    createdAt: format(item.createdAt, "dd.MM.yyyy"),
    updatedAt: format(item.updatedAt, "dd.MM.yyyy"),
  }));

  const filterableColumns = [
    {
      id: "category",
      title: "Категории",
      options: data?.categories.map((category) => ({
        label: category.name,
        value: category.name,
      })),
    },
    {
      id: "inspiringPerson",
      title: "Вдохновляющие личности",
      options: data?.inspiringPersons.map((inspiringPerson) => ({
        label: inspiringPerson.name,
        value: inspiringPerson.name,
      })),
    },
    {
      id: "executor",
      title: "Исполнители",
      options: data?.executors.map((executor) => ({
        label: executor.name,
        value: executor.name,
      })),
    },
  ];

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
                Документы ({formattedData?.length})
              </h1>

              <Button onClick={() => router.push("/documents/create")}>
                Добавить
                <PlusIcon />
              </Button>
            </div>

            <DataTable
              columns={documentsColumns}
              data={formattedData ?? []}
              filterableColumns={filterableColumns ?? []}
            />
          </div>
        )}
      </Container>
    </section>
  );
}
