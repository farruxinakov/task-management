import { useRouter } from "next/navigation";

import { MoreHorizontalIcon, PencilIcon, TrashIcon } from "lucide-react";

import { useDeleteCategory } from "@/features/category/model/mutations";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shared/ui/dropdown-menu";
import { Button } from "@/shared/ui/button";

interface CategoryCellActionsProps {
  id: string;
}

export function CategoryCellActions({ id }: CategoryCellActionsProps) {
  const router = useRouter();

  const { isPending, mutate: deleteCategory } = useDeleteCategory(id);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <MoreHorizontalIcon />
          <span className="sr-only">Open actions</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          disabled={isPending}
          onClick={() => router.push(`/categories/${id}`)}
        >
          <PencilIcon />
          Внести изменения
        </DropdownMenuItem>
        <DropdownMenuItem disabled={isPending} onClick={() => deleteCategory()}>
          <TrashIcon />
          Удалить
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
