"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

import { MainNavItem, SidebarNavItem } from "../types/index";
import { Icons } from "./icons";
import { buttonVariants } from "./ui/button";

interface DashboardNavProps {
  items: SidebarNavItem[];
}

const DashboardNav = ({ items }: DashboardNavProps) => {
  const path = usePathname();

  if (!items?.length) return null;

  return (
    <nav className="grid gap-2">
      {items?.map((it, idx) => {
        const Icon = Icons[it?.icon || "check"];

        return (
          it?.href && (
            <Link
              key={idx}
              href={it?.href}
              className={cn(
                buttonVariants({ variant: "ghost" }),
                "w-full justify-start gap-2",
                path === it?.href ? "bg-muted" : ""
              )}
            >
              <Icon className="h-4 w-4" />
              <span className="font-semibold">{it?.title}</span>
            </Link>
          )
        );
      })}
    </nav>
  );
};

export default DashboardNav;
