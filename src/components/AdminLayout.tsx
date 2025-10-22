import { ReactNode, memo, useMemo } from "react";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, BookOpen, Shield } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export const AdminLayout = memo(function AdminLayout({ children }: AdminLayoutProps) {
  const { user, switchRole, isStudent, isTutor, isAdmin } = useUser();

  const roleIcon = useMemo(() => {
    if (isStudent) return <GraduationCap className="h-4 w-4" />;
    if (isTutor) return <BookOpen className="h-4 w-4" />;
    return <Shield className="h-4 w-4" />;
  }, [isStudent, isTutor]);

  const roleBadgeVariant = useMemo(() => {
    if (isStudent) return "default";
    if (isTutor) return "secondary";
    return "destructive";
  }, [isStudent, isTutor]);

  const userInitials = useMemo(() => 
    user?.name.split(" ").map(n => n[0]).join("") || "U",
    [user?.name]
  );

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
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
