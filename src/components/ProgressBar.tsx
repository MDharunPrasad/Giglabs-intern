import { cn } from "@/lib/utils";

interface ProgressBarProps {
  value: number;
  max?: number;
  className?: string;
  showLabel?: boolean;
  variant?: "primary" | "accent" | "gold";
  size?: "sm" | "md" | "lg";
}

export function ProgressBar({ 
  value, 
  max = 100, 
  className, 
  showLabel = false,
  variant = "primary",
  size = "md" 
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);
  
  const sizeClasses = {
    sm: "h-1",
    md: "h-2",
    lg: "h-3"
  };

  const variantClasses = {
    primary: "bg-primary",
    accent: "bg-accent",
    gold: "gradient-gold"
  };

  return (
    <div className="w-full space-y-1">
      {showLabel && (
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{Math.round(percentage)}%</span>
        </div>
      )}
      <div className={cn("w-full bg-secondary rounded-full overflow-hidden", sizeClasses[size], className)}>
        <div 
          className={cn("h-full rounded-full transition-all duration-500", variantClasses[variant])}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
