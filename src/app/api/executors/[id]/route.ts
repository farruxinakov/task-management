import { NextRequest, NextResponse } from "next/server";

import prisma from "@/shared/lib/db";

type Params = Promise<{ id: string }>;

export async function GET(
  _request: NextRequest,
  segmentData: { params: Params },
) {
  try {
    const { id } = await segmentData.params;

    const executor = await prisma.executor.findUnique({ where: { id } });

    return NextResponse.json(executor);
  } catch (error) {
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}

export async function PATCH(
  request: NextRequest,
  segmentData: { params: Params },
) {
  try {
    const { id } = await segmentData.params;

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

    const executor = await prisma.executor.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(executor);
  } catch (error) {
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}

export async function DELETE(
  _request: NextRequest,
  segmentData: { params: Params },
) {
  try {
    const { id } = await segmentData.params;

    const executor = await prisma.executor.findUnique({
      where: { id },
      include: {
        documents: true,
      },
    });

    if (executor?.documents.length) {
      return NextResponse.json(
        { error: "Исполнитель используется в документах" },
        { status: 409 },
      );
    }

    await prisma.executor.delete({ where: { id } });

    return NextResponse.json({ message: "Исполнитель удален" });
  } catch (error) {
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
