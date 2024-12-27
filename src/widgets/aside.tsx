"use client";

import { usePathname, useRouter } from "next/navigation";

import {
  ClipboardCheckIcon,
  ClipboardIcon,
  ScrollTextIcon,
  UserPenIcon,
  UserPlusIcon,
} from "lucide-react";

import { cn } from "@/shared/lib/utils";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/shared/ui/sidebar";

const ROUTES = [
  {
    id: 1,
    icon: ScrollTextIcon,
    label: "Категории",
    path: "/categories",
  },
  {
    id: 2,
    icon: UserPlusIcon,
    label: "Вдохновляющие личности",
    path: "/inspiring-persons",
  },
  {
    id: 3,
    icon: UserPenIcon,
    label: "Исполнители",
    path: "/executors",
  },
  {
    id: 4,
    icon: ClipboardIcon,
    label: "Документы",
    path: "/documents",
  },
  {
    id: 5,
    icon: ClipboardCheckIcon,
    label: "Отчёты",
    path: "/reports",
  },
];

const Aside = () => {
  const pathname = usePathname();

  const router = useRouter();

  const { isMobile, toggleSidebar } = useSidebar();

  return (
    <Sidebar variant="floating" collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {ROUTES.map((route) => (
                <SidebarMenuItem key={route.id}>
                  <SidebarMenuButton
                    onClick={() => {
                      router.push(route.path);

                      if (isMobile) {
                        toggleSidebar();
                      }
                    }}
                    className={cn(
                      pathname === route.path &&
                        "bg-sidebar-accent text-sidebar-accent-foreground",
                    )}
                  >
                    <route.icon />
                    {route.label}
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default Aside;
