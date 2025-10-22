import { NavLink } from "react-router-dom";
import { memo } from "react";
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
} from "@/components/ui/sidebar";
import { useUser } from "@/contexts/UserContext";

const adminNavigationItems = [
  { title: "Dashboard", url: "/admin", icon: LayoutDashboard },
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
  { title: "Live Sessions", url: "/admin/live-classes", icon: Video },
];

export const AdminSidebar = memo(function AdminSidebar() {
  const { isStudent, isTutor } = useUser();

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
      className="w-72 bg-primary border-r border-white/10 shadow-xl"
      collapsible="none"
    >
      <SidebarHeader className="border-b border-white/10 pb-5 pt-6 px-5">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-white/15 flex items-center justify-center">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-white">GigLabs</h2>
            <p className="text-xs text-white/70 font-medium">{portalTitle}</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent className="px-3 py-5">
        <SidebarGroup>
          <SidebarGroupLabel className="text-white/60 text-xs uppercase tracking-wider font-semibold mb-3 px-3">
            {isStudent ? "Learning" : isTutor ? "Live Sessions" : "Management"}
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
                            : "hover:bg-white/95 hover:shadow-md"
                          }`
                        }
                      >
                        {({ isActive }) => (
                          <>
                            <item.icon
                              className="h-5 w-5 flex-shrink-0 transition-colors"
                              style={{
                                color: isActive ? '#4f46e5' : undefined,
                                strokeWidth: isActive ? 2.8 : 2.2,
                              }}
                            />
                            <span
                              className="text-[15px] font-bold tracking-wide transition-colors group-hover:text-slate-900"
                              style={{
                                color: isActive ? '#0f172a' : '#ffffff',
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
    </Sidebar>
  );
});
