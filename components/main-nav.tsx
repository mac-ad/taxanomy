"use client";

import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";
import { MainNavItem } from "@/types";
import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import React, { useState } from "react";
import { Icons } from "./icons";
import MobileNav from "./mobile-nav";

interface MainNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
}

const MainNav = ({ items, children }: MainNavProps) => {
  const segment = useSelectedLayoutSegment();

  console.log("segnemt  ", segment);

  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="flex items-center gap-6">
      <Link href="/" className="flex items-center gap-2 hidden md:flex">
        <Icons.logo className="h-6 w-6" />
        <span className="font-bold ">{siteConfig.name}</span>
      </Link>
      {items?.length ? (
        <nav className="items-center gap-4 hidden md:flex">
          {items?.map((it, idx) => (
            <Link
              key={idx}
              className={cn(
                "flex items-center transition-colors hover:text-foreground/80 text-sm",
                it?.disabled ? "opacity-50 cursor-not-allowed" : ""
              )}
              href={it?.disabled ? "#" : it?.href}
            >
              {it?.title}
            </Link>
          ))}
        </nav>
      ) : null}
      <button
        className="flex md:hidden gap-2 items-center"
        onClick={() => setShowMenu((prev) => !prev)}
      >
        {showMenu ? <Icons.close /> : <Icons.logo />}
        <span className="font-bold">Menu</span>
        {showMenu && items && <MobileNav items={items}>{children}</MobileNav>}
      </button>
    </div>
  );
};

export default MainNav;
