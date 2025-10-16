import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ThemeToggle";
import { GraduationCap, Menu, X, User } from "lucide-react";
import { useState } from "react";

export function Navbar() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="bg-card/80 backdrop-blur-lg border-b border-border/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-display font-bold">GigLabs</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            <Link to="/">
              <Button 
                variant="ghost" 
                className={isActive("/") ? "bg-accent/10 text-accent font-semibold" : ""}
              >
                Home
              </Button>
            </Link>
            <Link to="/browse-courses">
              <Button 
                variant="ghost"
                className={isActive("/browse-courses") ? "bg-accent/10 text-accent font-semibold" : ""}
              >
                Courses
              </Button>
            </Link>
            <Link to="/dashboard">
              <Button 
                variant="ghost"
                className={isActive("/dashboard") ? "bg-accent/10 text-accent font-semibold" : ""}
              >
                Dashboard
              </Button>
            </Link>
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-2">
            <ThemeToggle />
            <Link to="/profile">
              <Button variant="ghost" size="icon">
                <User className="w-5 h-5" />
              </Button>
            </Link>
            <Link to="/registration">
              <Button className="gradient-primary shadow-glow">
                Register Now
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <nav className="flex flex-col gap-2">
              <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  variant="ghost" 
                  className={`w-full justify-start ${isActive("/") ? "bg-accent/10 text-accent font-semibold" : ""}`}
                >
                  Home
                </Button>
              </Link>
              <Link to="/browse-courses" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className={`w-full justify-start ${isActive("/browse-courses") ? "bg-accent/10 text-accent font-semibold" : ""}`}
                >
                  Courses
                </Button>
              </Link>
              <Link to="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className={`w-full justify-start ${isActive("/dashboard") ? "bg-accent/10 text-accent font-semibold" : ""}`}
                >
                  Dashboard
                </Button>
              </Link>
              <Link to="/profile" onClick={() => setMobileMenuOpen(false)}>
                <Button 
                  variant="ghost"
                  className={`w-full justify-start ${isActive("/profile") ? "bg-accent/10 text-accent font-semibold" : ""}`}
                >
                  <User className="w-4 h-4" />
                  Profile
                </Button>
              </Link>
              <Link to="/registration" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full gradient-primary shadow-glow mt-2">
                  Register Now
                </Button>
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
