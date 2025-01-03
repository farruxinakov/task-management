import { NextRequest, NextResponse } from "next/server";

import prisma from "@/shared/lib/db";

export async function GET(_request: NextRequest) {
  try {
    const documents = await prisma.document.findMany({
      include: {
        category: true,
        inspiringPerson: true,
        executor: true,
      },
    });

    const categories = await prisma.category.findMany();
    const inspiringPersons = await prisma.inspiringPerson.findMany();
    const executors = await prisma.executor.findMany();

    return NextResponse.json({
      documents,
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

export async function POST(request: NextRequest) {
  try {
    const {
      categoryId,
      inspiringPersonId,
      executorId,
      indicatorName,
      quantity,
    } = await request.json();

    const today = new Date();

    const existingDocument = await prisma.document.findFirst({
      where: {
        categoryId,
        inspiringPersonId,
        executorId,
        indicatorName,
        quantity,
        createdAt: {
          gte: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            0,
            0,
            0,
          ),
          lt: new Date(
            today.getFullYear(),
            today.getMonth(),
            today.getDate(),
            23,
            59,
            59,
          ),
        },
      },
    });

    if (existingDocument) {
      return NextResponse.json(
        { error: "Индикатор уже существует" },
        { status: 409 },
      );
    }

    const document = await prisma.document.create({
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
