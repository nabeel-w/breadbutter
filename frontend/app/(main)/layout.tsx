'use client';
import { DashboardLayout } from "@/components/dashboard-layout"
import { usePathname } from "next/navigation";

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    const currentPath = usePathname();
    return (
        <DashboardLayout currentPath={currentPath}>
            {children}
        </DashboardLayout>
    )
};

export default MainLayout;
