import { Button } from "@/components/ui/button";
import { ArrowRight, BookOpen, Users, Award, Zap, Target, TrendingUp, Shield, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { Testimonials } from "@/components/Testimonials";
import { CompanyLogos } from "@/components/CompanyLogos";
import { ShaderBackground } from "@/components/ui/hero-shader";

export default function Landing() {
  return (
    <>
      {/* Hero Section with Shader Background */}
      <ShaderBackground height="min-h-[70vh]">
        <div className="relative z-20 h-full">
          {/* Hero Content - Positioned Lower */}
          <div className="container mx-auto px-4 h-full flex items-end pb-8 md:pb-12 lg:pb-16 pt-20">
            <div className="max-w-4xl mx-auto text-center md:text-left">
              {/* Badge */}
              <div className="inline-flex items-center px-3 py-1.5 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md mb-4 md:mb-6 border border-white/20 dark:border-white/10">
                <Sparkles className="w-3.5 h-3.5 text-white/90 dark:text-white/80 mr-2" />
                <span className="text-white/90 dark:text-white/80 text-xs md:text-sm font-light">New: AI-Powered Learning Paths</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl leading-tight tracking-tight text-white dark:text-white mb-4 md:mb-6">
                <span className="font-light italic">Master</span> Real-World
                <br />
                <span className="font-bold">Tech Skills</span>
              </h1>

              {/* Description */}
              <p className="text-sm md:text-base lg:text-lg font-light text-white/80 dark:text-white/70 mb-6 md:mb-8 leading-relaxed max-w-2xl mx-auto md:mx-0">
                Transform your learning journey with our gamified internship platform. 
                Gain hands-on experience, earn industry-recognized certificates, and unlock your potential.
              </p>

              {/* Trust Signals */}
              <div className="flex flex-wrap justify-center md:justify-start gap-4 md:gap-6 mb-6 md:mb-8 text-xs md:text-sm text-white/70 dark:text-white/60">
                <div className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  <span>5,000+ Students</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4" />
                  <span>100+ Courses</span>
                </div>
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4" />
                  <span>95% Success Rate</span>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-3 md:gap-4">
                <Link to="/browse-courses">
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="w-full sm:w-auto bg-transparent border-white/30 dark:border-white/20 text-white hover:bg-white/10 dark:hover:bg-white/5 hover:border-white/50 dark:hover:border-white/30 backdrop-blur-sm"
                  >
                    Browse Courses
                  </Button>
                </Link>
                <Link to="/registration">
                  <Button 
                    size="lg"
                    className="w-full sm:w-auto bg-white dark:bg-white text-black dark:text-black hover:bg-white/90 dark:hover:bg-white/90 shadow-lg hover:shadow-xl group"
                  >
                    Get Started
                    <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </ShaderBackground>

      {/* Features Section - Enhanced Design */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-card/30 to-accent/5 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 backdrop-blur-sm mb-4">
              <Sparkles className="w-4 h-4 text-primary mr-2" />
              <span className="text-primary font-medium text-sm">Why Choose Us</span>
            </div>
            <h2 className="text-4xl font-display mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              Why Choose GigLabs?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience internship-based learning with gamification and real-world projects
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <EnhancedFeatureCard 
              icon={<Zap className="w-8 h-8" />}
              title="Gamified Learning"
              description="Earn XP, unlock badges, and level up as you progress through courses"
              color="from-primary to-accent"
              bgColor="bg-card/50 dark:bg-card/30"
            />
            <EnhancedFeatureCard 
              icon={<Users className="w-8 h-8" />}
              title="Expert Tutors"
              description="Learn from industry professionals with real-world experience"
              color="from-primary to-accent"
              bgColor="bg-card/50 dark:bg-card/30"
            />
            <EnhancedFeatureCard 
              icon={<BookOpen className="w-8 h-8" />}
              title="Hands-on Projects"
              description="Build real projects and add them to your portfolio"
              color="from-primary to-accent"
              bgColor="bg-card/50 dark:bg-card/30"
            />
            <EnhancedFeatureCard 
              icon={<Award className="w-8 h-8" />}
              title="Certification"
              description="Get recognized certificates upon course completion"
              color="from-primary to-accent"
              bgColor="bg-card/50 dark:bg-card/30"
            />
          </div>
        </div>
      </section>

      {/* How It Works - Timeline Design */}
      <section className="py-24 bg-background relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 rounded-full border border-border bg-card mb-6">
              <TrendingUp className="w-4 h-4 text-muted-foreground mr-2" />
              <span className="text-muted-foreground font-medium text-sm">Process</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display mb-6">How It Works</h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Your journey from registration to employment in 3 simple steps
            </p>
          </div>

          {/* Timeline Container */}
          <div className="max-w-6xl mx-auto">
            {/* Desktop Timeline */}
            <div className="hidden md:block relative">
              {/* Timeline Line */}
              <div className="absolute top-1/2 left-0 right-0 h-1 bg-gradient-to-r from-primary via-accent to-primary transform -translate-y-1/2 rounded-full opacity-20" />
              <div className="absolute top-1/2 left-0 w-1/3 h-1 bg-gradient-to-r from-primary to-accent transform -translate-y-1/2 rounded-full animate-pulse" />
              
              <div className="grid grid-cols-3 gap-12">
                <TimelineCard 
                  step="1"
                  icon={<Target className="w-8 h-8" />}
                  title="Choose & Register"
                  description="Browse our courses, check available slots, and register for your chosen program"
                  position="top"
                />
                <TimelineCard 
                  step="2"
                  icon={<TrendingUp className="w-8 h-8" />}
                  title="Learn & Build"
                  description="Complete modules, work on real projects, earn badges and level up your skills"
                  position="bottom"
                />
                <TimelineCard 
                  step="3"
                  icon={<Shield className="w-8 h-8" />}
                  title="Get Certified"
                  description="Receive industry-recognized certificates and get placement support"
                  position="top"
                />
              </div>
            </div>

            {/* Mobile Timeline */}
            <div className="block md:hidden space-y-12">
              <MobileTimelineCard 
                step="1"
                icon={<Target className="w-8 h-8" />}
                title="Choose & Register"
                description="Browse our courses, check available slots, and register for your chosen program"
              />
              <MobileTimelineCard 
                step="2"
                icon={<TrendingUp className="w-8 h-8" />}
                title="Learn & Build"
                description="Complete modules, work on real projects, earn badges and level up your skills"
              />
              <MobileTimelineCard 
                step="3"
                icon={<Shield className="w-8 h-8" />}
                title="Get Certified"
                description="Receive industry-recognized certificates and get placement support"
              />
            </div>
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
      <section className="py-24 relative overflow-hidden">
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

function EnhancedFeatureCard({ icon, title, description, color, bgColor }: { 
  icon: React.ReactNode; 
  title: string; 
  description: string; 
  color: string;
  bgColor: string;
}) {
  return (
    <div className={`${bgColor} rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group border border-border/50 hover:border-primary/30 will-change-transform hover:scale-105`}>
      <div className={`bg-gradient-to-br ${color} w-16 h-16 rounded-xl flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform shadow-lg will-change-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-display mb-2 font-semibold">{title}</h3>
      <p className="text-muted-foreground leading-relaxed">{description}</p>
      
      {/* Decorative element */}
      <div className="mt-4 flex items-center text-primary text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
        <span>Learn more</span>
        <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
      </div>
    </div>
  );
}

function TimelineCard({ step, icon, title, description, position }: { 
  step: string; 
  icon: React.ReactNode; 
  title: string; 
  description: string;
  position: 'top' | 'bottom';
}) {
  return (
    <div className={`relative ${position === 'bottom' ? 'pt-24' : 'pb-24'}`}>
      {/* Connection Point */}
      <div className={`absolute ${position === 'top' ? 'bottom-0' : 'top-0'} left-1/2 transform -translate-x-1/2 ${position === 'top' ? 'translate-y-1/2' : '-translate-y-1/2'} w-5 h-5 rounded-full bg-primary border-4 border-background shadow-lg z-10`} />
      
      {/* Connecting Line */}
      <div className={`absolute ${position === 'top' ? 'bottom-0' : 'top-0'} left-1/2 transform -translate-x-1/2 ${position === 'top' ? 'translate-y-2.5' : '-translate-y-2.5'} w-0.5 h-20 bg-gradient-to-${position === 'top' ? 'b' : 't'} from-primary to-transparent`} />
      
      {/* Card */}
      <div className="bg-card border border-border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:border-primary/30 group">
        {/* Step Number Badge */}
        <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-primary text-white font-bold text-lg mb-6">
          {step}
        </div>
        
        {/* Icon */}
        <div className="bg-primary/10 w-16 h-16 rounded-lg flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
          {icon}
        </div>
        
        {/* Content */}
        <h3 className="text-xl font-display mb-3 font-semibold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

function MobileTimelineCard({ step, icon, title, description }: { 
  step: string; 
  icon: React.ReactNode; 
  title: string; 
  description: string;
}) {
  return (
    <div className="relative flex items-start gap-6">
      {/* Timeline Line */}
      <div className="relative">
        <div className="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold text-lg">
          {step}
        </div>
        {step !== "3" && (
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-0.5 h-20 bg-gradient-to-b from-primary to-primary/30" />
        )}
      </div>
      
      {/* Card */}
      <div className="flex-1 bg-card border border-border rounded-xl p-6 shadow-sm">
        <div className="bg-primary/10 w-14 h-14 rounded-lg flex items-center justify-center mb-4 text-primary">
          {icon}
        </div>
        <h3 className="text-xl font-display mb-3 font-semibold">{title}</h3>
        <p className="text-muted-foreground leading-relaxed">{description}</p>
      </div>
    </div>
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
