import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import { useScrolled } from "@/hooks/useScrolled";
import Logo from "./Logo";
import NavItems from "./NavItems";

const Navbar = () => {
  const isMobile = useIsMobile();
  const scrolled = useScrolled();

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b border-slate-100 transition-all duration-300",
        scrolled ? "shadow-sm bg-white/80 backdrop-blur-sm" : "bg-white"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-4 lg:px-8 h-[72px] sm:h-[80px] lg:h-[96px]">
        <Logo />

        {/* Desktop nav */}
        {!isMobile && <div className="flex items-center gap-4"><NavItems /></div>}

        {/* Mobile nav */}
        {isMobile && (
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="mt-8 flex flex-col gap-4">
                <NavItems />
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
