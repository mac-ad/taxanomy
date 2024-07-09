import MainNav from "@/components/main-nav";
import ModeToggle from "@/components/mode-toggle";
import SiteFooter from "@/components/site-footer";
import { Button, buttonVariants } from "@/components/ui/button";
import { marketingConfig } from "@/config/marketing";
import { getCurrentUser } from "@/lib/session";
import { cn } from "@/lib/utils";
import Link from "next/link";
import React from "react";

interface MarketingLayoutProps {
  children?: React.ReactNode;
}

const MarketingLayout = async ({ children }: MarketingLayoutProps) => {
  const user = await getCurrentUser();

  return (
    <div>
      <header className="container">
        <div className="flex items-center gap-5 h-20">
          <MainNav items={marketingConfig.mainNav} />
          {user ? (
            <Link
              href="/dashboard"
              className={cn(
                "ml-auto",
                buttonVariants({ variant: "secondary" })
              )}
            >
              Dashboard
            </Link>
          ) : (
            <Link
              href="/login"
              className={cn(
                "ml-auto",
                buttonVariants({ variant: "secondary" })
              )}
            >
              Login
            </Link>
          )}
          <ModeToggle />
        </div>
      </header>
      <main>{children}</main>
      <SiteFooter />
    </div>
  );
};

export default MarketingLayout;
