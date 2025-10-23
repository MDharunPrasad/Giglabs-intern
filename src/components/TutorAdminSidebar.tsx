import { NavLink } from "react-router-dom";
import { memo, useMemo } from "react";
import {
    Video,
    BookOpen,
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

const tutorAdminNavigationItems = [
    { title: "Live Sessions", url: "/tutor-admin/live-sessions", icon: Video },
    { title: "Modules", url: "/tutor-admin/modules", icon: BookOpen },
];

export const TutorAdminSidebar = memo(function TutorAdminSidebar() {
    const { user, switchRole, isStudent, isTutor, isAdmin } = useUser();

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
                        <p className="text-xs text-white/90 font-semibold drop-shadow-sm">Tutor Portal</p>
                    </div>
                </div>
            </SidebarHeader>

            <SidebarContent className="px-3 py-5">
                <SidebarGroup>
                    <SidebarGroupLabel className="text-white/80 text-xs uppercase tracking-wider font-bold mb-3 px-3 drop-shadow-sm">
                        Teaching Tools
                    </SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="space-y-1.5">
                            {tutorAdminNavigationItems.map((item, index) => (
                                <div key={item.title}>
                                    <SidebarMenuItem>
                                        <SidebarMenuButton asChild className="p-0">
                                            <NavLink
                                                to={item.url}
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
                                    {/* Divider between items */}
                                    {index === 0 && (
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
                            <span>Admin</span>
                            {isAdmin && <Badge variant="destructive" className="ml-auto text-xs">Active</Badge>}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => switchRole("tutor")} className="gap-2 cursor-pointer">
                            <span>Tutor</span>
                            {isTutor && <Badge variant="secondary" className="ml-auto text-xs">Active</Badge>}
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => switchRole("student")} className="gap-2 cursor-pointer">
                            <span>Student</span>
                            {isStudent && <Badge className="ml-auto text-xs">Active</Badge>}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    );
});
