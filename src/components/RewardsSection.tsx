import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Gift, 
  Download, 
  Linkedin,
  FileText,
  Trophy,
  Star,
  Sparkles,
  Copy,
  CheckCircle
} from "lucide-react";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";

interface RewardsSectionProps {
  isCompleted: boolean;
  courseType: string;
  userName: string;
}

export function RewardsSection({ isCompleted, courseType, userName }: RewardsSectionProps) {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleDownload = () => {
    if (!isCompleted) {
      toast({
        title: "Reward Locked",
        description: "Complete the course to unlock this reward",
        variant: "destructive"
      });
      return;
    }

    // Simulate download
    const link = document.createElement('a');
    link.href = '/downloads/free-resources.zip';
    link.download = 'GigLabs-Free-Resources.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "Download Started",
      description: "Free resources are being downloaded",
    });
  };

  const handleBadgeDownload = () => {
    if (!isCompleted) {
      toast({
        title: "Reward Locked",
        description: "Complete the course to unlock this reward",
        variant: "destructive"
      });
      return;
    }

    // Create a canvas to generate the badge image
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = 400;
    canvas.height = 400;

    if (!ctx) return;

    // Create gradient background
    const gradient = ctx.createLinearGradient(0, 0, 400, 400);
    gradient.addColorStop(0, '#3B82F6');
    gradient.addColorStop(1, '#1D4ED8');
    
    // Draw background
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 400, 400);

    // Add shine effect
    const shineGradient = ctx.createRadialGradient(100, 100, 0, 100, 100, 100);
    shineGradient.addColorStop(0, 'rgba(255,255,255,0.3)');
    shineGradient.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = shineGradient;
    ctx.fillRect(0, 0, 200, 200);

    // Add LinkedIn icon (simplified)
    ctx.fillStyle = 'white';
    ctx.font = 'bold 80px Arial';
    ctx.textAlign = 'center';
    ctx.fillText('in', 200, 180);

    // Add GigLabs text
    ctx.fillStyle = 'white';
    ctx.font = 'bold 32px Arial';
    ctx.fillText('GigLabs', 200, 240);

    // Add Internship text
    ctx.font = '24px Arial';
    ctx.fillText('Internship', 200, 270);

    // Add course type
    ctx.font = 'bold 28px Arial';
    ctx.fillText(courseType, 200, 310);

    // Add completion text
    ctx.font = '20px Arial';
    ctx.fillText('Completion Badge', 200, 340);

    // Convert to blob and download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `GigLabs-${courseType.replace(/\s+/g, '-')}-Badge.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        
        toast({
          title: "Badge Downloaded",
          description: "Your achievement badge has been saved!",
        });
      }
    }, 'image/png');
  };

  const handleLinkedInShare = () => {
    if (!isCompleted) {
      toast({
        title: "Reward Locked",
        description: "Complete the course to unlock this reward",
        variant: "destructive"
      });
      return;
    }

    const shareText = `🎉 Excited to share that I've successfully completed the ${courseType} Development Internship at GigLabs! 

✅ Gained hands-on experience in modern development practices
✅ Built real-world projects and applications  
✅ Earned professional certification

Ready to apply these skills in my next role! 🚀

#GigLabs #${courseType.replace(/\s+/g, '')} #Internship #Certification #TechSkills #ProfessionalDevelopment`;

    const shareUrl = window.location.origin + '/certificate';
    
    // Try LinkedIn sharing API first
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}&title=${encodeURIComponent('GigLabs Internship Completion')}&summary=${encodeURIComponent(shareText)}`;
    
    window.open(linkedInUrl, '_blank', 'width=600,height=400');
    
    toast({
      title: "LinkedIn Share Opened",
      description: "Share your achievement with your professional network!",
    });
  };

  const handleCopyLink = () => {
    if (!isCompleted) {
      toast({
        title: "Reward Locked",
        description: "Complete the course to unlock this reward",
        variant: "destructive"
      });
      return;
    }

    const shareText = `🎉 Excited to share that I've successfully completed the ${courseType} Development Internship at GigLabs! 

✅ Gained hands-on experience in modern development practices
✅ Built real-world projects and applications  
✅ Earned professional certification

Ready to apply these skills in my next role! 🚀

