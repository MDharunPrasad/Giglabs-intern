import { StatCard } from "@/components/StatCard";
import { ModuleCard } from "@/components/ModuleCard";
import { AchievementBadge } from "@/components/AchievementBadge";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { BookOpen, Award, Zap, Clock, Users, Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <section className="mb-12">
          <div className="bg-card rounded-lg p-8 shadow-md border-2 border-primary relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 gradient-primary opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10">
              <h2 className="text-3xl font-display mb-2">Welcome back, John! 🎉</h2>
              <p className="text-muted-foreground mb-6">You're on level 5 with 2,450 XP</p>
              
              <div className="mb-4">
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium">Level 5</span>
                  <span className="text-muted-foreground">2,450 / 3,000 XP</span>
                </div>
                <ProgressBar value={2450} max={3000} variant="gold" size="lg" />
              </div>

              <p className="text-sm text-muted-foreground">
                550 XP until Level 6! Complete 2 more modules to level up.
              </p>
            </div>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard 
              title="Courses In Progress"
              value="3"
              icon={BookOpen}
              variant="primary"
            />
            <StatCard 
              title="Courses Completed"
              value="12"
              icon={Award}
              variant="accent"
              trend={{ value: 20, label: "this month" }}
            />
            <StatCard 
              title="Total XP Earned"
              value="2,450"
              icon={Zap}
              variant="gold"
            />
            <StatCard 
              title="Study Streak"
              value="7 days"
              icon={Clock}
              variant="default"
            />
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Continue Learning */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-display">Continue Learning</h3>
                <Link to="/modules">
                  <Button variant="ghost" size="sm">
                    View All
                    <ArrowRight className="w-4 h-4" />
                  </Button>
                </Link>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <ModuleCard 
                  title="React Fundamentals"
                  description="Master the basics of React"
                  status="in-progress"
                  progress={65}
                  moduleNumber={1}
                />
                <ModuleCard 
                  title="TypeScript Deep Dive"
                  description="Advanced TypeScript patterns"
                  status="in-progress"
                  progress={30}
                  moduleNumber={2}
                />
              </div>
            </section>

            {/* Upcoming Live Class */}
            <section>
              <h3 className="text-2xl font-display mb-6">Upcoming Live Class</h3>
              <div className="bg-accent/10 border-2 border-accent rounded-lg p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-xl font-display mb-2">Advanced React Patterns</h4>
                    <p className="text-muted-foreground">with Sarah Johnson</p>
                  </div>
                  <div className="bg-accent text-accent-foreground px-3 py-1 rounded-lg text-sm font-semibold">
                    Live
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    <span>Today, 3:00 PM</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    <span>2 hours</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    <span>45 students</span>
                  </div>
                </div>
                <Button variant="accent" className="w-full md:w-auto">
                  Join Class
                </Button>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Recent Badges */}
            <section>
              <h3 className="text-xl font-display mb-6">Recent Achievements</h3>
              <div className="bg-card rounded-lg p-6 shadow-md">
                <div className="grid grid-cols-3 gap-4">
                  <AchievementBadge title="First Module" icon="star" variant="gold" size="sm" />
                  <AchievementBadge title="Fast Learner" icon="zap" variant="accent" size="sm" />
                  <AchievementBadge title="Perfect Score" icon="trophy" variant="primary" size="sm" />
                  <AchievementBadge title="Consistent" icon="shield" variant="primary" size="sm" />
                  <AchievementBadge title="Top 10" icon="crown" variant="gold" size="sm" />
                  <AchievementBadge title="Team Player" icon="award" variant="accent" size="sm" earned={false} />
                </div>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="w-full mt-4">
                    View All Badges
                  </Button>
                </Link>
              </div>
            </section>

            {/* Leaderboard Snippet */}
            <section>
              <h3 className="text-xl font-display mb-6">Leaderboard</h3>
              <div className="bg-card rounded-lg p-6 shadow-md space-y-4">
                <LeaderboardItem rank={1} name="Emma Chen" xp="3,890" avatar="EC" isUser={false} />
                <LeaderboardItem rank={2} name="You" xp="2,450" avatar="JD" isUser={true} />
                <LeaderboardItem rank={3} name="Mike Ross" xp="2,340" avatar="MR" isUser={false} />
                <Button variant="ghost" size="sm" className="w-full mt-2">
                  View Full Leaderboard
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
  );
}

function LeaderboardItem({ rank, name, xp, avatar, isUser }: { rank: number; name: string; xp: string; avatar: string; isUser: boolean }) {
  return (
    <div className={`flex items-center gap-4 p-3 rounded-lg transition-base ${isUser ? 'bg-primary/10 border-2 border-primary' : 'bg-secondary'}`}>
      <div className="text-lg font-display font-bold w-8 text-center">
        {rank === 1 ? "🥇" : rank === 2 ? "🥈" : rank === 3 ? "🥉" : rank}
      </div>
      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${isUser ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
        {avatar}
      </div>
      <div className="flex-1">
        <p className="font-medium">{name}</p>
        <p className="text-sm text-muted-foreground">{xp} XP</p>
      </div>
    </div>
  );
}
