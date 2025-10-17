import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Play,
  Pause,
  Volume2,
  VolumeX,
  Maximize,
  Settings,
  ChevronRight,
  CheckCircle2,
  Lock,
  FileText,
  Download,
  Bookmark,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  completed: boolean;
}

interface Lesson {
  id: string;
  title: string;
  duration: string;
  completed: boolean;
  locked: boolean;
  type: "video" | "quiz" | "assignment";
}

export default function CourseViewer() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentLesson, setCurrentLesson] = useState("1-1");

  // Mock course data
  const course = {
    id: courseId,
    title: "Full Stack Web Development",
    instructor: "John Doe",
    progress: 65,
    modules: [
      {
        id: "1",
        title: "Getting Started with Web Development",
        completed: true,
        lessons: [
          {
            id: "1-1",
            title: "Introduction to HTML",
            duration: "12:30",
            completed: true,
            locked: false,
            type: "video" as const,
          },
          {
            id: "1-2",
            title: "CSS Fundamentals",
            duration: "18:45",
            completed: true,
            locked: false,
            type: "video" as const,
          },
          {
            id: "1-3",
            title: "JavaScript Basics",
            duration: "25:00",
            completed: false,
            locked: false,
            type: "video" as const,
          },
        ],
      },
      {
        id: "2",
        title: "Frontend Frameworks",
        completed: false,
        lessons: [
          {
            id: "2-1",
            title: "Introduction to React",
            duration: "20:15",
            completed: false,
            locked: false,
            type: "video" as const,
          },
          {
            id: "2-2",
            title: "React Hooks Deep Dive",
            duration: "30:00",
            completed: false,
            locked: true,
            type: "video" as const,
          },
        ],
      },
    ],
    materials: [
      { id: "1", title: "Course Syllabus.pdf", size: "2.4 MB" },
      { id: "2", title: "HTML Cheat Sheet.pdf", size: "1.2 MB" },
      { id: "3", title: "JavaScript Reference.pdf", size: "3.5 MB" },
    ],
  };

  const currentLessonData = course.modules
    .flatMap((m) => m.lessons)
    .find((l) => l.id === currentLesson);

  return (
    <div className="flex h-[calc(100vh-73px)]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Video Player */}
        <div className="bg-black relative aspect-video">
          {/* Mock video player */}
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1200"
              alt="Video thumbnail"
              className="w-full h-full object-cover opacity-40"
            />
            <Button
              size="lg"
              className="absolute w-20 h-20 rounded-full"
              onClick={() => setIsPlaying(!isPlaying)}
            >
              {isPlaying ? (
                <Pause className="h-8 w-8" />
              ) : (
                <Play className="h-8 w-8 ml-1" />
              )}
            </Button>
          </div>

          {/* Video Controls */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <Progress value={35} className="h-1 mb-4" />
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? (
                    <Pause className="h-5 w-5" />
                  ) : (
                    <Play className="h-5 w-5" />
                  )}
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                  onClick={() => setIsMuted(!isMuted)}
                >
                  {isMuted ? (
                    <VolumeX className="h-5 w-5" />
                  ) : (
                    <Volume2 className="h-5 w-5" />
                  )}
                </Button>
                <span className="text-sm">4:30 / 12:30</span>
              </div>
              <div className="flex items-center gap-2">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <Settings className="h-5 w-5" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-white hover:bg-white/20"
                >
                  <Maximize className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Course Info & Tabs */}
        <div className="flex-1 overflow-hidden">
          <ScrollArea className="h-full">
            <div className="p-6">
              <div className="mb-6">
                <h1 className="text-2xl font-bold mb-2">
                  {currentLessonData?.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <span>{course.instructor}</span>
                  <span>•</span>
                  <span>{currentLessonData?.duration}</span>
                </div>
              </div>

              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="materials">Materials</TabsTrigger>
                  <TabsTrigger value="notes">Notes</TabsTrigger>
                  <TabsTrigger value="discussion">Discussion</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4 mt-6">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">About this lesson</h3>
                    <p className="text-muted-foreground leading-relaxed">
                      In this comprehensive lesson, we'll dive deep into the
                      fundamentals of web development. You'll learn how to
                      structure web pages using HTML, style them beautifully
                      with CSS, and add interactivity with JavaScript. By the
                      end of this module, you'll have built your first
                      fully-functional web page.
                    </p>
                  </Card>

                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">What you'll learn</h3>
                    <ul className="space-y-2">
                      {[
                        "HTML5 semantic elements and structure",
                        "CSS Grid and Flexbox for layouts",
                        "JavaScript DOM manipulation",
                        "Responsive design principles",
                        "Best practices and modern techniques",
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <CheckCircle2 className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </Card>
                </TabsContent>

                <TabsContent value="materials" className="space-y-4 mt-6">
                  <Card className="p-6">
                    <h3 className="font-semibold mb-4">Course Materials</h3>
                    <div className="space-y-3">
                      {course.materials.map((material) => (
                        <div
                          key={material.id}
                          className="flex items-center justify-between p-3 bg-muted/50 rounded-lg hover:bg-muted transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <FileText className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium text-sm">
                                {material.title}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {material.size}
                              </p>
                            </div>
                          </div>
                          <Button size="sm" variant="ghost">
                            <Download className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="notes" className="space-y-4 mt-6">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">My Notes</h3>
                      <Button size="sm" variant="outline">
                        <Bookmark className="h-4 w-4 mr-2" />
                        Add Bookmark
                      </Button>
                    </div>
                    <div className="text-center py-8 text-muted-foreground">
                      <Bookmark className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No notes yet for this lesson</p>
                      <p className="text-sm mt-1">
                        Start taking notes while watching
                      </p>
                    </div>
                  </Card>
                </TabsContent>

                <TabsContent value="discussion" className="space-y-4 mt-6">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">Discussion</h3>
                      <Button size="sm">Ask Question</Button>
                    </div>
                    <div className="text-center py-8 text-muted-foreground">
                      <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-50" />
                      <p>No discussions yet</p>
                      <p className="text-sm mt-1">
                        Be the first to start a discussion
                      </p>
                    </div>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </ScrollArea>
        </div>
      </div>

      {/* Course Outline Sidebar */}
      <div className="w-96 border-l bg-card">
        <div className="p-4 border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate("/admin/my-courses")}
            className="mb-3"
          >
            ← Back to Courses
          </Button>
          <h2 className="font-bold text-lg mb-1">{course.title}</h2>
          <Progress value={course.progress} className="h-2" />
          <p className="text-xs text-muted-foreground mt-2">
            {course.progress}% Complete
          </p>
        </div>

        <ScrollArea className="h-[calc(100vh-240px)]">
          <div className="p-4 space-y-4">
            {course.modules.map((module, moduleIndex) => (
              <div key={module.id}>
                <div className="flex items-center gap-2 mb-3">
                  {module.completed ? (
                    <CheckCircle2 className="h-5 w-5 text-accent" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-muted-foreground" />
                  )}
                  <h3 className="font-semibold text-sm">
                    Module {moduleIndex + 1}: {module.title}
                  </h3>
                </div>

                <div className="space-y-2 ml-7">
                  {module.lessons.map((lesson) => (
                    <button
                      key={lesson.id}
                      onClick={() =>
                        !lesson.locked && setCurrentLesson(lesson.id)
                      }
                      disabled={lesson.locked}
                      className={`w-full text-left p-3 rounded-lg transition-all ${
                        currentLesson === lesson.id
                          ? "bg-primary text-primary-foreground shadow-lg"
                          : lesson.locked
                          ? "bg-muted/30 text-muted-foreground cursor-not-allowed"
                          : "bg-muted/50 hover:bg-muted"
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium line-clamp-1">
                          {lesson.title}
                        </span>
                        {lesson.locked ? (
                          <Lock className="h-4 w-4 flex-shrink-0" />
                        ) : lesson.completed ? (
                          <CheckCircle2 className="h-4 w-4 text-accent flex-shrink-0" />
                        ) : (
                          <ChevronRight className="h-4 w-4 flex-shrink-0" />
                        )}
                      </div>
                      <div className="flex items-center gap-2 text-xs opacity-70">
                        <Play className="h-3 w-3" />
                        <span>{lesson.duration}</span>
                      </div>
                    </button>
                  ))}
                </div>

                {moduleIndex < course.modules.length - 1 && (
                  <Separator className="my-4" />
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
