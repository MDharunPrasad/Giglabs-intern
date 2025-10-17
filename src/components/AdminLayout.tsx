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
          {/* Header with user info and role switcher */}
          <header className="bg-white/80 backdrop-blur-sm border-b border-border sticky top-0 z-50 shadow-sm">
            <div className="px-4 md:px-6 py-3.5 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2 md:gap-3 min-w-0">
                <Badge variant={roleBadgeVariant} className="flex items-center gap-1.5 px-2.5 md:px-3 py-1 flex-shrink-0">
                  {roleIcon}
                  <span className="capitalize font-semibold text-xs md:text-sm">{user?.role}</span>
                </Badge>
                <span className="text-xs md:text-sm text-muted-foreground hidden sm:inline truncate">
                  Viewing as {user?.role}
                </span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2 h-auto py-2 px-2 md:px-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold shadow-md text-sm flex-shrink-0">
                      {userInitials}
                    </div>
                    <div className="text-left hidden lg:block min-w-0">
                      <div className="text-sm font-medium truncate max-w-[150px]">{user?.name}</div>
                      <div className="text-xs text-muted-foreground truncate max-w-[150px]">{user?.email}</div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Switch Role (Demo)</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => switchRole("admin")} className="gap-2 cursor-pointer">
                    <Shield className="h-4 w-4" />
                    <span>Admin</span>
                    {isAdmin && <Badge variant="destructive" className="ml-auto text-xs">Active</Badge>}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => switchRole("tutor")} className="gap-2 cursor-pointer">
                    <BookOpen className="h-4 w-4" />
                    <span>Tutor</span>
                    {isTutor && <Badge variant="secondary" className="ml-auto text-xs">Active</Badge>}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => switchRole("student")} className="gap-2 cursor-pointer">
                    <GraduationCap className="h-4 w-4" />
                    <span>Student</span>
                    {isStudent && <Badge className="ml-auto text-xs">Active</Badge>}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
});
