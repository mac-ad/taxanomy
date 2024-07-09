import { authOptions } from "@/app/utils/auth";
import DashboardNav from "@/components/dashboard-nav";
import MainNav from "@/components/main-nav";
import MobileNav from "@/components/mobile-nav";
import SiteFooter from "@/components/site-footer";
import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/user-avatar";
import UserAccountBubble from "@/components/user-account-bubble";
import { DashboardConfig } from "@/config/dashboard";
import { getCurrentUser } from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { useRouter } from "next/router";
import React from "react";

interface DashboardLayoutProps {
  children?: React.ReactNode;
}

const DashboardLayout = async ({ children }: DashboardLayoutProps) => {
  const user = await getCurrentUser();

  if (!user) return redirect(authOptions?.pages?.signIn || "/login");

  return (
    <div className="flex flex-col min-h-screen">
      <header className="sticky top-0 border-b   bg-background">
        {/* dashboard nav */}
        <div className="container flex items-center justify-between h-16">
          <MainNav items={DashboardConfig?.mainNav} />
          <UserAccountBubble user={user} />
        </div>
      </header>
      <div className="container py-10 grid gap-12  flex-1 md:grid-cols-[200px_1fr]">
        <aside className="hidden md:block">
          <DashboardNav items={DashboardConfig?.sideNav} />
        </aside>
        <main className="">{children}</main>
      </div>
      <SiteFooter />
    </div>
  );
};

export default DashboardLayout;
