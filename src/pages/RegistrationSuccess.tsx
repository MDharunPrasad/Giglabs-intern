import { Button } from "@/components/ui/button";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function RegistrationSuccess() {
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const registration = localStorage.getItem("userRegistration");
    if (registration) {
      const data = JSON.parse(registration);
      setUserName(data.fullName.split(' ')[0]); // First name only
    }
  }, []);

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="max-w-lg w-full">
        <div className="glass-card rounded-3xl p-12 shadow-glow text-center animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center mx-auto mb-8 animate-badge-pop shadow-glow">
            <CheckCircle className="w-12 h-12 text-white" strokeWidth={2.5} />
          </div>
          
          <h1 className="text-5xl font-display font-bold mb-4">
            Registration<br/>Successful! 🎉
          </h1>
          
          <p className="text-2xl text-muted-foreground mb-6">
            Welcome aboard, {userName || "student"}!
          </p>
          
          <p className="text-muted-foreground mb-10 leading-relaxed">
            Your internship dashboard is now unlocked. Start your learning journey and track your progress through interactive modules, quizzes, and real-world projects.
          </p>

          <div className="space-y-4">
            <Link to="/dashboard" className="block">
              <Button size="lg" className="w-full gradient-primary shadow-glow text-lg h-14 group">
                Access Dashboard
                <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
