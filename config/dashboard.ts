import { MainNavItem, SidebarNavItem } from "@/types";

interface DashboardConfig {
  mainNav: MainNavItem[];
  sideNav: SidebarNavItem[];
}

export const DashboardConfig: DashboardConfig = {
  mainNav: [
    {
      title: "documentation",
      href: "/docs",
    },
    {
      title: "support",
      href: "/support",
      disabled: true,
    },
  ],
  sideNav: [
    {
      title: "Posts",
      href: "/dashboard",
      icon: "post",
    },
    {
      title: "Billing",
      href: "/dashboard/billing",
      icon: "billing",
    },
    {
      title: "Setting",
      href: "/dashboard/setting",
      icon: "settings",
    },
  ],
};
