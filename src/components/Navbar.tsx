/* 1️⃣  raise the bar’s min-height so the big logo isn’t cramped
   2️⃣  keep items vertically centred with `items-center`
   3️⃣  reduce side padding on phones so the logo + hamburger still fit      */

<nav
  className={cn(
    "fixed inset-x-0 top-0 z-50 border-b border-slate-100 transition-all duration-300",
    scrolled ? "shadow-sm bg-white/80 backdrop-blur-sm" : "bg-white"
  )}
>
  <div className="mx-auto flex max-w-7xl items-center justify-between px-3 sm:px-4 lg:px-8
                  /* min height = logo height + a hair of air */
                  h-[72px] sm:h-[80px] lg:h-[96px]">
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
