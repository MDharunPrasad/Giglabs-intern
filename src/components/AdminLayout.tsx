import { ReactNode } from "react";
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
import { User, GraduationCap, BookOpen, Shield } from "lucide-react";

interface AdminLayoutProps {
  children: ReactNode;
}

export function AdminLayout({ children }: AdminLayoutProps) {
  const { user, switchRole, isStudent, isTutor, isAdmin } = useUser();

  const getRoleIcon = () => {
    if (isStudent) return <GraduationCap className="h-4 w-4" />;
    if (isTutor) return <BookOpen className="h-4 w-4" />;
    return <Shield className="h-4 w-4" />;
  };

  const getRoleBadgeVariant = () => {
    if (isStudent) return "default";
    if (isTutor) return "secondary";
    return "destructive";
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          {/* Header with user info and role switcher */}
          <header className="bg-card/50 backdrop-blur-sm border-b border-border/50 sticky top-0 z-50">
            <div className="px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Badge variant={getRoleBadgeVariant()} className="flex items-center gap-1.5 px-3 py-1">
                  {getRoleIcon()}
                  <span className="capitalize font-semibold">{user?.role}</span>
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Viewing as {user?.role}
                </span>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent text-primary-foreground flex items-center justify-center font-bold shadow-lg text-sm">
                      {user?.name.split(" ").map(n => n[0]).join("")}
                    </div>
                    <div className="text-left hidden md:block">
                      <div className="text-sm font-medium">{user?.name}</div>
                      <div className="text-xs text-muted-foreground">{user?.email}</div>
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>Switch Role (Demo)</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={() => switchRole("admin")} className="gap-2">
                    <Shield className="h-4 w-4" />
                    <span>Admin</span>
                    {isAdmin && <Badge variant="destructive" className="ml-auto">Active</Badge>}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => switchRole("tutor")} className="gap-2">
                    <BookOpen className="h-4 w-4" />
                    <span>Tutor</span>
                    {isTutor && <Badge variant="secondary" className="ml-auto">Active</Badge>}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => switchRole("student")} className="gap-2">
                    <GraduationCap className="h-4 w-4" />
                    <span>Student</span>
                    {isStudent && <Badge className="ml-auto">Active</Badge>}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </header>
          
          {/* Main content */}
          <main className="flex-1">
            {children}
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
}
