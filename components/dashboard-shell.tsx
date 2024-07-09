import React from "react";

interface DashboardShellProps {
  children?: React.ReactNode;
}

const DashboardShell = ({ children }: DashboardShellProps) => {
  return <div className="flex flex-col gap-4 h-full">{children}</div>;
};

export default DashboardShell;
