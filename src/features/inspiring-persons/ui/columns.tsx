import type { ColumnDef } from "@tanstack/react-table";

import { InspiringPersonCellActions } from "@/features/inspiring-persons/ui/cell-actions";

import { DataTableColumnHeader } from "@/shared/ui/data-table-column-header";

export type InspiringPersonColumn = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export const inspiringPersonsColumns: ColumnDef<InspiringPersonColumn>[] = [
  {
    accessorKey: "id",
    accessorFn: (_, index) => index + 1,
    header: "№",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Название" />
    ),
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата создания" />
    ),
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Дата обновления" />
    ),
  },
  {
    id: "actions",
    cell: ({ row }) => <InspiringPersonCellActions id={row.original.id} />,
  },
];
