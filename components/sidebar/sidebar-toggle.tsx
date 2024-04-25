import { cn } from "@/lib/utils";
import { useSidebarStore } from "@/stores/sidebar-store";
import Image from "next/image";
import { Button } from "../ui/button";
import { X, icons } from "lucide-react";

const SidebarToggle = () => {
  const { isMinimal, handChangeSidebar, handleOpenorClose } = useSidebarStore();
  return (
    <div>
      <div
        className={cn("cursor-pointer hidden lg:block")}
        is-navbar-minimal={isMinimal ? "true" : undefined}
        onClick={handChangeSidebar}>
        <Image
          src={`/icons/menu-${isMinimal ? "open" : "close"}.svg`}
          width={24}
          height={24}
          alt="navbar icon"
        />
      </div>
      <Button
        variant="ghost"
        className="lg:hidden"
        size="icon"
        onClick={handleOpenorClose}>
        <X />
      </Button>
    </div>
  );
};

export default SidebarToggle;
