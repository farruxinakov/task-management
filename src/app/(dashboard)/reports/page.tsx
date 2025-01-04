"use client";

import { useState } from "react";

import { format } from "date-fns";

import { LoaderIcon } from "lucide-react";

import { useGetDocuments } from "@/features/documents/model/queries";
import { reportsColumns } from "@/features/reports/ui/columns";
import { DataTable } from "@/features/reports/ui/data-table";

import { Container } from "@/shared/custom/container";

export default function ReportsPage() {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

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
                Отчеты
              </h1>
            </div>

            <DataTable
              columns={reportsColumns(selectedDate)}
              data={formattedData ?? []}
              filterableColumns={filterableColumns ?? []}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
          </div>
        )}
      </Container>
    </section>
  );
}
