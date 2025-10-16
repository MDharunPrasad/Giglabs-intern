import { cn } from "@/lib/utils";
import { Award, Star, Trophy, Zap, Shield, Crown } from "lucide-react";

interface AchievementBadgeProps {
  title: string;
  icon?: "award" | "star" | "trophy" | "zap" | "shield" | "crown";
  variant?: "primary" | "accent" | "gold";
  size?: "sm" | "md" | "lg";
  earned?: boolean;
  className?: string;
}

const iconMap = {
  award: Award,
  star: Star,
  trophy: Trophy,
  zap: Zap,
  shield: Shield,
  crown: Crown,
};

export function AchievementBadge({ 
  title, 
  icon = "award", 
  variant = "primary",
  size = "md",
  earned = true,
  className 
}: AchievementBadgeProps) {
  const Icon = iconMap[icon];
  
  const sizeClasses = {
    sm: "w-12 h-12 text-xs",
    md: "w-16 h-16 text-sm",
    lg: "w-20 h-20 text-base"
  };

  const variantClasses = {
    primary: earned ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground",
    accent: earned ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground",
    gold: earned ? "gradient-gold text-gold-foreground" : "bg-muted text-muted-foreground"
  };

  return (
    <div className={cn("flex flex-col items-center gap-2", className)}>
      <div 
        className={cn(
          "rounded-full flex items-center justify-center transition-base shadow-md",
          sizeClasses[size],
          variantClasses[variant],
          earned && "animate-badge-pop hover:scale-110 hover:shadow-lg",
          !earned && "opacity-50 grayscale"
        )}
      >
        <Icon className="w-1/2 h-1/2" />
      </div>
      <p className={cn(
        "text-center font-medium max-w-[80px]",
        size === "sm" && "text-xs",
        size === "md" && "text-sm",
        size === "lg" && "text-base"
      )}>
        {title}
      </p>
    </div>
  );
}
