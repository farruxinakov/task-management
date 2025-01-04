import type { ColumnDef, Row } from "@tanstack/react-table";

import { getDaysInMonth, isSameMonth, parse } from "date-fns";

export type ReportColumn = {
  id: string;
  category: string;
  inspiringPerson: string;
  executor: string;
  indicatorName: string;
  quantity: string;
  createdAt: string;
  updatedAt: string;
};

export const reportsColumns = (
  selectedDate: Date,
): ColumnDef<ReportColumn>[] => {
  const daysInMonth = getDaysInMonth(selectedDate);

  return [
    {
      accessorKey: "id",
      accessorFn: (_, index) => index + 1,
      header: "№",
    },
    {
      accessorKey: "category",
      header: "Категория",
    },
    {
      accessorKey: "inspiringPerson",
      header: "Вдохновляющая личность",
    },
    {
      accessorKey: "executor",
      header: "Исполнитель",
    },
    {
      accessorKey: "indicatorName",
      header: "Наименование показатей",
    },
    ...Array.from({ length: daysInMonth }, (_, index) => ({
      accessorKey: `day${index + 1}`,
      header: `${index + 1}`,
      cell: ({ row }: { row: Row<ReportColumn> }) => {
        const createdDate = parse(
          row.original.createdAt,
          "dd.MM.yyyy",
          new Date(),
        );

        if (!isSameMonth(createdDate, selectedDate)) {
          return "";
        }

        const dayOfMonth = createdDate.getDate();

        return dayOfMonth === index + 1 ? row.original.quantity : "";
      },
    })),
  ];
};
