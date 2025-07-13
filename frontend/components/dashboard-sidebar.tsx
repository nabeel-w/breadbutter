"use client";

import { Home, Briefcase, LogOut, Star } from "lucide-react";
import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useClerk } from "@clerk/nextjs";

const navigationItems = [
  {
    title: "Home",
    url: "/home",
    icon: Home,
  },
  {
    title: "Your Gigs",
    url: "/gigs",
    icon: Briefcase,
  },
  {
    title: "Talents",
    url: "/talents",
    icon: Star,
  },
];

interface DashboardSidebarProps {
  currentPath?: string;
}

export function DashboardSidebar({
  currentPath = "/dashboard",
}: DashboardSidebarProps) {
  const { signOut } = useClerk();

  return (
    <Sidebar className="border-r border-gray-800">
      <div className="bg-gradient-to-br from-black via-purple-950 to-black min-h-screen">
      <SidebarHeader className="border-b border-gray-800 p-6">
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-purple-700 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold text-sm">BB</span>
          </div>
          <span className="text-xl font-bold text-white">Bread Butter</span>
        </div>
      </SidebarHeader>

      <SidebarContent className="min-h-[85vh] p-4">
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={currentPath === item.url}
                    className="text-gray-300 hover:text-white hover:bg-gray-800 data-[active=true]:bg-purple-600 data-[active=true]:text-white"
                  >
                    <Link
                      href={item.url}
                      className="flex items-center space-x-3 px-3 py-2"
                    >
                      <item.icon className="h-5 w-5" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-gray-800 p-4">
        <Button
          onClick={() => signOut()}
          variant="ghost"
          className="w-full justify-start text-red-500 hover:bg-red-600 hover:text-white"
        >
          <LogOut className="h-5 w-5 mr-3" />
          Logout
        </Button>
      </SidebarFooter>

      <SidebarRail />
      </div>
    </Sidebar>
  );
}
