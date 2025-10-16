import { Button } from "@/components/ui/button";
import { Lock, PlayCircle, FileText, CheckCircle, Trophy, ArrowRight, Video, Calendar, Clock, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";

interface Module {
  id: number;
  title: string;
  description: string;
  status: "locked" | "available" | "in-progress" | "completed";
  hasVideo: boolean;
  hasQuiz: boolean;
  hasAssessment: boolean;
  hasProject: boolean;
  xp: number;
}

const modules: Module[] = [
  {
    id: 1,
    title: "Introduction & Setup",
    description: "Get started with the fundamentals",
    status: "available",
    hasVideo: true,
    hasQuiz: true,
    hasAssessment: false,
    hasProject: false,
    xp: 100
  },
  {
    id: 2,
    title: "Core Concepts",
    description: "Master the essential concepts",
    status: "locked",
    hasVideo: true,
    hasQuiz: true,
    hasAssessment: true,
    hasProject: false,
    xp: 150
  },
  {
    id: 3,
    title: "Advanced Patterns",
    description: "Deep dive into advanced topics",
    status: "locked",
    hasVideo: true,
    hasQuiz: true,
    hasAssessment: true,
    hasProject: false,
    xp: 200
  },
  {
    id: 4,
    title: "Real-World Projects",
    description: "Build practical applications",
    status: "locked",
    hasVideo: true,
    hasQuiz: false,
    hasAssessment: false,
    hasProject: true,
    xp: 250
  },
  {
    id: 5,
    title: "Best Practices",
    description: "Learn industry standards",
    status: "locked",
    hasVideo: true,
    hasQuiz: true,
    hasAssessment: true,
    hasProject: false,
    xp: 150
  },
  {
    id: 6,
    title: "Testing & Debugging",
    description: "Quality assurance techniques",
    status: "locked",
    hasVideo: true,
    hasQuiz: true,
    hasAssessment: true,
    hasProject: false,
    xp: 200
  },
  {
    id: 7,
    title: "Performance Optimization",
    description: "Optimize your applications",
    status: "locked",
    hasVideo: true,
    hasQuiz: true,
    hasAssessment: true,
    hasProject: false,
    xp: 200
  },
  {
    id: 8,
    title: "Deployment",
    description: "Ship your applications",
    status: "locked",
    hasVideo: true,
    hasQuiz: true,
    hasAssessment: false,
    hasProject: false,
    xp: 150
  },
  {
    id: 9,
    title: "Capstone Project",
    description: "Build your final project",
    status: "locked",
    hasVideo: false,
    hasQuiz: false,
    hasAssessment: true,
    hasProject: true,
    xp: 500
  },
  {
    id: 10,
    title: "Final Assessment",
    description: "Complete your internship",
    status: "locked",
    hasVideo: false,
    hasQuiz: false,
    hasAssessment: true,
    hasProject: false,
    xp: 300
  }
];

export default function DashboardNew() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState({ fullName: "Student", courseType: "Full Stack" });
  const [currentXP, setCurrentXP] = useState(0);
  const totalXP = modules.reduce((sum, m) => sum + m.xp, 0);

  useEffect(() => {
    const registration = localStorage.getItem("userRegistration");
    if (registration) {
      setIsRegistered(true);
      const data = JSON.parse(registration);
      setUserData({ 
        fullName: data.fullName,
        courseType: data.courseType?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || "Full Stack"
      });
      
      // Mock XP for demo
      setCurrentXP(100);
    }
  }, []);

  if (!isRegistered) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="max-w-lg w-full text-center">
          <div className="glass-card rounded-2xl p-8 shadow-glow">
            <Lock className="w-16 h-16 mx-auto mb-6 text-muted-foreground" />
            <h2 className="text-3xl font-display font-bold mb-4">Dashboard Locked</h2>
            <p className="text-muted-foreground mb-8">
              Complete registration to unlock your internship dashboard and start learning.
            </p>
            <Link to="/registration">
              <Button size="lg" className="gradient-primary shadow-glow">
                Complete Registration
                <ArrowRight />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-12">
          <div className="glass-card rounded-2xl p-8 shadow-glow relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 gradient-primary opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl font-display mb-2">Welcome back, {userData.fullName}! 👋</h2>
              <p className="text-muted-foreground mb-6">{userData.courseType} Development Internship</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Overall Progress</span>
                  <span className="text-muted-foreground">{currentXP} / {totalXP} XP</span>
                </div>
                <Progress value={(currentXP / totalXP) * 100} className="h-3" />
              </div>

              <p className="text-sm text-muted-foreground">
                {totalXP - currentXP} XP remaining to complete your internship!
              </p>
            </div>
          </div>
        </section>

        {/* Live Sessions Section */}
        <section className="mb-12">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-display mb-2">Weekly Live Sessions</h3>
              <p className="text-muted-foreground">Join interactive sessions with expert tutors</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            <LiveSessionCard
              status="live"
              title="Advanced React Patterns"
              topic="Custom Hooks & Performance Optimization"
              tutor="Sarah Johnson"
              date="Today"
              time="3:00 PM - 4:30 PM"
              attendees={45}
            />
            <LiveSessionCard
              status="upcoming"
              title="Backend Architecture"
              topic="Microservices & API Design"
              tutor="Mike Chen"
              date="Tomorrow"
              time="2:00 PM - 3:30 PM"
              attendees={32}
            />
            <LiveSessionCard
              status="upcoming"
              title="UI/UX Design Principles"
              topic="Creating Accessible Interfaces"
              tutor="Emma Davis"
              date="Friday"
              time="4:00 PM - 5:30 PM"
              attendees={28}
            />
            <LiveSessionCard
              status="upcoming"
              title="Database Optimization"
              topic="Indexing & Query Performance"
              tutor="David Park"
              date="Saturday"
              time="11:00 AM - 12:30 PM"
              attendees={38}
            />
          </div>
        </section>

        {/* Learning Path */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-display mb-2">Learning Path</h3>
              <p className="text-muted-foreground">Complete modules in sequence to unlock the next one</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {modules.map((module, index) => (
              <ModuleCard key={module.id} module={module} index={index} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

interface LiveSessionCardProps {
  status: "live" | "upcoming";
  title: string;
  topic: string;
  tutor: string;
  date: string;
  time: string;
  attendees: number;
}

function LiveSessionCard({ status, title, topic, tutor, date, time, attendees }: LiveSessionCardProps) {
  const isLive = status === "live";
  
  return (
    <div className="glass-card rounded-2xl p-6 hover:shadow-glow transition-all duration-300 group">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            isLive ? 'bg-destructive/10' : 'bg-primary/10'
          }`}>
            <Video className={`w-6 h-6 ${isLive ? 'text-destructive' : 'text-primary'}`} />
          </div>
          <div>
            <h4 className="text-lg font-display font-bold">{title}</h4>
            <p className="text-sm text-muted-foreground">{topic}</p>
          </div>
        </div>
        <Badge variant={isLive ? "destructive" : "secondary"} className={isLive ? "animate-pulse" : ""}>
          {isLive ? "Live Now" : "Upcoming"}
        </Badge>
      </div>

      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>Tutor: <span className="text-foreground font-medium">{tutor}</span></span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Calendar className="w-4 h-4" />
          <span>{date}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Clock className="w-4 h-4" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Users className="w-4 h-4" />
          <span>{attendees} attendees registered</span>
        </div>
      </div>

      <Button 
        className={`w-full ${isLive ? 'gradient-primary shadow-glow animate-glow-pulse' : 'bg-primary hover:bg-primary-hover text-primary-foreground'}`}
      >
        {isLive ? (
          <>
            <Video className="w-4 h-4" />
            Join Live Session
          </>
        ) : (
          <>
            <Calendar className="w-4 h-4" />
            Register for Session
          </>
        )}
      </Button>
    </div>
  );
}

function ModuleCard({ module, index }: { module: Module; index: number }) {
  const isLocked = module.status === "locked";
  const isCompleted = module.status === "completed";
  
  return (
    <div 
      className={`glass-card rounded-2xl p-6 transition-all duration-300 ${
        isLocked ? 'opacity-60' : 'hover:shadow-glow cursor-pointer'
      } animate-fade-in`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-start gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg ${
            isCompleted ? 'bg-gradient-to-br from-accent to-primary text-white' :
            isLocked ? 'bg-muted text-muted-foreground' :
            'bg-gradient-to-br from-primary to-accent text-white'
          }`}>
            {isLocked ? <Lock className="w-6 h-6" /> : 
             isCompleted ? <CheckCircle className="w-6 h-6" /> :
             module.id}
          </div>
          <div>
            <h4 className="text-xl font-display font-bold mb-1">{module.title}</h4>
            <p className="text-sm text-muted-foreground">{module.description}</p>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 mb-4 flex-wrap">
        {module.hasVideo && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <PlayCircle className="w-4 h-4" />
            Video
          </span>
        )}
        {module.hasQuiz && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <FileText className="w-4 h-4" />
            Quiz
          </span>
        )}
        {module.hasAssessment && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <CheckCircle className="w-4 h-4" />
            Assessment
          </span>
        )}
        {module.hasProject && (
          <span className="flex items-center gap-1 text-xs text-accent font-medium">
            <Trophy className="w-4 h-4" />
            Project
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm font-medium text-gold">+{module.xp} XP</span>
        {!isLocked && !isCompleted && (
          <Link to={`/module/${module.id}`}>
            <Button size="sm" className="gradient-primary">
              {module.status === "in-progress" ? "Continue" : "Start"}
            </Button>
          </Link>
        )}
        {isCompleted && (
          <Link to={`/module/${module.id}`}>
            <Button size="sm" variant="outline">
              Review
            </Button>
          </Link>
        )}
        {module.id === 10 && isCompleted && (
          <Link to="/certificate">
            <Button size="sm" className="gradient-gold shadow-accent-glow">
              <Trophy className="w-4 h-4" />
              Get Certificate
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
