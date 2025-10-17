import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Palette, Server, Brain, Sparkles, Layout, ArrowLeft, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import { CourseDialog } from "@/components/CourseDialog";
import { useState, useMemo, memo, useEffect } from "react";

// Course data - made available earlier for better performance
const courses = [
  {
    id: "full-stack",
    title: "Full Stack Development",
    description: "Master both frontend and backend technologies. Build complete web applications from scratch.",
    duration: "3 Months",
    icon: Layout,
    gradient: "from-primary to-accent",
    totalSlots: 100,
    remainingSlots: 0, // Fully booked
    nextBatchDate: "November 2025"
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Create stunning user interfaces with React, TypeScript, and modern CSS frameworks.",
    duration: "2 Months",
    icon: Code,
    gradient: "from-accent to-primary",
    totalSlots: 100,
    remainingSlots: 45,
    nextBatchDate: "November 2025"
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Build robust server-side applications, APIs, and manage databases efficiently.",
    duration: "2 Months",
    icon: Server,
    gradient: "from-primary to-gold",
    totalSlots: 80,
    remainingSlots: 0, // Fully booked
    nextBatchDate: "December 2025"
  },
  {
    id: "ui-ux",
    title: "UI/UX Design",
    description: "Design beautiful and intuitive user experiences. Learn Figma, design systems, and prototyping.",
    duration: "2 Months",
    icon: Palette,
    gradient: "from-gold to-accent",
    totalSlots: 60,
    remainingSlots: 18,
    nextBatchDate: "November 2025"
  },
  {
    id: "aiml",
    title: "AI & Machine Learning",
    description: "Dive into artificial intelligence, neural networks, and machine learning algorithms.",
    duration: "3 Months",
    icon: Brain,
    gradient: "from-accent to-gold",
    totalSlots: 50,
    remainingSlots: 0, // Fully booked
    nextBatchDate: "December 2025"
  },
  {
    id: "prompt-engineering",
    title: "Prompt Engineering",
    description: "Master the art of crafting effective AI prompts for various AI models and applications.",
    duration: "1 Month",
    icon: Sparkles,
    gradient: "from-gold to-primary",
    totalSlots: 100,
    remainingSlots: 0, // Fully booked
    nextBatchDate: "November 2025"
  }
];

// Memoized Course Card Component for better performance
const CourseCard = memo(({ 
  course, 
  index, 
  onClick 
}: { 
  course: typeof courses[0]; 
  index: number; 
  onClick: () => void;
}) => {
  const slotsPercentage = (course.remainingSlots / course.totalSlots) * 100;
  const isLowStock = slotsPercentage < 30 && slotsPercentage > 0;
  const isFullyBooked = course.remainingSlots === 0;

  return (
    <div
      onClick={onClick}
      className="glass-card rounded-2xl p-8 hover:shadow-glow transition-all duration-300 group animate-fade-in cursor-pointer relative overflow-hidden"
      style={{ 
        animationDelay: `${index * 50}ms`,
        willChange: 'transform, opacity'
      }}
    >
      {isFullyBooked && (
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="destructive" className="font-semibold px-3 py-1">
            FULLY BOOKED
          </Badge>
        </div>
      )}

      <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-all shadow-md`}>
        <course.icon className="w-8 h-8 text-white" />
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
            <span className="text-muted-foreground">
              {isFullyBooked ? "Current Batch" : "Slots Available"}
            </span>
            <span className={`font-semibold ${isFullyBooked ? 'text-destructive' : isLowStock ? 'text-orange-500' : 'text-primary'}`}>
              {isFullyBooked ? 'Full' : `${course.remainingSlots}/${course.totalSlots}`}
            </span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className={`h-full transition-all duration-500 ${
                isFullyBooked ? 'bg-destructive' : 
                isLowStock ? 'bg-orange-500' : 
                'bg-gradient-to-r from-primary to-accent'
              }`}
              style={{ width: isFullyBooked ? '100%' : `${slotsPercentage}%` }}
            />
          </div>
        </div>

        {isFullyBooked && (
          <div className="flex items-center gap-2 text-sm bg-accent/10 px-3 py-2 rounded-lg">
            <Calendar className="w-4 h-4 text-accent" />
            <span className="text-muted-foreground">
              Next Batch: <span className="font-semibold text-accent">{course.nextBatchDate}</span>
            </span>
          </div>
        )}
      </div>
      
      <Button className={`w-full ${isFullyBooked ? 'bg-accent hover:bg-accent-hover' : 'bg-primary hover:bg-primary-hover'} text-white shadow-glow group/btn`}>
        {isFullyBooked ? 'Book Next Batch' : 'View Details'}
        <ArrowLeft className="w-4 h-4 rotate-180 group-hover/btn:translate-x-1 transition-transform ml-2" />
      </Button>
    </div>
  );
});

CourseCard.displayName = 'CourseCard';

export default function BrowseCourses() {
  const [selectedCourse, setSelectedCourse] = useState<typeof courses[0] | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Simulate initial load and prevent layout shift
  useEffect(() => {
    // Small delay to ensure smooth transition
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  const handleCourseClick = (course: typeof courses[0]) => {
    setSelectedCourse(course);
    setDialogOpen(true);
  };

  // Memoize course cards to prevent unnecessary re-renders
  const courseCards = useMemo(() => 
    courses.map((course, index) => (
      <CourseCard
        key={course.id}
        course={course}
        index={index}
        onClick={() => handleCourseClick(course)}
      />
    )),
    []
  );

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center gap-4">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
            <p className="text-muted-foreground">Loading courses...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4 py-12">
        <Link to="/">
          <Button variant="ghost" size="sm" className="mb-8 hover:bg-accent/10">
            <ArrowLeft className="w-4 h-4 mr-2" />
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
          {courseCards}
        </div>
      </div>

      <CourseDialog 
        course={selectedCourse}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  );
}
