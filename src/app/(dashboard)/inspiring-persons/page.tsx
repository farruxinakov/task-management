"use client";

import { useRouter } from "next/navigation";

import { format } from "date-fns";

import { LoaderIcon, PlusIcon } from "lucide-react";

import { useGetInspiringPersons } from "@/features/inspiring-persons/model/queries";
import { inspiringPersonsColumns } from "@/features/inspiring-persons/ui/columns";

import { Container } from "@/shared/custom/container";
import { Button } from "@/shared/ui/button";
import { DataTable } from "@/shared/ui/data-table";

export default function InspiringPersonsPage() {
  const router = useRouter();

  const { isPending, data } = useGetInspiringPersons();

  const formattedData = data?.map((inspiringPerson) => ({
    id: inspiringPerson.id,
    name: inspiringPerson.name,
    createdAt: format(inspiringPerson.createdAt, "dd.MM.yyyy"),
    updatedAt: format(inspiringPerson.updatedAt, "dd.MM.yyyy"),
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
                Вдохновляющие личности ({formattedData?.length})
              </h1>

              <Button onClick={() => router.push("/inspiring-persons/create")}>
                Добавить
                <PlusIcon />
              </Button>
            </div>

            <DataTable
              columns={inspiringPersonsColumns}
              data={formattedData ?? []}
            />
          </div>
        )}
      </Container>
    </section>
  );
}
