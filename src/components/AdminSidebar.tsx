import { NavLink } from "react-router-dom";
import { memo, useMemo } from "react";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Users2,
  DollarSign,
  Settings,
  Sparkles,
  Video,
  FileText,
  Award,
  Calendar,
  Upload,
  BarChart3,
  Shield,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useUser } from "@/contexts/UserContext";

const adminNavigationItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Students", url: "/admin/students", icon: Users },
  { title: "Courses", url: "/admin/courses", icon: BookOpen },
  { title: "Tutors", url: "/admin/tutors", icon: GraduationCap },
  { title: "Batches", url: "/admin/batches", icon: Users2 },
  { title: "Payments", url: "/admin/payments", icon: DollarSign },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

const studentNavigationItems = [
  { title: "My Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "My Courses", url: "/admin/my-courses", icon: BookOpen },
  { title: "Assignments", url: "/admin/assignments", icon: FileText },
  { title: "Live Classes", url: "/admin/live-classes", icon: Video },
  { title: "Certificates", url: "/admin/certificates", icon: Award },
  { title: "Materials", url: "/admin/materials", icon: FileText },
  { title: "Progress", url: "/admin/progress", icon: BarChart3 },
];

const tutorNavigationItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Tutor Portal", url: "/tutor-admin/live-sessions", icon: Video },
];

export const AdminSidebar = memo(function AdminSidebar() {
  const { user, switchRole, isStudent, isTutor, isAdmin } = useUser();

  const navigationItems = isStudent
    ? studentNavigationItems
    : isTutor
      ? tutorNavigationItems
      : adminNavigationItems;

  const portalTitle = isStudent
    ? "Student Portal"
    : isTutor
      ? "Tutor Portal"
      : "Admin Portal";

  const userInitials = useMemo(() =>
    user?.name.split(" ").map(n => n[0]).join("") || "U",
    [user?.name]
  );

  return (
    <Sidebar
      className="w-72 bg-primary border-r border-white/10 shadow-xl"
      collapsible="none"
    >
      <SidebarHeader className="border-b border-white/10 pb-5 pt-6 px-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-white drop-shadow-sm">GigLabs</h2>
            <p className="text-xs text-white/90 font-semibold drop-shadow-sm">{portalTitle}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-5">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/80 text-xs uppercase tracking-wider font-bold mb-3 px-3 drop-shadow-sm">
            {isStudent ? "Learning" : isTutor ? "Teaching" : "Management"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1.5">
              {navigationItems.map((item, index) => (
                <div key={item.title}>
                  <SidebarMenuItem>
                    <SidebarMenuButton asChild className="p-0">
                      <NavLink
                        to={item.url}
                        end={item.url === "/admin"}
                        className={({ isActive }) =>
                          `group flex items-center gap-3.5 px-4 py-3.5 rounded-xl transition-all duration-200 ${isActive
                            ? "bg-white shadow-lg"
                            : "hover:bg-white/20 hover:shadow-md"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <item.icon
                              className="h-5 w-5 flex-shrink-0 transition-all duration-200"
                              style={{
                                color: isActive ? '#4f46e5' : '#ffffff',
                                strokeWidth: isActive ? 2.8 : 2.2,
                                filter: isActive ? 'none' : 'drop-shadow(0 1px 2px rgba(0,0,0,0.3))',
                              }}
                            />
                            <span
                              className="text-[15px] font-semibold tracking-wide transition-all duration-200"
                              style={{
                                color: isActive ? '#0f172a' : '#ffffff',
                                textShadow: isActive ? 'none' : '0 1px 2px rgba(0,0,0,0.3)',
                                fontWeight: isActive ? '700' : '600',
                              }}
                            >
                              {item.title}
                            </span>
                          </>
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  {/* Divider after every 2-3 items for visual grouping */}
                  {(index === 0 || index === 3) && (
                    <div className="my-3 h-px bg-white/10"></div>
                  )}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Profile Footer */}
      <SidebarFooter className="border-t border-white/10 p-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="w-full justify-start gap-3 h-auto py-3 px-3 hover:bg-white/20 transition-all duration-200">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-white/30 to-white/20 text-white flex items-center justify-center font-bold shadow-lg text-sm flex-shrink-0 drop-shadow-sm">
                {userInitials}
              </div>
              <div className="text-left min-w-0 flex-1">
                <div className="text-sm font-semibold text-white truncate drop-shadow-sm">{user?.name}</div>
                <div className="text-xs text-white/85 truncate drop-shadow-sm">{user?.email}</div>
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
      </SidebarFooter>
    </Sidebar>
  );
});
