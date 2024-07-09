"use client";

import { siteConfig } from "@/config/site";
import UseLockBody from "@/hooks/use-lock-body";
import { cn } from "@/lib/utils";
import { MainNavItem } from "@/types";
import Link from "next/link";
import React from "react";
import { Icons } from "./icons";

interface MobileNavProps {
  items: MainNavItem[];
  children?: React.ReactNode;
}

const MobileNav = ({ items, children }: MobileNavProps) => {
  UseLockBody();

  return (
    <div
      className={cn(
        "backdrop-blur-sm overflow-auto fixed inset-0 top-16 auto-row-max grid-flow-row  md:hidden p-5 animate-in spin-in-6"
      )}
    >
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <Link href="/" className="flex items-center space-x-2">
          <Icons.logo />
          <span className="font-bold">{siteConfig.name}</span>
        </Link>
        <nav className="grid grid-flow-row auto-rows-max text-sm">
          {items.map((item, index) => (
            <Link
              key={index}
              href={item.disabled ? "#" : item.href}
              className={cn(
                "flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline",
                item.disabled &&
                  "cursor-not-allowed opacity-60 hover:no-underline"
              )}
            >
              {item.title}
            </Link>
          ))}
        </nav>
        {children}
      </div>
    </div>
  );
};

export default MobileNav;
