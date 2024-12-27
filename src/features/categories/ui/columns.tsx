import type { ColumnDef } from "@tanstack/react-table";

import { CategoryCellActions } from "@/features/categories/ui/cell-actions";

import { DataTableColumnHeader } from "@/shared/ui/data-table-column-header";

export type CategoryColumn = {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export const categoriesColumns: ColumnDef<CategoryColumn>[] = [
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
    cell: ({ row }) => <CategoryCellActions id={row.original.id} />,
  },
];
