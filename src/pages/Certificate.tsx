import { Button } from "@/components/ui/button";
import { Award, Download, Share2, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Certificate() {
  const [userData, setUserData] = useState({ fullName: "Student", courseType: "Full Stack" });

  useEffect(() => {
    const registration = localStorage.getItem("userRegistration");
    if (registration) {
      const data = JSON.parse(registration);
      setUserData({ 
        fullName: data.fullName,
        courseType: data.courseType?.replace(/-/g, ' ').replace(/\b\w/g, (l: string) => l.toUpperCase()) || "Full Stack"
      });
    }
  }, []);

  const handleDownload = () => {
    // Simulate certificate download
    const element = document.getElementById('certificate');
    if (element) {
      // In a real app, use html2canvas or similar library
      alert('Certificate download feature will be implemented with backend integration');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'My GigLabs Certificate',
        text: `I just completed ${userData.courseType} internship at GigLabs!`,
        url: window.location.href,
      });
    } else {
      alert('Share on LinkedIn, Twitter, or copy link to share your achievement!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-12">
        <Link to="/dashboard">
          <Button variant="ghost" size="sm" className="mb-8">
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </Button>
        </Link>

        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <div className="w-20 h-20 rounded-full gradient-gold flex items-center justify-center mx-auto mb-6 animate-badge-pop">
              <Award className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-5xl font-display font-bold mb-4">
              Congratulations! 🎉
            </h2>
            <p className="text-xl text-muted-foreground">
              You've successfully completed your internship
            </p>
          </div>

          {/* Certificate */}
          <div 
            id="certificate"
            className="glass-card rounded-2xl p-12 shadow-glow mb-8 animate-fade-in"
            style={{ animationDelay: '200ms' }}
          >
            <div className="text-center space-y-6">
              <div className="w-24 h-24 rounded-full gradient-primary flex items-center justify-center mx-auto">
                <Award className="w-12 h-12 text-white" />
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2">CERTIFICATE OF COMPLETION</p>
                <h3 className="text-4xl font-display font-bold mb-6">GigLabs Internship</h3>
              </div>
              
              <div className="space-y-4">
                <p className="text-muted-foreground">This certifies that</p>
                <p className="text-3xl font-display font-bold gradient-primary bg-clip-text text-transparent">
                  {userData.fullName}
                </p>
                <p className="text-muted-foreground">has successfully completed the</p>
                <p className="text-2xl font-display font-bold text-accent">
                  {userData.courseType} Development Internship
                </p>
              </div>
              
              <div className="pt-8 border-t border-border mt-8">
                <div className="flex justify-between items-center max-w-md mx-auto">
                  <div>
                    <p className="text-sm text-muted-foreground">Issue Date</p>
                    <p className="font-medium">{new Date().toLocaleDateString()}</p>
                  </div>
                  <div className="w-px h-12 bg-border"></div>
                  <div>
                    <p className="text-sm text-muted-foreground">Certificate ID</p>
                    <p className="font-medium">GL-{Math.random().toString(36).substr(2, 9).toUpperCase()}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in" style={{ animationDelay: '400ms' }}>
            <Button size="lg" onClick={handleDownload} className="gradient-primary shadow-glow">
              <Download className="w-5 h-5" />
              Download Certificate
            </Button>
            <Button size="lg" variant="outline" onClick={handleShare}>
              <Share2 className="w-5 h-5" />
              Share Achievement
            </Button>
          </div>

          {/* Next Steps */}
          <div className="mt-12 glass-card rounded-2xl p-8 animate-fade-in" style={{ animationDelay: '600ms' }}>
            <h3 className="text-2xl font-display font-bold mb-4">What's Next?</h3>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="text-accent">→</span>
                <span>Add this certificate to your LinkedIn profile and resume</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">→</span>
                <span>Explore advanced courses to continue your learning journey</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">→</span>
                <span>Join our alumni network and connect with fellow graduates</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-accent">→</span>
                <span>Apply for job opportunities with our partner companies</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
  );
}
