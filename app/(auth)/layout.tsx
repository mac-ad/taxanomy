import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import React from "react";

interface AuthLayoutProps {
  children?: React.ReactNode;
}

const AuthLayout = async ({ children }: AuthLayoutProps) => {
  const user = await getCurrentUser();
  console.log("user", user);

  if (user) redirect("/");

  return <div>{children}</div>;
};

export default AuthLayout;
