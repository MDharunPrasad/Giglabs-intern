import { ModuleCard } from "@/components/ModuleCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Filter } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Chatbot } from "@/components/Chatbot";

export default function Modules() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="w-4 h-4" />
              Back to Dashboard
            </Button>
          </Link>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl font-display mb-2">Full-Stack Development Track</h2>
              <p className="text-muted-foreground">Master frontend and backend development</p>
            </div>
            <Button variant="outline">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Course Overview */}
        <section className="mb-12">
          <div className="bg-card rounded-lg p-8 shadow-md border-2 border-primary">
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Progress</h3>
                <p className="text-3xl font-display">35%</p>
                <p className="text-sm text-muted-foreground mt-1">7 of 20 modules</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Estimated Time</h3>
                <p className="text-3xl font-display">120h</p>
                <p className="text-sm text-muted-foreground mt-1">45h completed</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-muted-foreground mb-2">Difficulty</h3>
                <p className="text-3xl font-display">Intermediate</p>
                <p className="text-sm text-muted-foreground mt-1">Some experience required</p>
              </div>
            </div>
          </div>
        </section>

        {/* Module Sections */}
        <section className="space-y-12">
          {/* Foundation Modules */}
          <div>
            <h3 className="text-2xl font-display mb-6">Foundation</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ModuleCard 
                title="Web Development Basics"
                description="HTML, CSS, and JavaScript fundamentals"
                status="completed"
                progress={100}
              />
              <ModuleCard 
                title="Git & GitHub"
                description="Version control essentials"
                status="completed"
                progress={100}
              />
              <ModuleCard 
                title="Command Line Basics"
                description="Master the terminal"
                status="completed"
                progress={100}
              />
            </div>
          </div>

          {/* Frontend Development */}
          <div>
            <h3 className="text-2xl font-display mb-6">Frontend Development</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ModuleCard 
                title="React Fundamentals"
                description="Learn React from scratch"
                status="in-progress"
                progress={65}
              />
              <ModuleCard 
                title="TypeScript Deep Dive"
                description="Type-safe JavaScript"
                status="in-progress"
                progress={30}
              />
              <ModuleCard 
                title="State Management"
                description="Redux, Context API, Zustand"
                status="available"
                progress={0}
              />
              <ModuleCard 
                title="React Router"
                description="Client-side routing"
                status="available"
                progress={0}
              />
              <ModuleCard 
                title="Styling Solutions"
                description="CSS-in-JS, Tailwind, Styled Components"
                status="locked"
                progress={0}
              />
              <ModuleCard 
                title="Testing React Apps"
                description="Jest, React Testing Library"
                status="locked"
                progress={0}
              />
            </div>
          </div>

          {/* Backend Development */}
          <div>
            <h3 className="text-2xl font-display mb-6">Backend Development</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <ModuleCard 
                title="Node.js Essentials"
                description="Server-side JavaScript"
                status="locked"
                progress={0}
              />
              <ModuleCard 
                title="Express.js Framework"
                description="Build REST APIs"
                status="locked"
                progress={0}
              />
              <ModuleCard 
                title="Database Design"
                description="SQL and NoSQL databases"
                status="locked"
                progress={0}
              />
              <ModuleCard 
                title="Authentication & Security"
                description="JWT, OAuth, best practices"
                status="locked"
                progress={0}
              />
              <ModuleCard 
                title="API Development"
                description="REST and GraphQL"
                status="locked"
                progress={0}
              />
              <ModuleCard 
                title="Deployment & DevOps"
                description="CI/CD, Docker, Cloud platforms"
                status="locked"
                progress={0}
              />
            </div>
          </div>

          {/* Capstone Project */}
          <div>
            <h3 className="text-2xl font-display mb-6">Capstone Project</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <ModuleCard 
                title="Full-Stack Project"
                description="Build a complete application"
                status="locked"
                progress={0}
              />
              <ModuleCard 
                title="Final Assessment"
                description="Demonstrate your skills"
                status="locked"
                progress={0}
              />
            </div>
          </div>
        </section>
      </div>
      
      <Footer />
      <Chatbot />
    </div>
  );
}
