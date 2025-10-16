import { Button } from "@/components/ui/button";
import { Code, Palette, Server, Brain, Sparkles, Layout, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";
import { CourseDialog } from "@/components/CourseDialog";
import { useState } from "react";

const courses = [
  {
    id: "full-stack",
    title: "Full Stack Development",
    description: "Master both frontend and backend technologies. Build complete web applications from scratch.",
    duration: "3 Months",
    icon: Layout,
    gradient: "from-primary to-accent",
    totalSlots: 100,
    remainingSlots: 23
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Create stunning user interfaces with React, TypeScript, and modern CSS frameworks.",
    duration: "2 Months",
    icon: Code,
    gradient: "from-accent to-primary",
    totalSlots: 100,
    remainingSlots: 45
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Build robust server-side applications, APIs, and manage databases efficiently.",
    duration: "2 Months",
    icon: Server,
    gradient: "from-primary to-gold",
    totalSlots: 80,
    remainingSlots: 62
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Design beautiful and intuitive user experiences. Learn Figma, design systems, and prototyping.",
    duration: "2 Months",
    icon: Palette,
    gradient: "from-gold to-accent",
    totalSlots: 60,
    remainingSlots: 18
  },
  {
    id: "aiml",
    title: "AI & Machine Learning",
    description: "Dive into artificial intelligence, neural networks, and machine learning algorithms.",
    duration: "3 Months",
    icon: Brain,
    gradient: "from-accent to-gold",
    totalSlots: 50,
    remainingSlots: 8
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    description: "Master the art of crafting effective AI prompts for various AI models and applications.",
    duration: "1 Month",
    icon: Sparkles,
    gradient: "from-gold to-primary",
    totalSlots: 100,
    remainingSlots: 87
  }
];

export default function BrowseCourses() {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleCourseClick = (course: typeof courses[0]) => {
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">

      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </Link>

        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Choose Your Path
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto">
            Select from our industry-leading courses and start your journey to becoming a tech professional
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {courses.map((course, index) => {
            const slotsPercentage = (course.remainingSlots / course.totalSlots) * 100;
            const isLowStock = slotsPercentage < 30;

            return (
              <div
                key={course.id}
                onClick={() => handleCourseClick(course)}
                className="glass-card rounded-2xl p-8 hover:shadow-glow transition-all duration-300 group animate-fade-in cursor-pointer"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-16 h-16 rounded-xl bg-primary flex items-center justify-center mb-6 group-hover:scale-110 group-hover:shadow-glow transition-all">
                  <course.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                
                <h3 className="text-2xl font-display font-bold mb-3 text-foreground">{course.title}</h3>
                <p className="text-muted-foreground mb-6 line-clamp-2">{course.description}</p>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">Duration</span>
                    <span className="text-sm font-semibold text-primary">{course.duration}</span>
                  </div>
                  
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Slots Available</span>
                      <span className={`font-semibold ${isLowStock ? 'text-destructive' : 'text-primary'}`}>
                        {course.remainingSlots}/{course.totalSlots}
                      </span>
                    </div>
                    <div className="h-2 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ${isLowStock ? 'bg-destructive' : 'bg-primary'}`}
                        style={{ width: `${slotsPercentage}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                <Button className="w-full bg-primary hover:bg-primary-hover text-primary-foreground shadow-glow group/btn">
                  View Details
                  <ArrowLeft className="w-4 h-4 rotate-180 group-hover/btn:translate-x-1 transition-transform" />
                </Button>
              </div>
            );
          })}
        </div>
      </div>

      <CourseDialog 
        course={selectedCourse}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}
