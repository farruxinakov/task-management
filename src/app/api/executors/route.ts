import { NextRequest, NextResponse } from "next/server";

import prisma from "@/shared/lib/db";

export async function GET(_request: NextRequest) {
  try {
    const executors = await prisma.executor.findMany();

    return NextResponse.json(executors);
  } catch (error) {
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { name } = await request.json();

    const existingExecutor = await prisma.executor.findFirst({
      where: { name },
    });

    if (existingExecutor) {
      return NextResponse.json(
        { error: "Исполнитель уже существует" },
        { status: 409 },
      );
    }

    const executor = await prisma.executor.create({ data: { name } });

    return NextResponse.json(executor);
  } catch (error) {
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
