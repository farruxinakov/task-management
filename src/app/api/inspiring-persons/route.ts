import { NextRequest, NextResponse } from "next/server";

import prisma from "@/shared/lib/db";

export async function GET(_request: NextRequest) {
  try {
    const inspiringPersons = await prisma.inspiringPerson.findMany();

    return NextResponse.json(inspiringPersons);
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

    const existingInspiringPerson = await prisma.inspiringPerson.findFirst({
      where: { name },
    });

    if (existingInspiringPerson) {
      return NextResponse.json(
        { error: "Вдохновляющий человек уже существует" },
        { status: 409 },
      );
    }

    const inspiringPerson = await prisma.inspiringPerson.create({
      data: { name },
    });

    return NextResponse.json(inspiringPerson);
  } catch (error) {
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
