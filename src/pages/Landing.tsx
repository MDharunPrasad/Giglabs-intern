import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Award, Zap, Target, TrendingUp, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import heroImage from "@/assets/hero-bg.jpg";
import { Testimonials } from "@/components/Testimonials";
import { CompanyLogos } from "@/components/CompanyLogos";

export default function Landing() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0 opacity-30"
          style={{
            backgroundImage: `url(${heroImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background z-0" />
        
        <div className="container relative z-10 mx-auto px-4 py-20">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-display mb-6 leading-tight">
              Learn, Intern, <span className="bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent font-extrabold" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.3)', filter: 'drop-shadow(0 0 8px rgba(255,255,255,0.2))' }}>Earn Your Skills</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto font-semibold" style={{ color: 'hsl(var(--foreground))', textShadow: '0 1px 4px rgba(0,0,0,0.2)' }}>
              Transform your learning journey with our gamified internship platform. 
              Master real-world skills with hands-on projects and earn industry-recognized certificates.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/registration">
                <Button size="lg" className="gradient-primary shadow-glow group">
                  Register Now
                  <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center gap-8 text-base font-semibold bg-background/80 backdrop-blur-sm px-8 py-4 rounded-2xl border border-border/50 shadow-lg">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-primary" />
                <span className="text-foreground">5,000+ Students</span>
              </div>
              <div className="flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-primary" />
                <span className="text-foreground">100+ Courses</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-primary" />
                <span className="text-foreground">95% Success Rate</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display mb-4">Why Choose GigLabs?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience internship-based learning with gamification and real-world projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <FeatureCard 
              icon={<Zap className="w-8 h-8" />}
              title="Gamified Learning"
              description="Earn XP, unlock badges, and level up as you progress through courses"
            />
            <FeatureCard 
              icon={<Users className="w-8 h-8" />}
              title="Expert Tutors"
              description="Learn from industry professionals with real-world experience"
            />
            <FeatureCard 
              icon={<BookOpen className="w-8 h-8" />}
              title="Hands-on Projects"
              description="Build real projects and add them to your portfolio"
            />
            <FeatureCard 
              icon={<Award className="w-8 h-8" />}
              title="Certification"
              description="Get recognized certificates upon course completion"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-display mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your journey from registration to employment in 3 simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <ProcessCard 
              step="1"
              icon={<Target className="w-8 h-8" />}
              title="Choose & Register"
              description="Browse our courses, check available slots, and register for your chosen program"
            />
            <ProcessCard 
              step="2"
              icon={<TrendingUp className="w-8 h-8" />}
              title="Learn & Build"
              description="Complete modules, work on real projects, earn badges and level up your skills"
            />
            <ProcessCard 
              step="3"
              icon={<Shield className="w-8 h-8" />}
              title="Get Certified"
              description="Receive industry-recognized certificates and get placement support"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto text-center">
            <StatCard number="5000+" label="Active Students" />
            <StatCard number="100+" label="Expert Tutors" />
            <StatCard number="50+" label="Course Modules" />
            <StatCard number="95%" label="Success Rate" />
          </div>
        </div>
      </section>

      {/* Company Logos */}
      <CompanyLogos />

      {/* Testimonials */}
      <Testimonials />

      {/* CTA Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 gradient-primary opacity-10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-display mb-6">Ready to Start Your Internship?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join thousands of students gaining real-world experience
            </p>
            <Link to="/registration">
              <Button size="lg" className="gradient-primary shadow-glow group">
                Register Now
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="glass-card rounded-2xl p-6 hover:shadow-glow transition-all duration-300 group will-change-transform">
      <div className="bg-gradient-to-br from-primary to-accent w-16 h-16 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform will-change-transform">
        {icon}
      </div>
      <h3 className="text-xl font-display mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function ProcessCard({ step, icon, title, description }: { step: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="relative glass-card rounded-2xl p-6 hover:shadow-glow transition-all duration-300 will-change-transform">
      <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg">
        {step}
      </div>
      <div className="bg-gradient-to-br from-primary/10 to-accent/10 w-16 h-16 rounded-xl flex items-center justify-center mb-4 text-primary will-change-transform">
        {icon}
      </div>
      <h3 className="text-xl font-display mb-2 font-semibold">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </div>
  );
}

function StatCard({ number, label }: { number: string; label: string }) {
  return (
    <div className="p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
      <div className="text-4xl md:text-5xl font-display font-bold text-primary mb-2">
        {number}
      </div>
      <p className="text-muted-foreground font-medium">{label}</p>
    </div>
  );
}
