import { useState } from "react";
import { Search, Play, Clock, CheckCircle2, BookOpen, TrendingUp } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";

interface Course {
  id: string;
  title: string;
  instructor: string;
  progress: number;
  totalModules: number;
  completedModules: number;
  thumbnail: string;
  duration: string;
  category: string;
  nextLesson: string;
}

export default function MyCourses() {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data - would come from API
  const enrolledCourses: Course[] = [
    {
      id: "1",
      title: "Full Stack Web Development",
      instructor: "John Doe",
      progress: 65,
      totalModules: 12,
      completedModules: 8,
      thumbnail: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=400",
      duration: "40 hours",
      category: "Web Development",
      nextLesson: "Building REST APIs",
    },
    {
      id: "2",
      title: "AI & Machine Learning Fundamentals",
      instructor: "Jane Smith",
      progress: 30,
      totalModules: 15,
      completedModules: 4,
      thumbnail: "https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=400",
      duration: "50 hours",
      category: "AI/ML",
      nextLesson: "Neural Networks Basics",
    },
    {
      id: "3",
      title: "Cloud Computing with AWS",
      instructor: "Mike Johnson",
      progress: 90,
      totalModules: 10,
      completedModules: 9,
      thumbnail: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=400",
      duration: "30 hours",
      category: "Cloud",
      nextLesson: "Final Project",
    },
  ];

  const filteredCourses = enrolledCourses.filter((course) =>
    course.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent mb-2">
          My Learning Journey
        </h1>
        <p className="text-muted-foreground text-lg">
          Continue where you left off and track your progress
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-primary/10 via-primary/5 to-transparent border-primary/20 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">
                Enrolled Courses
              </p>
              <h3 className="text-3xl font-bold">{enrolledCourses.length}</h3>
            </div>
            <div className="p-3 rounded-xl bg-primary/10">
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-accent/10 via-accent/5 to-transparent border-accent/20 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">
                Completed Modules
              </p>
              <h3 className="text-3xl font-bold">
                {enrolledCourses.reduce((acc, c) => acc + c.completedModules, 0)}
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-accent/10">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-gold/10 via-gold/5 to-transparent border-gold/20 hover:shadow-xl transition-all duration-300">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground font-medium mb-1">
                Avg. Progress
              </p>
              <h3 className="text-3xl font-bold">
                {Math.round(
                  enrolledCourses.reduce((acc, c) => acc + c.progress, 0) /
                    enrolledCourses.length
                )}
                %
              </h3>
            </div>
            <div className="p-3 rounded-xl bg-gold/10">
              <TrendingUp className="h-8 w-8 text-gold" />
            </div>
          </div>
        </Card>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search your courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card
            key={course.id}
            className="group overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer bg-gradient-to-br from-card via-card to-card/50"
          >
            {/* Thumbnail */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={course.thumbnail}
                alt={course.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <Badge className="absolute top-4 left-4 bg-primary/90 backdrop-blur-sm">
                {course.category}
              </Badge>
              <div className="absolute bottom-4 left-4 right-4">
                <h3 className="text-white font-bold text-lg mb-1 line-clamp-2">
                  {course.title}
                </h3>
                <p className="text-white/80 text-sm">{course.instructor}</p>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-4">
              {/* Progress */}
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-semibold">{course.progress}%</span>
                </div>
                <Progress value={course.progress} className="h-2" />
                <p className="text-xs text-muted-foreground mt-1">
                  {course.completedModules} of {course.totalModules} modules
                  completed
                </p>
              </div>

              {/* Next Lesson */}
              <div className="flex items-start gap-2 p-3 bg-accent/5 rounded-lg border border-accent/20">
                <Play className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Up Next:
                  </p>
                  <p className="text-sm font-medium line-clamp-1">
                    {course.nextLesson}
                  </p>
                </div>
              </div>

              {/* Duration */}
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>{course.duration}</span>
              </div>

              {/* Action Button */}
              <Button
                className="w-full gap-2 group-hover:shadow-lg transition-all"
                onClick={() => navigate(`/admin/course/${course.id}`)}
              >
                <Play className="h-4 w-4" />
                Continue Learning
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">No courses found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or enroll in new courses
          </p>
        </div>
      )}
    </div>
  );
}
