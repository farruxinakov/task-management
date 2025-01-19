import type { ColumnDef, Row } from "@tanstack/react-table";

import { getDaysInMonth, isSameMonth, parse } from "date-fns";

export type ReportColumn = {
  id: string;
  category: string;
  inspiringPerson: string;
  executor: string;
  indicatorName: string;
  quantity: string | string[];
  createdAt: string | string[];
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
        if (Array.isArray(row.original.createdAt)) {
          const dates = row.original.createdAt;
          const quantities = row.original.quantity;

          for (let i = 0; i < dates.length; i++) {
            const createdDate = parse(dates[i], "dd.MM.yyyy", new Date());

            if (
              isSameMonth(createdDate, selectedDate) &&
              createdDate.getDate() === index + 1
            ) {
              return quantities[i];
            }
          }

          return "";
        }

        return "";
      },
    })),
    {
      accessorKey: "total",
      header: "Итого",
      cell: ({ row }: { row: Row<ReportColumn> }) => {
        if (Array.isArray(row.original.quantity)) {
          const quantities = row.original.quantity.filter((q) => q);

          let totalMinutes = 0;
          let totalNumbers = 0;

          quantities.forEach((qty) => {
            if (typeof qty === "string") {
              if (qty.includes(":")) {
                const [hours, minutes] = qty.split(":").map(Number);

                totalMinutes += hours * 60 + minutes;
              } else {
                totalNumbers += Number(qty) || 0;
              }
            }
          });

          if (totalMinutes > 0) {
            const hours = Math.floor(totalMinutes / 60);
            const minutes = totalMinutes % 60;

            return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
          }

          return totalNumbers.toString();
        }

        if (typeof row.original.quantity === "string") {
          if (row.original.quantity.includes(":")) {
            return row.original.quantity;
          }

          return row.original.quantity;
        }

        return "0";
      },
    },
  ];
};
