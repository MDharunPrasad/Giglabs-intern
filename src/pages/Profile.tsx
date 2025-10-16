import { AchievementBadge } from "@/components/AchievementBadge";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Clock, Download, Share2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";

export default function Profile() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="mb-6">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        {/* Profile Header */}
        <section className="mb-12">
          <div className="bg-card rounded-lg p-8 shadow-md relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 gradient-primary opacity-10 rounded-full -translate-y-1/2 translate-x-1/2" />
            
            <div className="relative z-10 flex flex-col md:flex-row items-start gap-8">
              <div className="w-32 h-32 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-5xl font-display shadow-lg">
                JD
              </div>
              
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h2 className="text-4xl font-display mb-2">John Doe</h2>
                    <p className="text-muted-foreground">john.doe@email.com</p>
                  </div>
                  <Button variant="outline">Edit Profile</Button>
                </div>

                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Current Level</p>
                    <p className="text-3xl font-display">Level 5</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Total XP</p>
                    <p className="text-3xl font-display">2,450</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Study Streak</p>
                    <p className="text-3xl font-display">7 days 🔥</p>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="font-medium">Progress to Level 6</span>
                    <span className="text-muted-foreground">2,450 / 3,000 XP</span>
                  </div>
                  <ProgressBar value={2450} max={3000} variant="gold" size="lg" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Learning Domains */}
            <section>
              <h3 className="text-2xl font-display mb-6">Learning Domains</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <DomainCard 
                  title="Full-Stack Development"
                  progress={35}
                  courses={20}
                  status="active"
                />
                <DomainCard 
                  title="AI & Machine Learning"
                  progress={0}
                  courses={15}
                  status="not-started"
                />
              </div>
            </section>

            {/* Completed Courses */}
            <section>
              <h3 className="text-2xl font-display mb-6">Completed Courses</h3>
              <div className="bg-card rounded-lg shadow-md overflow-hidden">
                <div className="divide-y divide-border">
                  <CourseItem 
                    title="Web Development Basics"
                    date="Jan 15, 2024"
                    score={95}
                  />
                  <CourseItem 
                    title="Git & GitHub"
                    date="Jan 8, 2024"
                    score={98}
                  />
                  <CourseItem 
                    title="Command Line Basics"
                    date="Dec 28, 2023"
                    score={92}
                  />
                </div>
              </div>
            </section>

            {/* Certificates */}
            <section>
              <h3 className="text-2xl font-display mb-6">Certificates</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <CertificateCard 
                  title="Web Development Basics"
                  date="Jan 15, 2024"
                  id="CERT-WDB-2024-001"
                />
                <CertificateCard 
                  title="Git & GitHub Essentials"
                  date="Jan 8, 2024"
                  id="CERT-GIT-2024-002"
                />
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Achievement Showcase */}
            <section>
              <h3 className="text-xl font-display mb-6">Achievement Showcase</h3>
              <div className="bg-card rounded-lg p-6 shadow-md">
                <div className="grid grid-cols-3 gap-6 mb-6">
                  <AchievementBadge title="First Module" icon="star" variant="gold" />
                  <AchievementBadge title="Fast Learner" icon="zap" variant="accent" />
                  <AchievementBadge title="Perfect Score" icon="trophy" variant="primary" />
                </div>
                <div className="text-center pt-4 border-t border-border">
                  <p className="text-2xl font-display mb-1">24</p>
                  <p className="text-sm text-muted-foreground">Total Badges Earned</p>
                </div>
              </div>
            </section>

            {/* All Achievements */}
            <section>
              <h3 className="text-xl font-display mb-6">All Achievements</h3>
              <div className="bg-card rounded-lg p-6 shadow-md">
                <div className="grid grid-cols-3 gap-4">
                  <AchievementBadge title="First Module" icon="star" variant="gold" size="sm" />
                  <AchievementBadge title="Fast Learner" icon="zap" variant="accent" size="sm" />
                  <AchievementBadge title="Perfect Score" icon="trophy" variant="primary" size="sm" />
                  <AchievementBadge title="Consistent" icon="shield" variant="primary" size="sm" />
                  <AchievementBadge title="Top 10" icon="crown" variant="gold" size="sm" />
                  <AchievementBadge title="Week Streak" icon="award" variant="accent" size="sm" />
                  <AchievementBadge title="Early Bird" icon="star" variant="primary" size="sm" />
                  <AchievementBadge title="Night Owl" icon="star" variant="primary" size="sm" />
                  <AchievementBadge title="Team Player" icon="award" variant="accent" size="sm" earned={false} />
                </div>
              </div>
            </section>

            {/* Stats */}
            <section>
              <h3 className="text-xl font-display mb-6">Learning Stats</h3>
              <div className="bg-card rounded-lg p-6 shadow-md space-y-4">
                <StatItem icon={BookOpen} label="Courses Completed" value="12" />
                <StatItem icon={Clock} label="Hours Learned" value="45" />
                <StatItem icon={Award} label="Certificates Earned" value="3" />
              </div>
            </section>
          </div>
        </div>
      </div>
      
      <Footer />
      <Chatbot />
    </div>
  );
}

function DomainCard({ title, progress, courses, status }: { title: string; progress: number; courses: number; status: "active" | "not-started" }) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-md border-2 border-border hover:border-primary transition-base">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h4 className="text-xl font-display mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground">{courses} courses</p>
        </div>
        {status === "active" && (
          <span className="bg-accent text-accent-foreground px-2 py-1 rounded text-xs font-semibold">
            Active
          </span>
        )}
      </div>
      <ProgressBar value={progress} showLabel />
    </div>
  );
}

function CourseItem({ title, date, score }: { title: string; date: string; score: number }) {
  return (
    <div className="p-4 hover:bg-secondary/50 transition-base">
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground">{date}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-display text-accent">{score}%</p>
          <p className="text-xs text-muted-foreground">Score</p>
        </div>
      </div>
    </div>
  );
}

function CertificateCard({ title, date, id }: { title: string; date: string; id: string }) {
  return (
    <div className="bg-card rounded-lg p-6 shadow-md border-2 border-gold hover:shadow-lg transition-base">
      <div className="flex items-start gap-4 mb-4">
        <div className="bg-gold/10 p-3 rounded-lg">
          <Award className="w-8 h-8 text-gold" />
        </div>
        <div className="flex-1">
          <h4 className="font-display mb-1">{title}</h4>
          <p className="text-sm text-muted-foreground">{date}</p>
          <p className="text-xs text-muted-foreground mt-1">{id}</p>
        </div>
      </div>
      <div className="flex gap-2">
        <Button variant="outline" size="sm" className="flex-1">
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button variant="ghost" size="sm" className="flex-1">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
      </div>
    </div>
  );
}

function StatItem({ icon: Icon, label, value }: { icon: any; label: string; value: string }) {
  return (
    <div className="flex items-center gap-4">
      <div className="bg-primary/10 p-3 rounded-lg">
        <Icon className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-muted-foreground">{label}</p>
        <p className="text-xl font-display">{value}</p>
      </div>
    </div>
  );
}
