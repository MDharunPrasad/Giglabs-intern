import { Button } from "@/components/ui/button";
import { Lock, PlayCircle, FileText, CheckCircle, Trophy, ArrowRight, Video, Calendar, Clock, Users, Award, Star, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RewardsSection } from "@/components/RewardsSection";
import { courseModules, getUserProgress, getCompletedModules, getAvailableModules, updateModuleStatus, getTotalWeekProgress, getCurrentWeek, getWeekStatus } from "@/data/courseModules";

export default function DashboardNew() {
  const [isRegistered, setIsRegistered] = useState(false);
  const [userData, setUserData] = useState({ fullName: "Student", courseType: "Full Stack" });
  const [currentXP, setCurrentXP] = useState(0);
  const [modules, setModules] = useState(courseModules);
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
      
      // Initialize module statuses based on progress
      initializeModuleStatuses();
      
      // Calculate current XP from completed modules
      const progress = getUserProgress();
      const completedModules = getCompletedModules();
      const earnedXP = completedModules.reduce((sum, moduleId) => {
        const module = modules.find(m => m.id === moduleId);
        return sum + (module?.xp || 0);
      }, 0);
      setCurrentXP(earnedXP);
    }
  }, []);

  const initializeModuleStatuses = () => {
    const completedModules = getCompletedModules();
    const availableModules = getAvailableModules();
    
    const updatedModules = modules.map(module => {
      if (completedModules.includes(module.id)) {
        return { ...module, status: 'completed' as const };
      } else if (availableModules.includes(module.id)) {
        return { ...module, status: 'available' as const };
      } else {
        return { ...module, status: 'locked' as const };
      }
    });
    
    setModules(updatedModules);
  };

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

        {/* Learning Path - Weekly Structure */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-3xl font-display mb-2">4-Week Learning Path</h3>
              <p className="text-muted-foreground">Complete modules week by week to master backend development</p>
            </div>
          </div>

          <div className="space-y-8 max-w-6xl mx-auto">
            {getTotalWeekProgress().map((weekData) => (
              <WeekSection key={weekData.week} weekData={weekData} />
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
        <Badge variant={isLive ? "default" : "secondary"} className={isLive ? "bg-green-600 text-white animate-pulse" : ""}>
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

      {isLive ? (
        <a 
          href="https://meet.google.com/gbf-tspc-axk" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full"
        >
          <Button 
            className="w-full bg-green-600 hover:bg-green-700 text-white shadow-glow animate-glow-pulse"
          >
            <Video className="w-4 h-4" />
            Join Live Session
          </Button>
        </a>
      ) : (
        <Button 
          className="w-full bg-muted text-muted-foreground cursor-not-allowed"
          disabled={true}
        >
          <Calendar className="w-4 h-4" />
          Upcoming Session
        </Button>
      )}
    </div>
  );
}

interface WeekSectionProps {
  weekData: {
    week: number;
    progress: number;
    modules: any[];
  };
}

function WeekSection({ weekData }: WeekSectionProps) {
  const weekStatus = getWeekStatus(weekData.week);
            const weekTitles = {
              1: "Week 1: Foundation",
              2: "Week 2: Application Development", 
              3: "Week 3: Optimization & Deployment",
              4: "Week 4: Final Project & Assessment",
              5: "Certificate of Completion"
            };
            
            const weekDescriptions = {
              1: "Learn the fundamentals of backend development",
              2: "Build real-world applications and learn best practices",
              3: "Optimize performance and deploy to production",
              4: "Complete your capstone project and final assessment",
              5: "Claim your Backend Development Certificate"
            };

  return (
    <div className="glass-card rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h4 className="text-2xl font-display font-bold mb-2">{weekTitles[weekData.week as keyof typeof weekTitles]}</h4>
          <p className="text-muted-foreground">{weekDescriptions[weekData.week as keyof typeof weekDescriptions]}</p>
        </div>
        <div className="text-right">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant={weekStatus === 'completed' ? 'default' : weekStatus === 'in-progress' ? 'secondary' : 'outline'}>
              {weekStatus === 'completed' ? 'Completed' : weekStatus === 'in-progress' ? 'In Progress' : 'Locked'}
            </Badge>
            <span className="text-sm text-muted-foreground">{weekData.progress}% Complete</span>
          </div>
          <Progress value={weekData.progress} className="h-2 w-32" />
        </div>
      </div>
      
      {weekData.week === 5 ? (
        <div className="space-y-8">
          <div className="flex justify-center">
            <div className="w-full max-w-2xl">
              {weekData.modules.map((module, index) => (
                <CertificateModuleCard key={module.id} module={module} index={index} />
              ))}
            </div>
          </div>
          
          {/* Rewards Section - Always show for Week 5 */}
          <div className="mt-8">
            <RewardsSection 
              isCompleted={weekData.progress === 100}
              courseType="Backend Development"
              userName="Student"
            />
          </div>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {weekData.modules.map((module, index) => (
            <ModuleCard key={module.id} module={module} index={index} />
          ))}
        </div>
      )}
    </div>
  );
}

function ModuleCard({ module, index }: { module: any; index: number }) {
  const isLocked = module.status === "locked";
  const isCompleted = module.status === "completed";
  const isInProgress = module.status === "in-progress";
  const progress = getUserProgress()[module.id] || 0;
  
  return (
    <div 
      className={`glass-card rounded-xl p-4 transition-all duration-300 ${
        isLocked ? 'opacity-60' : 'hover:shadow-glow cursor-pointer'
      } animate-fade-in`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-start gap-3">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm ${
            isCompleted ? 'bg-gradient-to-br from-accent to-primary text-white' :
            isLocked ? 'bg-muted text-muted-foreground' :
            'bg-gradient-to-br from-primary to-accent text-white'
          }`}>
            {isLocked ? <Lock className="w-4 h-4" /> : 
             isCompleted ? <CheckCircle className="w-4 h-4" /> :
             module.id}
          </div>
          <div>
            <h5 className="text-lg font-display font-bold mb-1">{module.title}</h5>
            <p className="text-xs text-muted-foreground">{module.description}</p>
            {isInProgress && (
              <div className="mt-2">
                <div className="flex justify-between text-xs mb-1">
                  <span>Progress</span>
                  <span>{progress}%</span>
                </div>
                <Progress value={progress} className="h-1" />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2 mb-3 flex-wrap">
        {module.hasVideo && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <PlayCircle className="w-3 h-3" />
            Video
          </span>
        )}
        {module.hasQuiz && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <FileText className="w-3 h-3" />
            Quiz
          </span>
        )}
        {module.hasAssessment && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <CheckCircle className="w-3 h-3" />
            Assessment
          </span>
        )}
        {module.hasProject && (
          <span className="flex items-center gap-1 text-xs text-accent font-medium">
            <Trophy className="w-3 h-3" />
            Project
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gold">+{module.xp} XP</span>
        </div>
        {!isLocked && !isCompleted && (
          <Link to={`/module/${module.id}`}>
            <Button size="sm" className="gradient-primary text-xs px-3 py-1">
              {isInProgress ? "Continue" : "Start"}
            </Button>
          </Link>
        )}
        {isCompleted && (
          <Link to={`/module/${module.id}`}>
            <Button size="sm" variant="outline" className="text-xs px-3 py-1">
              Review
            </Button>
          </Link>
        )}
        {module.id === 10 && isCompleted && (
          <Link to="/certificate">
            <Button size="sm" className="gradient-gold shadow-accent-glow text-xs px-3 py-1">
              <Trophy className="w-3 h-3" />
              Certificate
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}

function CertificateModuleCard({ module, index }: { module: any; index: number }) {
  const isLocked = module.status === "locked";
  const isCompleted = module.status === "completed";
  const isAvailable = module.status === "available";
  const completedModules = getCompletedModules().length;
  const totalModules = 10; // Total modules before certificate
  const overallProgress = Math.round((completedModules / totalModules) * 100);
  
  return (
    <div 
      className={`glass-card rounded-xl p-8 transition-all duration-300 ${
        isLocked ? 'opacity-60' : 'hover:shadow-glow cursor-pointer'
      } animate-fade-in relative overflow-hidden`}
      style={{ animationDelay: `${index * 50}ms` }}
    >
      {/* Animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/10 via-orange-400/10 to-red-400/10 animate-pulse" />
      
      {/* Sparkle animations */}
      <div className="absolute top-2 right-2">
        <Sparkles className="w-4 h-4 text-yellow-500 animate-bounce" />
      </div>
      <div className="absolute top-4 right-6">
        <Star className="w-3 h-3 text-orange-500 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
      <div className="absolute top-6 right-3">
        <Sparkles className="w-3 h-3 text-red-500 animate-bounce" style={{ animationDelay: '1s' }} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <div className={`w-16 h-16 rounded-lg flex items-center justify-center font-bold text-xl ${
              isCompleted ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white' :
              isLocked ? 'bg-muted text-muted-foreground' :
              'bg-gradient-to-br from-yellow-400 to-orange-500 text-white animate-pulse'
            }`}>
              {isLocked ? <Lock className="w-8 h-8" /> : 
             isCompleted ? <Trophy className="w-8 h-8" /> :
             <Award className="w-8 h-8" />}
            </div>
            <div>
              <h5 className="text-2xl font-display font-bold mb-2 text-gradient bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
                {module.title}
              </h5>
              <p className="text-base text-muted-foreground">{module.description}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="flex justify-between text-sm mb-2">
                <span className="font-medium">Overall Progress</span>
                <span className="text-muted-foreground">{completedModules}/{totalModules}</span>
              </div>
              <div className="relative w-48">
                <Progress value={overallProgress} className="h-3 bg-muted" />
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 animate-pulse" />
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                {overallProgress}% Complete
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="text-lg font-medium text-gold">+{module.xp} XP</span>
            <Badge variant="secondary" className="text-sm px-3 py-1">
              <Trophy className="w-4 h-4 mr-2" />
              Certificate
            </Badge>
          </div>
          {!isLocked && (
            <Link to="/certificate">
              <Button 
                size="lg" 
                className={`px-6 py-3 ${
                  isCompleted 
                    ? 'bg-green-600 hover:bg-green-700 text-white' 
                    : 'gradient-primary animate-pulse'
                }`}
              >
                {isCompleted ? (
                  <>
                    <Trophy className="w-5 h-5 mr-2" />
                    View Certificate
                  </>
                ) : (
                  <>
                    <Award className="w-5 h-5 mr-2" />
                    Claim Certificate
                  </>
                )}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
