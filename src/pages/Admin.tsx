import { memo } from "react";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, TrendingUp, DollarSign, Download, Filter } from "lucide-react";

export default function Admin() {
  return (
      <div className="container mx-auto px-6 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h2 className="text-4xl font-display mb-2">Admin Dashboard</h2>
          <p className="text-muted-foreground">Overview of platform performance and analytics</p>
        </div>

        {/* Key Metrics */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Total Students"
              value="5,247"
              icon={Users}
              variant="primary"
              trend={{ value: 12, label: "this month" }}
            />
            <StatCard 
              title="Active Courses"
              value="48"
              icon={BookOpen}
              variant="accent"
            />
            <StatCard 
              title="Completion Rate"
              value="87%"
              icon={TrendingUp}
              variant="gold"
              trend={{ value: 5, label: "vs last month" }}
            />
            <StatCard 
              title="Revenue (MTD)"
              value="$124K"
              icon={DollarSign}
              variant="default"
              trend={{ value: 18, label: "vs last month" }}
            />
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Student Registrations */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display">Recent Registrations</h3>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4" />
                    Filter
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="w-4 h-4" />
                    Export
                  </Button>
                </div>
              </div>
              <div className="bg-card rounded-lg shadow-md overflow-hidden">
                <table className="w-full">
                  <thead className="bg-secondary">
                    <tr>
                      <th className="text-left p-4 font-semibold text-sm">Student</th>
                      <th className="text-left p-4 font-semibold text-sm">Domain</th>
                      <th className="text-left p-4 font-semibold text-sm">Track</th>
                      <th className="text-left p-4 font-semibold text-sm">Date</th>
                      <th className="text-left p-4 font-semibold text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <StudentRow 
                      name="Emma Chen"
                      email="emma.chen@email.com"
                      domain="Full-Stack Dev"
                      track="Online"
                      date="Jan 20, 2024"
                      status="active"
                    />
                    <StudentRow 
                      name="Mike Ross"
                      email="mike.ross@email.com"
                      domain="AI/ML"
                      track="Offline"
                      date="Jan 19, 2024"
                      status="active"
                    />
                    <StudentRow 
                      name="Sarah Johnson"
                      email="sarah.j@email.com"
                      domain="Full-Stack Dev"
                      track="Online"
                      date="Jan 18, 2024"
                      status="pending"
                    />
                    <StudentRow 
                      name="David Kim"
                      email="david.kim@email.com"
                      domain="Data Science"
                      track="Online"
                      date="Jan 17, 2024"
                      status="active"
                    />
                  </tbody>
                </table>
              </div>
            </section>

            {/* Course Performance */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display">Top Performing Courses</h3>
                <Button variant="ghost" size="sm">View All</Button>
              </div>
              <div className="bg-card rounded-lg shadow-md overflow-hidden">
                <div className="divide-y divide-border">
                  <CourseRow 
                    title="React Fundamentals"
                    students={342}
                    completion={92}
                    avgScore={88}
                  />
                  <CourseRow 
                    title="TypeScript Deep Dive"
                    students={298}
                    completion={87}
                    avgScore={85}
                  />
                  <CourseRow 
                    title="Node.js Essentials"
                    students={256}
                    completion={89}
                    avgScore={90}
                  />
                  <CourseRow 
                    title="Database Design"
                    students={234}
                    completion={84}
                    avgScore={86}
                  />
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Quick Actions */}
            <section>
              <h3 className="text-xl font-display mb-6">Quick Actions</h3>
              <div className="bg-card rounded-lg p-6 shadow-md space-y-3">
                <Button variant="default" className="w-full justify-start">
                  <Users className="w-4 h-4" />
                  Add New Student
                </Button>
                <Button variant="default" className="w-full justify-start">
                  <BookOpen className="w-4 h-4" />
                  Create Course
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <Download className="w-4 h-4" />
                  Generate Report
                </Button>
              </div>
            </section>

            {/* System Status */}
            <section>
              <h3 className="text-xl font-display mb-6">System Status</h3>
              <div className="bg-card rounded-lg p-6 shadow-md space-y-4">
                <StatusItem label="Platform" status="operational" />
                <StatusItem label="Payment Gateway" status="operational" />
                <StatusItem label="Video Streaming" status="operational" />
                <StatusItem label="API Services" status="operational" />
              </div>
            </section>

            {/* Recent Activity */}
            <section>
              <h3 className="text-xl font-display mb-6">Recent Activity</h3>
              <div className="bg-card rounded-lg p-6 shadow-md space-y-4">
                <ActivityItem 
                  action="New student enrolled"
                  time="5 min ago"
                />
                <ActivityItem 
                  action="Course module updated"
                  time="15 min ago"
                />
                <ActivityItem 
                  action="Payment received"
                  time="1 hour ago"
                />
                <ActivityItem 
                  action="Tutor profile updated"
                  time="2 hours ago"
                />
              </div>
            </section>
          </div>
        </div>
      </div>
  );
}

const StudentRow = memo(function StudentRow({ name, email, domain, track, date, status }: {
  name: string;
  email: string;
  domain: string;
  track: string;
  date: string;
  status: "active" | "pending";
}) {
  return (
    <tr className="hover:bg-secondary/50 transition-colors">
      <td className="p-4">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{email}</p>
      </td>
      <td className="p-4 text-sm">{domain}</td>
      <td className="p-4 text-sm">{track}</td>
      <td className="p-4 text-sm text-muted-foreground">{date}</td>
      <td className="p-4">
        <span className={`px-2 py-1 rounded text-xs font-semibold ${
          status === "active" 
            ? "bg-accent/10 text-accent" 
            : "bg-gold/10 text-gold"
        }`}>
          {status.charAt(0).toUpperCase() + status.slice(1)}
        </span>
      </td>
    </tr>
  );
});

const CourseRow = memo(function CourseRow({ title, students, completion, avgScore }: {
  title: string;
  students: number;
  completion: number;
  avgScore: number;
}) {
  return (
    <div className="p-4 hover:bg-secondary/50 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">{title}</h4>
        <span className="text-sm text-muted-foreground">{students} students</span>
      </div>
      <div className="grid grid-cols-2 gap-4 text-sm">
        <div>
          <span className="text-muted-foreground">Completion: </span>
          <span className="font-semibold">{completion}%</span>
        </div>
        <div>
          <span className="text-muted-foreground">Avg Score: </span>
          <span className="font-semibold">{avgScore}%</span>
        </div>
      </div>
    </div>
  );
});

const StatusItem = memo(function StatusItem({ label, status }: { label: string; status: "operational" | "warning" | "error" }) {
  const statusColors = {
    operational: "bg-accent",
    warning: "bg-gold",
    error: "bg-destructive"
  };

  return (
    <div className="flex items-center justify-between">
      <span className="text-sm">{label}</span>
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full ${statusColors[status]}`} />
        <span className="text-sm text-muted-foreground capitalize">{status}</span>
      </div>
    </div>
  );
});

const ActivityItem = memo(function ActivityItem({ action, time }: { action: string; time: string }) {
  return (
    <div>
      <p className="text-sm">{action}</p>
      <p className="text-xs text-muted-foreground">{time}</p>
    </div>
  );
});
