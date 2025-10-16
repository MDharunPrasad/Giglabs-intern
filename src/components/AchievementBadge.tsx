import { cn } from "@/lib/utils";
import { Award, Code, Brain, Share2 } from "lucide-react";
import { Button } from "./ui/button";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface AchievementBadgeProps {
  title: string;
  domain: "fullstack" | "ai-ml";
  earned?: boolean;
  size?: "sm" | "md" | "lg";
  showShare?: boolean;
  className?: string;
}

const domainConfig = {
  fullstack: {
    icon: Code,
    gradient: "from-blue-500 via-purple-500 to-pink-500",
    name: "Full-Stack Development"
  },
  "ai-ml": {
    icon: Brain,
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    name: "AI & Machine Learning"
  }
};

export function AchievementBadge({ 
  title, 
  domain,
  size = "md",
  earned = true,
  showShare = false,
  className 
}: AchievementBadgeProps) {
  const { toast } = useToast();
  const [isSharing, setIsSharing] = useState(false);
  const config = domainConfig[domain];
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: "w-16 h-16 text-xs",
    md: "w-24 h-24 text-sm",
    lg: "w-32 h-32 text-base"
  };

  const iconSizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16"
  };

  const handleShare = async () => {
    setIsSharing(true);
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${title} - ${config.name}`,
          text: `I just earned the ${title} badge for completing ${config.name}! 🎉`,
          url: window.location.href
        });
      } else {
        // Fallback: Copy to clipboard
        await navigator.clipboard.writeText(
          `I just earned the ${title} badge for completing ${config.name}! 🎉 ${window.location.href}`
        );
        toast({
          title: "Link copied!",
          description: "Share link copied to clipboard"
        });
      }
    } catch (error) {
      if ((error as Error).name !== 'AbortError') {
        toast({
          title: "Error sharing",
          description: "Please try again",
          variant: "destructive"
        });
      }
    } finally {
      setIsSharing(false);
    }
  };

  if (!earned) {
    return (
      <div className={cn("flex flex-col items-center gap-3 group", className)}>
        <div 
          className={cn(
            "rounded-full flex items-center justify-center relative",
            "bg-muted/50 text-muted-foreground opacity-40",
            sizeClasses[size],
            "border-4 border-dashed border-muted-foreground/30"
          )}
        >
          <Icon className={cn(iconSizeClasses[size], "opacity-50")} />
        </div>
        <p className="text-center font-medium text-xs text-muted-foreground">
          Not Earned
        </p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col items-center gap-3 group", className)}>
      {/* 3D Badge */}
      <div className="relative">
        <div 
          className={cn(
            "rounded-full flex items-center justify-center relative z-10",
            "bg-gradient-to-br shadow-2xl",
            "transform-gpu transition-all duration-300",
            "hover:scale-110 hover:rotate-6",
            "animate-badge-pop cursor-pointer",
            sizeClasses[size],
            config.gradient,
            // 3D Effect layers
            "before:absolute before:inset-0 before:rounded-full",
            "before:bg-gradient-to-br before:from-white/30 before:to-transparent",
            "before:opacity-50",
            // Glow effect
            "after:absolute after:inset-0 after:rounded-full after:blur-xl",
            `after:bg-gradient-to-br after:${config.gradient}`,
            "after:-z-10 after:opacity-50"
          )}
          style={{
            boxShadow: `
              0 10px 25px -5px rgba(0, 0, 0, 0.3),
              0 20px 40px -10px rgba(0, 0, 0, 0.2),
              inset 0 -2px 10px rgba(0, 0, 0, 0.2),
              inset 0 2px 10px rgba(255, 255, 255, 0.3)
            `
          }}
        >
          <Icon className={cn(iconSizeClasses[size], "text-white drop-shadow-lg relative z-10")} strokeWidth={2.5} />
          
          {/* Shine effect */}
          <div 
            className="absolute inset-0 rounded-full overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          >
            <div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
              style={{
                transform: 'translateX(-100%)',
                animation: 'shimmer 2s ease-in-out infinite'
              }}
            />
          </div>
        </div>
      </div>

      <div className="text-center space-y-2">
        <p className={cn(
          "font-display font-bold",
          size === "sm" && "text-xs",
          size === "md" && "text-sm",
          size === "lg" && "text-base"
        )}>
          {title}
        </p>
        <p className="text-xs text-muted-foreground max-w-[120px]">
          {config.name}
        </p>
        
        {showShare && (
          <Button 
            variant="ghost" 
            size="sm" 
            className="h-8 text-xs gap-1"
            onClick={handleShare}
            disabled={isSharing}
          >
            <Share2 className="w-3 h-3" />
            Share
          </Button>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}
