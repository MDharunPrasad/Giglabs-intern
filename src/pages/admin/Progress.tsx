import { TrendingUp, Target, Award, BookOpen, Clock, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

export default function ProgressPage() {
  const overallStats = {
    coursesEnrolled: 3,
    coursesCompleted: 1,
    totalHours: 45,
    averageGrade: 90,
  };

  const courseProgress = [
    {
      id: "1",
      title: "Full Stack Web Development",
      progress: 65,
      completedModules: 8,
      totalModules: 12,
      hoursSpent: 28,
      lastActivity: "2 hours ago",
    },
    {
      id: "2",
      title: "AI & Machine Learning",
      progress: 30,
      completedModules: 4,
      totalModules: 15,
      hoursSpent: 12,
      lastActivity: "1 day ago",
    },
    {
      id: "3",
      title: "Cloud Computing with AWS",
      progress: 100,
      completedModules: 10,
      totalModules: 10,
      hoursSpent: 30,
      lastActivity: "Completed",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent mb-2">
        Learning Progress
      </h1>
      <p className="text-muted-foreground text-lg mb-8">
        Track your learning journey and achievements
      </p>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <div className="flex items-center justify-between mb-2">
            <BookOpen className="h-8 w-8 text-primary" />
            <Badge variant="secondary">{overallStats.coursesCompleted}/{overallStats.coursesEnrolled}</Badge>
          </div>
          <p className="text-sm text-muted-foreground">Courses</p>
          <p className="text-2xl font-bold">{overallStats.coursesEnrolled}</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
          <div className="flex items-center justify-between mb-2">
            <Clock className="h-8 w-8 text-accent" />
          </div>
          <p className="text-sm text-muted-foreground">Hours Learned</p>
          <p className="text-2xl font-bold">{overallStats.totalHours}h</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
          <div className="flex items-center justify-between mb-2">
            <Award className="h-8 w-8 text-gold" />
          </div>
          <p className="text-sm text-muted-foreground">Avg. Grade</p>
          <p className="text-2xl font-bold">{overallStats.averageGrade}%</p>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-500/10 to-transparent border-green-500/20">
          <div className="flex items-center justify-between mb-2">
            <Target className="h-8 w-8 text-green-500" />
          </div>
          <p className="text-sm text-muted-foreground">Completion Rate</p>
          <p className="text-2xl font-bold">
            {Math.round((overallStats.coursesCompleted / overallStats.coursesEnrolled) * 100)}%
          </p>
        </Card>
      </div>

      {/* Course Progress */}
      <h2 className="text-2xl font-bold mb-4">Course Progress</h2>
      <div className="space-y-4">
        {courseProgress.map((course) => (
          <Card key={course.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">{course.title}</h3>
                <p className="text-sm text-muted-foreground">
                  Last activity: {course.lastActivity}
                </p>
              </div>
              {course.progress === 100 && (
                <Badge className="bg-green-500">
                  <CheckCircle2 className="h-3 w-3 mr-1" />
                  Completed
                </Badge>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Overall Progress</span>
                  <span className="font-semibold">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-3" />
              </div>

              <div className="grid grid-cols-3 gap-4 pt-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Modules</p>
                  <p className="font-semibold">
                    {course.completedModules}/{course.totalModules}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Hours Spent</p>
                  <p className="font-semibold">{course.hoursSpent}h</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground mb-1">Remaining</p>
                  <p className="font-semibold">
                    {course.totalModules - course.completedModules} modules
                  </p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
