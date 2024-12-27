import { NextRequest, NextResponse } from "next/server";

import prisma from "@/shared/lib/db";

type Params = Promise<{ id: string }>;

export async function GET(
  _request: NextRequest,
  segmentData: { params: Params },
) {
  try {
    const { id } = await segmentData.params;

    const category = await prisma.category.findUnique({ where: { id } });

    return NextResponse.json(category);
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

    const existingCategory = await prisma.category.findFirst({
      where: { name },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Категория уже существует" },
        { status: 409 },
      );
    }

    const category = await prisma.category.update({
      where: { id },
      data: { name },
    });

    return NextResponse.json(category);
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

    const category = await prisma.category.findUnique({
      where: { id },
      include: {
        documents: true,
      },
    });

    if (category?.documents.length) {
      return NextResponse.json(
        { error: "Категория используется в документах" },
        { status: 409 },
      );
    }

    await prisma.category.delete({ where: { id } });

    return NextResponse.json({ message: "Категория удалена" });
  } catch (error) {
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
