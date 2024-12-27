import { NextRequest, NextResponse } from "next/server";

import prisma from "@/shared/lib/db";

export async function GET(_request: NextRequest) {
  try {
    const categories = await prisma.category.findMany();

    return NextResponse.json(categories);
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

    const existingCategory = await prisma.category.findFirst({
      where: { name },
    });

    if (existingCategory) {
      return NextResponse.json(
        { error: "Категория уже существует" },
        { status: 409 },
      );
    }

    const category = await prisma.category.create({ data: { name } });

    return NextResponse.json(category);
  } catch (error) {
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
