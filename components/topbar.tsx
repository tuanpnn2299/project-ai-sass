"use client";
import { cn } from "@/lib/utils";
import Logo from "./logo";
import { Button } from "./ui/button";
import { Menu, MenuIcon } from "lucide-react";
import { useSidebarStore } from "@/stores/sidebar-store";

const Topbar = () => {
  const { handleOpenorClose } = useSidebarStore();
  return (
    <div
      className={cn(
        "flex items-center p-4 justify-between sticky top-0 z-30",
        "lg:hidden"
      )}>
      <Logo />
      <Button variant="ghost" size="icon" onClick={handleOpenorClose}>
        <Menu />
      </Button>
    </div>
  );
};

export default Topbar;
