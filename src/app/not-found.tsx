"use client";

import { useRouter } from "next/navigation";

import { Container } from "@/shared/custom/container";
import { Button } from "@/shared/ui/button";

export default function NotFoundPage() {
  const router = useRouter();

  return (
    <div className="flex h-dvh items-center py-12">
      <Container>
        <div className="flex flex-col items-center gap-y-6">
          <h1 className="text-center text-4xl font-extrabold tracking-tight lg:text-5xl">
            Страница не найдена
          </h1>

          <Button onClick={() => router.push("/")} variant="outline">
            На главную
          </Button>
        </div>
      </Container>
    </div>
  );
}
