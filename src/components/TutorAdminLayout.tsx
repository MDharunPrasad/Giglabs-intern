import { ReactNode, memo } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { TutorAdminSidebar } from "@/components/TutorAdminSidebar";

interface TutorAdminLayoutProps {
    children: ReactNode;
}

export const TutorAdminLayout = memo(function TutorAdminLayout({ children }: TutorAdminLayoutProps) {
    return (
        <SidebarProvider>
            <div className="min-h-screen flex w-full bg-background">
                <TutorAdminSidebar />
                <div className="flex-1 flex flex-col min-w-0">
                    {/* Main content */}
                    <main className="flex-1 overflow-auto">
                        {children}
                    </main>
                </div>
            </div>
        </SidebarProvider>
    );
});
