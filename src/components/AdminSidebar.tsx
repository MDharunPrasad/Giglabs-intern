import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  BookOpen,
  GraduationCap,
  Users2,
  DollarSign,
  BarChart3,
  Settings,
  Sparkles,
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
  useSidebar,
} from "@/components/ui/sidebar";

const navigationItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
  { title: "Students", url: "/admin/students", icon: Users },
  { title: "Courses", url: "/admin/courses", icon: BookOpen },
  { title: "Tutors", url: "/admin/tutors", icon: GraduationCap },
  { title: "Batches", url: "/admin/batches", icon: Users2 },
  { title: "Payments", url: "/admin/payments", icon: DollarSign },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Settings", url: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const { open } = useSidebar();

  return (
    <Sidebar 
      className={`${open ? "w-60" : "w-14"} bg-gradient-to-b from-primary to-primary/90 border-r border-primary/20`} 
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-primary-foreground/10 pb-4 pt-6">
        <div className={`flex items-center gap-3 px-3 ${!open && "justify-center"}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent to-gold flex items-center justify-center shadow-lg">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          {open && (
            <div>
              <h2 className="text-lg font-display font-bold text-primary-foreground">LearnHub</h2>
              <p className="text-xs text-primary-foreground/70">Admin Portal</p>
            </div>
          )}
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-4">
        <SidebarGroup>
          {open && (
            <SidebarGroupLabel className="text-primary-foreground/60 text-xs uppercase tracking-wider mb-2">
              Navigation
            </SidebarGroupLabel>
          )}
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className={({ isActive }) =>
                        `group flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all duration-200 ${
                          isActive
                            ? "bg-primary-foreground text-primary shadow-md font-semibold"
                            : "text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground hover:shadow-sm"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <item.icon className={`h-5 w-5 ${isActive ? "animate-pulse" : "group-hover:scale-110 transition-transform"}`} />
                          {open && <span className="text-sm">{item.title}</span>}
                        </>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
