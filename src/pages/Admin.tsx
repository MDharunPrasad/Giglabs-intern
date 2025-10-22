import { memo } from "react";
import { StatCard } from "@/components/StatCard";
import { Button } from "@/components/ui/button";
import { Users, BookOpen, DollarSign } from "lucide-react";

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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StatCard 
              title="Total Students"
              value="48"
              icon={Users}
              variant="primary"
              trend={{ value: 12, label: "this month" }}
            />
            <StatCard 
              title="Active Courses"
              value="3"
              icon={BookOpen}
              variant="accent"
            />
            <StatCard 
              title="Revenue (MTD)"
              value="₹1,24,000"
              icon={DollarSign}
              variant="default"
              trend={{ value: 18, label: "vs last month" }}
            />
          </div>
        </section>

        <div className="space-y-8">
          {/* Main Content */}
          <div className="space-y-8">
            {/* Student Registrations */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display">Recent Registrations</h3>
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
              <div className="mb-6">
                <h3 className="text-2xl font-display">Top Performing Courses</h3>
              </div>
              <div className="bg-card rounded-lg shadow-md overflow-hidden">
                <div className="divide-y divide-border">
                  <CourseRow 
                    title="Full Stack Development"
                    students={342}
                    registrations={342}
                  />
                  <CourseRow 
                    title="Frontend Development"
                    students={298}
                    registrations={298}
                  />
                  <CourseRow 
                    title="Backend Development"
                    students={256}
                    registrations={256}
                  />
                  <CourseRow 
                    title="UI/UX Design"
                    students={234}
                    registrations={234}
                  />
                </div>
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

const CourseRow = memo(function CourseRow({ title, students, registrations }: {
  title: string;
  students: number;
  registrations: number;
}) {
  return (
    <div className="p-4 hover:bg-secondary/50 transition-colors">
      <div className="flex items-center justify-between mb-2">
        <h4 className="font-medium">{title}</h4>
        <span className="text-sm text-muted-foreground">{students} students</span>
      </div>
      <div className="text-sm">
        <span className="text-muted-foreground">Total Registrations: </span>
        <span className="font-semibold">{registrations}</span>
      </div>
    </div>
  );
});
