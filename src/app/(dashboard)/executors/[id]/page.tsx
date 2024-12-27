"use client";

import { use } from "react";

import { LoaderIcon } from "lucide-react";

import { useGetExecutor } from "@/features/executor/model/queries";
import { ExecutorAlertDialog } from "@/features/executor/ui/alert-dialog";

import { Container } from "@/shared/custom/container";
import { ExecutorForm } from "@/features/executor/ui/form";

type Params = Promise<{ id: string }>;

export default function ExecutorPage({ params }: { params: Params }) {
  const { id } = use(params);

  const { isPending, data } = useGetExecutor(id);

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
                  ? "Редактирование исполнителя"
                  : "Создание исполнителя"}
              </h1>

              {data && <ExecutorAlertDialog id={data.id} />}
            </div>

            <ExecutorForm executor={data ?? null} />
          </div>
        )}
      </Container>
    </section>
  );
}
