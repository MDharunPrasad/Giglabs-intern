import { NavLink } from "react-router-dom";
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
  { title: "My Courses", url: "/admin/tutor-courses", icon: BookOpen },
  { title: "Create Course", url: "/admin/create-course", icon: Upload },
  { title: "Students", url: "/admin/my-students", icon: Users },
  { title: "Live Sessions", url: "/admin/live-sessions", icon: Video },
  { title: "Assignments", url: "/admin/tutor-assignments", icon: FileText },
  { title: "Analytics", url: "/admin/analytics", icon: BarChart3 },
  { title: "Schedule", url: "/admin/schedule", icon: Calendar },
];

export function AdminSidebar() {
  const { isStudent, isTutor, isAdmin } = useUser();

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

  return (
    <Sidebar 
      className="w-72 bg-gradient-to-b from-primary via-primary/98 to-primary/95 border-r border-primary/30 shadow-xl" 
      collapsible="none"
    >
      <SidebarHeader className="border-b border-primary-foreground/10 pb-6 pt-8 px-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent via-gold to-accent flex items-center justify-center shadow-lg shadow-accent/30 ring-2 ring-primary-foreground/20">
            <Sparkles className="h-7 w-7 text-white drop-shadow-lg" />
          </div>
          <div>
            <h2 className="text-2xl font-display font-bold text-primary-foreground drop-shadow-md">GigLabs</h2>
            <p className="text-sm text-primary-foreground/70 font-medium">{portalTitle}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-4 py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="text-primary-foreground/50 text-xs uppercase tracking-widest font-bold mb-4 px-4">
            {isStudent ? "Learning" : isTutor ? "Teaching" : "Management"}
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-2">
              {navigationItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/admin"}
                      className={({ isActive }) =>
                        `group flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-200 ease-out ${
                          isActive
                            ? "bg-white/95 shadow-lg scale-[1.02] ring-2 ring-white/30"
                            : "text-primary-foreground/80 hover:bg-primary-foreground/15 hover:text-primary-foreground hover:shadow-lg hover:scale-[1.02]"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <div className={`p-2 rounded-xl transition-all duration-200 ${
                            isActive 
                              ? "bg-gradient-to-br from-primary to-primary/90" 
                              : "bg-primary-foreground/10 group-hover:bg-primary-foreground/20"
                          }`}>
                            <item.icon className={`h-5 w-5 transition-all duration-200 ${
                              isActive 
                                ? "text-white" 
                                : "text-primary-foreground/70 group-hover:text-primary-foreground"
                            }`} />
                          </div>
                          <span className={`text-base font-semibold transition-all duration-200 ${
                            isActive ? "text-primary" : "text-primary-foreground/90 group-hover:text-primary-foreground"
                          }`}>
                            {item.title}
                          </span>
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
