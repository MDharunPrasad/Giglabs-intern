import { AchievementBadge } from "@/components/AchievementBadge";
import { ProgressBar } from "@/components/ProgressBar";
import { Button } from "@/components/ui/button";
import { Award, BookOpen, Clock, Download, Share2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export default function Profile() {
  return (
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

            {/* Certificates & Badges */}
            <section>
              <h3 className="text-2xl font-display mb-6">Certificates & Completion Badges</h3>
              
              {/* Course Certificates */}
              <div className="mb-8">
                <h4 className="text-lg font-display mb-4 text-muted-foreground">Course Certificates</h4>
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
              </div>

              {/* Domain Completion Badges - Showcase when earned */}
              <div>
                <h4 className="text-lg font-display mb-4 text-muted-foreground">Domain Completion Badges</h4>
                <div className="bg-card rounded-lg p-8 shadow-md">
                  <p className="text-center text-muted-foreground mb-4">
                    Complete all courses in a domain to earn the exclusive Domain Master badge!
                  </p>
                  <div className="grid grid-cols-2 gap-8">
                    <div className="flex flex-col items-center">
                      <AchievementBadge 
                        title="Domain Master" 
                        domain="fullstack" 
                        earned={false}
                        size="lg"
                        showShare={false}
                      />
                      <p className="text-sm text-muted-foreground mt-2">7/20 courses</p>
                    </div>
                    <div className="flex flex-col items-center">
                      <AchievementBadge 
                        title="Domain Master" 
                        domain="ai-ml" 
                        earned={false}
                        size="lg"
                        showShare={false}
                      />
                      <p className="text-sm text-muted-foreground mt-2">0/15 courses</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Domain Completion Badges */}
            <section>
              <h3 className="text-xl font-display mb-6">Domain Completion Badges</h3>
              <div className="bg-card rounded-lg p-6 shadow-md">
                <div className="grid grid-cols-2 gap-8 mb-6">
                  <AchievementBadge 
                    title="Domain Master" 
                    domain="fullstack" 
                    earned={false}
                    size="md"
                  />
                  <AchievementBadge 
                    title="Domain Master" 
                    domain="ai-ml" 
                    earned={false}
                    size="md"
                  />
                </div>
                <div className="text-center pt-4 border-t border-border">
                  <p className="text-2xl font-display mb-1">0/2</p>
                  <p className="text-sm text-muted-foreground">Domains Completed</p>
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
  const handleDownload = () => {
    // Generate certificate URL and download
    const certificateUrl = `/certificates/${id}.pdf`;
    const link = document.createElement('a');
    link.href = certificateUrl;
    link.download = `${title.replace(/\s+/g, '-')}-Certificate.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleShare = async () => {
    const shareData = {
      title: `${title} Certificate`,
      text: `I've completed ${title} and earned my certificate! 🎓`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(
          `${shareData.text} ${shareData.url}`
        );
        alert('Certificate link copied to clipboard!');
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        console.error('Error sharing:', error);
      }
    }
  };

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
        <Button 
          variant="outline" 
          size="sm" 
          className="flex-1 gap-2"
          onClick={handleDownload}
        >
          <Download className="w-4 h-4" />
          Download
        </Button>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex-1 gap-2"
          onClick={handleShare}
        >
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