#GigLabs #${courseType.replace(/\s+/g, '')} #Internship #Certification #TechSkills #ProfessionalDevelopment`;

    const shareUrl = window.location.origin + '/certificate';
    
    navigator.clipboard.writeText(`${shareText}\n\n${shareUrl}`);
    setCopiedText('link');
    setTimeout(() => setCopiedText(null), 2000);
    toast({
      title: "Copied to Clipboard",
      description: "Share text copied successfully",
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center">
            <Gift className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-2xl font-display font-bold">Completion Rewards</h3>
        </div>
        <p className="text-muted-foreground text-sm">
          Earn exclusive rewards upon course completion
        </p>
      </div>

      {/* Simple Rewards Grid */}
      <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
        {/* LinkedIn Badge */}
        <Card className={`transition-all duration-300 hover:shadow-glow ${
          isCompleted ? 'hover:scale-105' : 'opacity-60'
        }`}>
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              {/* Badge Preview */}
              <div className={`relative w-20 h-20 rounded-xl flex items-center justify-center ${
                isCompleted 
                  ? 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg' 
                  : 'bg-muted'
              }`}>
                <Linkedin className={`w-10 h-10 ${
                  isCompleted ? 'text-white' : 'text-muted-foreground'
                }`} />
              </div>
              {isCompleted && (
                <div className="flex gap-1">
                  <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                  <Star className="w-4 h-4 text-orange-500 animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
              )}
            </div>
            <CardTitle className={`text-xl ${isCompleted ? '' : 'text-muted-foreground'}`}>
              LinkedIn Achievement Badge
            </CardTitle>
            <CardDescription className="text-sm">
              Download and share your professional achievement badge on LinkedIn
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={isCompleted ? "default" : "secondary"}>
                {isCompleted ? "Unlocked" : "Locked"}
              </Badge>
              <Badge variant="outline" className="text-xs">
                🏆 Badge
              </Badge>
            </div>

            {/* Badge Preview */}
            {isCompleted && (
              <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700 font-medium mb-3">Badge Preview:</p>
                <div className="flex items-center justify-center">
                  <div className="relative">
                    {/* Badge Image Preview */}
                    <div className="w-24 h-24 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg flex flex-col items-center justify-center text-white relative overflow-hidden">
                      {/* Badge Background Pattern */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-blue-800/20"></div>
                      <div className="absolute top-1 left-1 w-8 h-8 bg-white/10 rounded-full blur-sm"></div>
                      
                      {/* Badge Content */}
                      <div className="relative z-10 text-center">
                        <Linkedin className="w-6 h-6 mx-auto mb-1" />
                        <div className="text-xs font-bold">GigLabs</div>
                        <div className="text-xs opacity-90">Internship</div>
                      </div>
                    </div>
                    <div className="text-center mt-2">
                      <p className="text-xs font-semibold text-blue-800">Backend Development</p>
                      <p className="text-xs text-blue-600">Completion Badge</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-2">
              <Button 
                size="sm" 
                onClick={handleBadgeDownload}
                disabled={!isCompleted}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Badge
              </Button>
              <Button 
                size="sm" 
                variant="outline"
                onClick={handleLinkedInShare}
                disabled={!isCompleted}
                className="hover:bg-blue-50 hover:border-blue-300"
              >
                <Linkedin className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Free Resources */}
        <Card className={`transition-all duration-300 hover:shadow-glow ${
          isCompleted ? 'hover:scale-105' : 'opacity-60'
        }`}>
          <CardHeader className="pb-4">
            <div className="flex items-start justify-between">
              <div className={`w-16 h-16 rounded-xl flex items-center justify-center ${
                isCompleted 
                  ? 'bg-gradient-to-br from-green-500 to-green-700 shadow-lg' 
                  : 'bg-muted'
              }`}>
                <FileText className={`w-8 h-8 ${
                  isCompleted ? 'text-white' : 'text-muted-foreground'
                }`} />
              </div>
              {isCompleted && (
                <div className="flex gap-1">
                  <Sparkles className="w-4 h-4 text-yellow-500 animate-pulse" />
                  <Star className="w-4 h-4 text-orange-500 animate-bounce" style={{ animationDelay: '0.5s' }} />
                </div>
              )}
            </div>
            <CardTitle className={`text-xl ${isCompleted ? '' : 'text-muted-foreground'}`}>
              Free Resources
            </CardTitle>
            <CardDescription className="text-sm">
              Download course materials, code templates, and bonus content for free
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant={isCompleted ? "default" : "secondary"}>
                {isCompleted ? "Unlocked" : "Locked"}
              </Badge>
              <Badge variant="outline" className="text-xs">
                📁 Resources
              </Badge>
            </div>

            <Button 
              size="sm" 
              onClick={handleDownload}
              disabled={!isCompleted}
              className="w-full bg-green-600 hover:bg-green-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download Free Resources
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
