import { NextRequest, NextResponse } from "next/server";

import prisma from "@/shared/lib/db";

type Params = Promise<{ id: string }>;

export async function GET(
  _request: NextRequest,
  segmentData: { params: Params },
) {
  try {
    const { id } = await segmentData.params;

    const document = await prisma.document.findUnique({ where: { id } });

    const categories = await prisma.category.findMany();
    const inspiringPersons = await prisma.inspiringPerson.findMany();
    const executors = await prisma.executor.findMany();

    return NextResponse.json({
      document,
      categories,
      inspiringPersons,
      executors,
    });
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

    const {
      categoryId,
      inspiringPersonId,
      executorId,
      indicatorName,
      quantity,
    } = await request.json();

    const existingDocument = await prisma.document.findFirst({
      where: {
        categoryId,
        inspiringPersonId,
        executorId,
        indicatorName,
        quantity,
      },
    });

    if (existingDocument) {
      return NextResponse.json(
        { error: "Индикатор уже существует" },
        { status: 409 },
      );
    }

    const document = await prisma.document.update({
      where: { id },
      data: {
        categoryId,
        inspiringPersonId,
        executorId,
        indicatorName,
        quantity,
      },
    });

    return NextResponse.json(document);
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

    await prisma.document.delete({ where: { id } });

    return NextResponse.json({ message: "Индикатор удален" });
  } catch (error) {
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
