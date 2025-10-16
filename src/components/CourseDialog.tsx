import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Users, Award, CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface Course {
  id: string;
  title: string;
  description: string;
  duration: string;
  icon: any;
  gradient: string;
  totalSlots: number;
  remainingSlots: number;
}

interface CourseDialogProps {
  course: Course | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function CourseDialog({ course, open, onOpenChange }: CourseDialogProps) {
  if (!course) return null;

  const features = [
    "Live interactive sessions",
    "Hands-on projects",
    "Industry expert mentors",
    "Certificate upon completion",
    "Lifetime access to materials",
    "Career guidance & placement support"
  ];

  const slotsPercentage = (course.remainingSlots / course.totalSlots) * 100;
  const isLowStock = slotsPercentage < 30;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${course.gradient} flex items-center justify-center mb-4`}>
            <course.icon className="w-8 h-8 text-white" />
          </div>
          <DialogTitle className="text-3xl font-display">{course.title}</DialogTitle>
          <DialogDescription className="text-base">{course.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Course Stats */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass-card p-4 rounded-xl">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                <span className="text-sm">Duration</span>
              </div>
              <p className="text-lg font-semibold">{course.duration}</p>
            </div>
            <div className="glass-card p-4 rounded-xl">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Users className="w-4 h-4" />
                <span className="text-sm">Slots Available</span>
              </div>
              <p className="text-lg font-semibold">
                {course.remainingSlots}/{course.totalSlots}
                {isLowStock && <Badge variant="destructive" className="ml-2">Limited</Badge>}
              </p>
            </div>
          </div>

          {/* Progress Bar for Slots */}
          <div>
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Enrollment Status</span>
              <span className={isLowStock ? "text-destructive font-semibold" : "text-muted-foreground"}>
                {slotsPercentage.toFixed(0)}% available
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-500 ${isLowStock ? 'bg-destructive' : 'bg-gradient-to-r from-primary to-accent'}`}
                style={{ width: `${slotsPercentage}%` }}
              />
            </div>
          </div>

          {/* What You'll Learn */}
          <div>
            <h3 className="font-display font-semibold text-lg mb-3 flex items-center gap-2">
              <Award className="w-5 h-5 text-primary" />
              What You'll Get
            </h3>
            <div className="grid gap-2">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="pt-4 border-t border-border">
            <Link to={`/registration?course=${course.id}`} onClick={() => onOpenChange(false)}>
              <Button className="w-full gradient-primary shadow-glow" size="lg">
                Register for this Course
              </Button>
            </Link>
            <p className="text-center text-sm text-muted-foreground mt-3">
              Secure your spot today! Limited seats available.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
