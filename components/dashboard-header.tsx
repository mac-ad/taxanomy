import { cn } from "@/lib/utils";
import React from "react";
import { buttonVariants } from "./ui/button";

interface DashboardHeaderProps {
  children?: React.ReactNode;
  heading: string;
  description: string;
}

const DashboardHeader = ({
  heading,
  description,
  children,
}: DashboardHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className={cn("font-bold text-4xl")}>{heading}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>
      <div>{children}</div>
    </div>
  );
};

export default DashboardHeader;
