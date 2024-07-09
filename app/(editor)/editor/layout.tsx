import { Icons } from "@/components/icons";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface EditorLayoutProps {
  children?: React.ReactNode;
}

const EditorLayout = ({ children }: EditorLayoutProps) => {
  return (
    <div className="container md:grid md:grid-cols-[150px_1fr] border min-h-screen py-10">
      <Link
        href="/dashboard"
        className={cn(
          buttonVariants({ variant: "outline" }),
          "flex items-center gap-2 w-fit"
        )}
      >
        <Icons.chevronLeft className="h-4 w-4" />
        Back
      </Link>
      {children}
    </div>
  );
};

export default EditorLayout;
