"use client";

import { useRouter } from "next/navigation";

import { format } from "date-fns";

import { LoaderIcon, PlusIcon } from "lucide-react";

import { useGetExecutors } from "@/features/executors/model/queries";
import { executorsColumns } from "@/features/executors/ui/columns";

import { Container } from "@/shared/custom/container";
import { Button } from "@/shared/ui/button";
import { DataTable } from "@/shared/ui/data-table";

export default function ExecutorsPage() {
  const router = useRouter();

  const { isPending, data } = useGetExecutors();

  const formattedData = data?.map((executor) => ({
    id: executor.id,
    name: executor.name,
    createdAt: format(executor.createdAt, "dd.MM.yyyy"),
    updatedAt: format(executor.updatedAt, "dd.MM.yyyy"),
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
                Исполнители ({formattedData?.length})
              </h1>

              <Button onClick={() => router.push("/executors/create")}>
                Добавить
                <PlusIcon />
              </Button>
            </div>

            <DataTable columns={executorsColumns} data={formattedData ?? []} />
          </div>
        )}
      </Container>
    </section>
  );
}
