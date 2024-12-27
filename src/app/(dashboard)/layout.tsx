import { PropsWithChildren } from "react";

import Aside from "@/widgets/aside";
import Header from "@/widgets/header";
import Main from "@/widgets/main";
import Footer from "@/widgets/footer";

import { SidebarProvider } from "@/shared/ui/sidebar";

export default function DashboardLayout({ children }: PropsWithChildren) {
  return (
    <SidebarProvider className="grid grid-cols-1 md:grid-cols-[auto_1fr]">
      <Aside />

      <div className="flex min-h-dvh flex-col">
        <Header />
        <Main>{children}</Main>
        <Footer />
      </div>
    </SidebarProvider>
  );
}
