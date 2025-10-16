import { BarChart3, TrendingUp, Users, BookOpen } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";

export default function Analytics() {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex-1">
          <header className="border-b bg-card px-6 py-4 flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-display font-bold">LearnHub Admin</h1>
          </header>
          <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Students"
          value="1,234"
          icon={Users}
          variant="primary"
          trend={{ value: 12, label: "vs last month" }}
        />
        <StatCard
          title="Active Courses"
          value="24"
          icon={BookOpen}
          variant="accent"
          trend={{ value: 8, label: "vs last month" }}
        />
        <StatCard
          title="Completion Rate"
          value="87%"
          icon={TrendingUp}
          variant="gold"
          trend={{ value: 5, label: "vs last month" }}
        />
        <StatCard
          title="Avg. Score"
          value="82/100"
          icon={BarChart3}
          variant="default"
          trend={{ value: 3, label: "vs last month" }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border shadow-md p-6">
          <h3 className="text-xl font-display font-semibold mb-4">
            Student Enrollment Trends
          </h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Chart placeholder - Add your preferred chart library
          </div>
        </div>

        <div className="bg-card rounded-lg border shadow-md p-6">
          <h3 className="text-xl font-display font-semibold mb-4">
            Course Performance
          </h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Chart placeholder - Add your preferred chart library
          </div>
        </div>

        <div className="bg-card rounded-lg border shadow-md p-6">
          <h3 className="text-xl font-display font-semibold mb-4">
            Revenue Overview
          </h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Chart placeholder - Add your preferred chart library
          </div>
        </div>

        <div className="bg-card rounded-lg border shadow-md p-6">
          <h3 className="text-xl font-display font-semibold mb-4">
            Domain Distribution
          </h3>
          <div className="h-64 flex items-center justify-center text-muted-foreground">
            Chart placeholder - Add your preferred chart library
          </div>
        </div>
      </div>
          </div>
        </div>
      </div>
    </SidebarProvider>
  );
}
