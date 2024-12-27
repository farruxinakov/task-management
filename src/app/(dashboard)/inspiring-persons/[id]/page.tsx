"use client";

import { use } from "react";

import { LoaderIcon } from "lucide-react";

import { useGetInspiringPerson } from "@/features/inspiring-person/model/queries";
import { InspiringPersonAlertDialog } from "@/features/inspiring-person/ui/alert-dialog";

import { Container } from "@/shared/custom/container";
import { InspiringPersonForm } from "@/features/inspiring-person/ui/form";

type Params = Promise<{ id: string }>;

export default function InspiringPersonPage({ params }: { params: Params }) {
  const { id } = use(params);

  const { isPending, data } = useGetInspiringPerson(id);

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
                {data?.name
                  ? "Редактирование вдохновляющей личности"
                  : "Создание вдохновляющей личности"}
              </h1>

              {data && <InspiringPersonAlertDialog id={data.id} />}
            </div>

            <InspiringPersonForm inspiringPerson={data ?? null} />
          </div>
        )}
      </Container>
    </section>
  );
}
