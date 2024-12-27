import { NextRequest, NextResponse } from "next/server";

import prisma from "@/shared/lib/db";

type Params = Promise<{ id: string }>;

export async function GET(
  _request: NextRequest,
  segmentData: { params: Params },
) {
  try {
    const { id } = await segmentData.params;

    const inspiringPerson = await prisma.inspiringPerson.findUnique({
      where: { id },
    });

    return NextResponse.json(inspiringPerson);
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

    const existingInspiringPerson = await prisma.inspiringPerson.findFirst({
      where: { name },
    });

    if (existingInspiringPerson) {
      return NextResponse.json(
        { error: "Вдохновляющий человек уже существует" },
        { status: 409 },
      );
    }

    const inspiringPerson = await prisma.inspiringPerson.update({
      where: { id },
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

export async function DELETE(
  _request: NextRequest,
  segmentData: { params: Params },
) {
  try {
    const { id } = await segmentData.params;

    const inspiringPerson = await prisma.inspiringPerson.findUnique({
      where: { id },
      include: {
        documents: true,
      },
    });

    if (inspiringPerson?.documents.length) {
      return NextResponse.json(
        { error: "Вдохновляющий человек используется в документах" },
        { status: 409 },
      );
    }

    await prisma.inspiringPerson.delete({ where: { id } });

    return NextResponse.json({ message: "Вдохновляющий человек удален" });
  } catch (error) {
    return NextResponse.json(
      { error: "Внутренняя ошибка сервера" },
      { status: 500 },
    );
  }
}
