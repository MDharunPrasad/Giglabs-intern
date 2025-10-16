import { cn } from "@/lib/utils";
import { Lock, Check, Play } from "lucide-react";
import { ProgressBar } from "./ProgressBar";
import { Button } from "./ui/button";

interface ModuleCardProps {
  title: string;
  description?: string;
  status: "locked" | "available" | "in-progress" | "completed";
  progress?: number;
  onClick?: () => void;
  className?: string;
  moduleNumber?: number;
}

export function ModuleCard({ 
  title, 
  description, 
  status, 
  progress = 0,
  onClick,
  className,
  moduleNumber
}: ModuleCardProps) {
  const isLocked = status === "locked";
  const isCompleted = status === "completed";
  
  return (
    <div 
      className={cn(
        "bg-card rounded-lg p-6 shadow-md transition-base border-2",
        !isLocked && "hover:shadow-lg hover:-translate-y-1 cursor-pointer",
        isLocked && "opacity-60 cursor-not-allowed",
        isCompleted && "border-accent",
        status === "in-progress" && "border-primary shadow-glow",
        status === "available" && "border-border",
        className
      )}
      onClick={!isLocked ? onClick : undefined}
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            {moduleNumber && (
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-primary text-primary-foreground text-sm font-bold">
                {moduleNumber}
              </span>
            )}
            <h3 className="text-lg font-display">{title}</h3>
          </div>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
        <div className={cn(
          "ml-4 p-2 rounded-full",
          isLocked && "bg-muted",
          isCompleted && "bg-accent text-accent-foreground",
          status === "in-progress" && "bg-primary text-primary-foreground",
          status === "available" && "bg-secondary"
        )}>
          {isLocked && <Lock className="w-5 h-5" />}
          {isCompleted && <Check className="w-5 h-5" />}
          {(status === "available" || status === "in-progress") && <Play className="w-5 h-5" />}
        </div>
      </div>

      {!isLocked && progress > 0 && (
        <div className="mt-4">
          <ProgressBar value={progress} showLabel variant={isCompleted ? "accent" : "primary"} />
        </div>
      )}

      {!isLocked && (
        <Button 
          variant={isCompleted ? "outline" : "default"} 
          size="sm" 
          className="mt-4 w-full"
        >
          {isCompleted ? "Review" : status === "in-progress" ? "Continue" : "Start"}
        </Button>
      )}
    </div>
  );
}
