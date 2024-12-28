"use client";

import { use } from "react";

import { LoaderIcon } from "lucide-react";

import { useGetDocument } from "@/features/document/model/queries";
import { DocumentAlertDialog } from "@/features/document/ui/alert-dialog";

import { Container } from "@/shared/custom/container";
import { DocumentForm } from "@/features/document/ui/form";

type Params = Promise<{ id: string }>;

export default function DocumentPage({ params }: { params: Params }) {
  const { id } = use(params);

  const { isPending, data } = useGetDocument(id);

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
                {data?.document?.indicatorName
                  ? "Редактирование документа"
                  : "Создание документа"}
              </h1>

              {data?.document && <DocumentAlertDialog id={data.document.id} />}
            </div>

            <DocumentForm
              document={data?.document ?? null}
              categories={data?.categories ?? []}
              inspiringPersons={data?.inspiringPersons ?? []}
              executors={data?.executors ?? []}
            />
          </div>
        )}
      </Container>
    </section>
  );
}
