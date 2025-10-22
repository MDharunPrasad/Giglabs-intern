import { ModuleCard } from "@/components/ModuleCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Filter, Calendar, Clock, Award, Users } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { courseModules, getTotalWeekProgress, getCurrentWeek, getWeekStatus, getUserProgress } from "@/data/courseModules";

export default function Modules() {
  const [currentWeek, setCurrentWeek] = useState(1);
  const [selectedWeek, setSelectedWeek] = useState<number | null>(null);

  useEffect(() => {
    setCurrentWeek(getCurrentWeek());
  }, []);

  const weekData = getTotalWeekProgress();
  const totalModules = courseModules.length;
  const completedModules = courseModules.filter(m => m.status === 'completed').length;
  const totalXP = courseModules.reduce((sum, m) => sum + m.xp, 0);
  const earnedXP = courseModules
    .filter(m => m.status === 'completed')
    .reduce((sum, m) => sum + m.xp, 0);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-6 md:py-8">
        {/* Mobile-Optimized Header */}
        <div className="mb-6 md:mb-8">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="text-2xl md:text-4xl font-display mb-2">Backend Development Track</h2>
              <p className="text-muted-foreground text-sm md:text-base">4-week intensive program</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 sm:flex-none">
                <Filter className="w-4 h-4" />
                <span className="hidden sm:inline ml-2">Filter</span>
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile-Optimized Course Overview */}
        <section className="mb-8 md:mb-12">
          <div className="glass-card rounded-2xl p-4 md:p-8 shadow-glow">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
              <div className="text-center md:text-left">
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1 md:mb-2">Progress</h3>
                <p className="text-xl md:text-3xl font-display">{Math.round((completedModules / totalModules) * 100)}%</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">{completedModules} of {totalModules} modules</p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1 md:mb-2">XP Earned</h3>
                <p className="text-xl md:text-3xl font-display">{earnedXP}</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">of {totalXP} total</p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1 md:mb-2">Current Week</h3>
                <p className="text-xl md:text-3xl font-display">Week {currentWeek}</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">4-week program</p>
              </div>
              <div className="text-center md:text-left">
                <h3 className="text-xs md:text-sm font-medium text-muted-foreground mb-1 md:mb-2">Difficulty</h3>
                <p className="text-xl md:text-3xl font-display">Beginner</p>
                <p className="text-xs md:text-sm text-muted-foreground mt-1">No experience required</p>
              </div>
            </div>
          </div>
        </section>

        {/* Week Navigation - Mobile Optimized */}
        <section className="mb-6 md:mb-8">
          <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0">
            {weekData.map((week) => {
              const weekStatus = getWeekStatus(week.week);
              return (
                <button
                  key={week.week}
                  onClick={() => setSelectedWeek(selectedWeek === week.week ? null : week.week)}
                  className={`flex-shrink-0 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    selectedWeek === week.week
                      ? 'bg-primary text-primary-foreground'
                      : weekStatus === 'completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                      : weekStatus === 'in-progress'
                      ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                      : 'bg-muted text-muted-foreground'
                  }`}
                >
                  Week {week.week}
                  <Badge variant="secondary" className="ml-2 text-xs">
                    {week.progress}%
                  </Badge>
                </button>
              );
            })}
          </div>
        </section>

        {/* Weekly Modules - Mobile Optimized */}
        <section className="space-y-6 md:space-y-12">
          {weekData.map((weekData) => {
            const weekStatus = getWeekStatus(weekData.week);
            const weekTitles = {
              1: "Week 1: Foundation",
              2: "Week 2: Application Development", 
              3: "Week 3: Optimization & Deployment",
              4: "Week 4: Final Project & Assessment"
            };
            
            const weekDescriptions = {
              1: "Learn the fundamentals of backend development",
              2: "Build real-world applications and learn best practices",
              3: "Optimize performance and deploy to production",
              4: "Complete your capstone project and final assessment"
            };

            return (
              <div key={weekData.week} className="glass-card rounded-2xl p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 md:mb-6 gap-4">
                  <div>
                    <h3 className="text-xl md:text-2xl font-display font-bold mb-2">
                      {weekTitles[weekData.week as keyof typeof weekTitles]}
                    </h3>
                    <p className="text-muted-foreground text-sm md:text-base">
                      {weekDescriptions[weekData.week as keyof typeof weekDescriptions]}
                    </p>
                  </div>
                  <div className="flex flex-col md:items-end gap-2">
                    <Badge variant={weekStatus === 'completed' ? 'default' : weekStatus === 'in-progress' ? 'secondary' : 'outline'}>
                      {weekStatus === 'completed' ? 'Completed' : weekStatus === 'in-progress' ? 'In Progress' : 'Locked'}
                    </Badge>
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-muted-foreground">{weekData.progress}% Complete</span>
                      <Progress value={weekData.progress} className="h-2 w-20 md:w-32" />
                    </div>
                  </div>
                </div>
                
                {/* Mobile-Optimized Module Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {weekData.modules.map((module, index) => (
                    <MobileModuleCard key={module.id} module={module} index={index} />
                  ))}
                </div>
              </div>
            );
          })}
        </section>
      </div>
    </div>
  );
}

function MobileModuleCard({ module, index }: { module: any; index: number }) {
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
        <div className="flex items-start gap-3 flex-1">
          <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0 ${
            isCompleted ? 'bg-gradient-to-br from-accent to-primary text-white' :
            isLocked ? 'bg-muted text-muted-foreground' :
            'bg-gradient-to-br from-primary to-accent text-white'
          }`}>
            {isLocked ? <Calendar className="w-4 h-4" /> : 
             isCompleted ? <Award className="w-4 h-4" /> :
             module.id}
          </div>
          <div className="min-w-0 flex-1">
            <h5 className="text-base md:text-lg font-display font-bold mb-1 truncate">{module.title}</h5>
            <p className="text-xs text-muted-foreground line-clamp-2">{module.description}</p>
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
            <Calendar className="w-3 h-3" />
            Video
          </span>
        )}
        {module.hasQuiz && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Users className="w-3 h-3" />
            Quiz
          </span>
        )}
        {module.hasAssessment && (
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Award className="w-3 h-3" />
            Assessment
          </span>
        )}
        {module.hasProject && (
          <span className="flex items-center gap-1 text-xs text-accent font-medium">
            <Award className="w-3 h-3" />
            Project
          </span>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-gold">+{module.xp} XP</span>
          <span className="text-xs text-muted-foreground">{module.estimatedTime}</span>
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
              <Award className="w-3 h-3" />
              Certificate
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
