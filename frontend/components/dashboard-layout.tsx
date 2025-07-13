"use client"

import type React from "react"

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"
import { DashboardSidebar } from "./dashboard-sidebar"

interface DashboardLayoutProps {
  children: React.ReactNode
  currentPath?: string
}

export function DashboardLayout({ children, currentPath }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-purple-950 to-black">
      <SidebarProvider defaultOpen={true}>
        <DashboardSidebar currentPath={currentPath} />
        <SidebarInset className="bg-gradient-to-br from-black via-purple-950 to-black">
          <main className="flex-1">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </div>
  )
}
