import { ThemeToggle } from "@/features/header/ui/theme-toggle";

import { Container } from "@/shared/custom/container";
import { SidebarTrigger } from "@/shared/ui/sidebar";

const Header = () => {
  return (
    <header className="sticky left-0 top-0 z-50 border-b border-border/30 bg-background/95 py-4 backdrop-blur supports-[backdrop-filter]:bg-background/60 dark:border-border">
      <Container>
        <div className="flex items-center justify-between">
          <SidebarTrigger />

          <ThemeToggle />
        </div>
      </Container>
    </header>
  );
};

export default Header;
