import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  variant?: "default" | "primary" | "accent" | "gold";
  trend?: {
    value: number;
    label: string;
  };
  className?: string;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  variant = "default",
  trend,
  className 
}: StatCardProps) {
  const variantClasses = {
    default: "bg-card border-border",
    primary: "bg-primary/5 border-primary",
    accent: "bg-accent/5 border-accent",
    gold: "bg-gold/5 border-gold"
  };

  const iconVariantClasses = {
    default: "bg-primary text-primary-foreground",
    primary: "bg-primary text-primary-foreground",
    accent: "bg-accent text-accent-foreground",
    gold: "gradient-gold text-gold-foreground"
  };

  return (
    <div className={cn(
      "rounded-lg p-6 border-2 shadow-md transition-base hover:shadow-lg",
      variantClasses[variant],
      className
    )}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-muted-foreground font-medium mb-1">{title}</p>
          <p className="text-3xl font-display font-bold">{value}</p>
          {trend && (
            <p className={cn(
              "text-sm mt-2",
              trend.value > 0 ? "text-accent" : "text-muted-foreground"
            )}>
              {trend.value > 0 && "+"}{trend.value}% {trend.label}
            </p>
          )}
        </div>
        <div className={cn(
          "p-3 rounded-lg",
          iconVariantClasses[variant]
        )}>
          <Icon className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
}
