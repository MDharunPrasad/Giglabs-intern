import { useState } from "react";
import {
  FileText,
  Calendar,
  Clock,
  CheckCircle2,
  AlertCircle,
  Upload,
  Link as LinkIcon,
  Download,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface Assignment {
  id: string;
  title: string;
  course: string;
  description: string;
  dueDate: string;
  status: "pending" | "submitted" | "graded" | "overdue";
  grade?: number;
  maxGrade: number;
  submittedDate?: string;
}

export default function Assignments() {
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState(false);
  const [selectedAssignment, setSelectedAssignment] = useState<Assignment | null>(null);
  const [submissionLink, setSubmissionLink] = useState("");
  const [submissionNotes, setSubmissionNotes] = useState("");

  // Mock data
  const assignments: Assignment[] = [
    {
      id: "1",
      title: "Build a REST API with Node.js",
      course: "Full Stack Web Development",
      description:
        "Create a RESTful API using Node.js and Express. Include CRUD operations for a resource of your choice.",
      dueDate: "2025-10-25",
      status: "pending",
      maxGrade: 100,
    },
    {
      id: "2",
      title: "Machine Learning Model Training",
      course: "AI & Machine Learning Fundamentals",
      description:
        "Train a classification model using the provided dataset and submit your Jupyter notebook.",
      dueDate: "2025-10-20",
      status: "submitted",
      maxGrade: 100,
      submittedDate: "2025-10-18",
    },
    {
      id: "3",
      title: "AWS Cloud Architecture Design",
      course: "Cloud Computing with AWS",
      description:
        "Design and document a scalable cloud architecture for an e-commerce application.",
      dueDate: "2025-10-15",
      status: "graded",
      grade: 92,
      maxGrade: 100,
      submittedDate: "2025-10-14",
    },
    {
      id: "4",
      title: "React Component Library",
      course: "Full Stack Web Development",
      description: "Create a reusable component library with at least 5 components.",
      dueDate: "2025-10-10",
      status: "overdue",
      maxGrade: 100,
    },
  ];

  const handleSubmit = () => {
    if (!submissionLink.trim()) {
      toast.error("Please provide a submission link");
      return;
    }

    toast.success("Assignment submitted successfully!");
    setIsSubmitDialogOpen(false);
    setSubmissionLink("");
    setSubmissionNotes("");
  };

  const getStatusBadge = (status: Assignment["status"]) => {
    const variants = {
      pending: { variant: "secondary" as const, label: "Pending", icon: Clock },
      submitted: { variant: "default" as const, label: "Submitted", icon: CheckCircle2 },
      graded: { variant: "default" as const, label: "Graded", icon: CheckCircle2 },
      overdue: { variant: "destructive" as const, label: "Overdue", icon: AlertCircle },
    };

    const { variant, label, icon: Icon } = variants[status];
    return (
      <Badge variant={variant} className="flex items-center gap-1 w-fit">
        <Icon className="h-3 w-3" />
        {label}
      </Badge>
    );
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const now = new Date();
    const diff = Math.ceil((due.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  const filteredAssignments = {
    all: assignments,
    pending: assignments.filter((a) => a.status === "pending" || a.status === "overdue"),
    submitted: assignments.filter((a) => a.status === "submitted"),
    graded: assignments.filter((a) => a.status === "graded"),
  };

  const AssignmentCard = ({ assignment }: { assignment: Assignment }) => {
    const daysUntilDue = getDaysUntilDue(assignment.dueDate);

    return (
      <Card className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card via-card to-card/50">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h3 className="font-bold text-lg mb-1">{assignment.title}</h3>
            <p className="text-sm text-muted-foreground">{assignment.course}</p>
          </div>
          {getStatusBadge(assignment.status)}
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-2">
          {assignment.description}
        </p>

        <div className="space-y-3">
          {/* Due Date */}
          <div className="flex items-center gap-2 text-sm">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Due:</span>
            <span className="font-medium">
              {new Date(assignment.dueDate).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
            {assignment.status === "pending" && daysUntilDue >= 0 && (
              <Badge variant="outline" className="ml-auto">
                {daysUntilDue === 0
                  ? "Due today"
                  : `${daysUntilDue} days left`}
              </Badge>
            )}
          </div>

          {/* Grade */}
          {assignment.status === "graded" && assignment.grade !== undefined && (
            <div className="flex items-center gap-2 p-3 bg-accent/10 rounded-lg border border-accent/20">
              <CheckCircle2 className="h-5 w-5 text-accent" />
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Your Grade</p>
                <p className="text-2xl font-bold text-accent">
                  {assignment.grade}/{assignment.maxGrade}
                </p>
              </div>
            </div>
          )}

          {/* Submitted Date */}
          {assignment.submittedDate && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CheckCircle2 className="h-4 w-4" />
              <span>
                Submitted on{" "}
                {new Date(assignment.submittedDate).toLocaleDateString()}
              </span>
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            {assignment.status === "pending" || assignment.status === "overdue" ? (
              <Button
                className="flex-1"
                onClick={() => {
                  setSelectedAssignment(assignment);
                  setIsSubmitDialogOpen(true);
                }}
              >
                <Upload className="h-4 w-4 mr-2" />
                Submit Assignment
              </Button>
            ) : (
              <>
                <Button variant="outline" className="flex-1">
                  <FileText className="h-4 w-4 mr-2" />
                  View Details
                </Button>
                {assignment.status === "submitted" && (
                  <Button variant="outline">
                    <Upload className="h-4 w-4 mr-2" />
                    Resubmit
                  </Button>
                )}
              </>
            )}
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent mb-2">
          My Assignments
        </h1>
        <p className="text-muted-foreground text-lg">
          Track and submit your course assignments
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="p-4 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <p className="text-sm text-muted-foreground mb-1">Total</p>
          <p className="text-2xl font-bold">{assignments.length}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-yellow-500/10 to-transparent border-yellow-500/20">
          <p className="text-sm text-muted-foreground mb-1">Pending</p>
          <p className="text-2xl font-bold">{filteredAssignments.pending.length}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/20">
          <p className="text-sm text-muted-foreground mb-1">Submitted</p>
          <p className="text-2xl font-bold">{filteredAssignments.submitted.length}</p>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
          <p className="text-sm text-muted-foreground mb-1">Graded</p>
          <p className="text-2xl font-bold">{filteredAssignments.graded.length}</p>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList className="grid w-full grid-cols-4 mb-6">
          <TabsTrigger value="all">All ({filteredAssignments.all.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({filteredAssignments.pending.length})</TabsTrigger>
          <TabsTrigger value="submitted">Submitted ({filteredAssignments.submitted.length})</TabsTrigger>
          <TabsTrigger value="graded">Graded ({filteredAssignments.graded.length})</TabsTrigger>
        </TabsList>

        {Object.entries(filteredAssignments).map(([key, items]) => (
          <TabsContent key={key} value={key} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {items.map((assignment) => (
                <AssignmentCard key={assignment.id} assignment={assignment} />
              ))}
            </div>
            {items.length === 0 && (
              <div className="text-center py-12">
                <FileText className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">No assignments</h3>
                <p className="text-muted-foreground">
                  No {key} assignments at the moment
                </p>
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>

      {/* Submit Dialog */}
      <Dialog open={isSubmitDialogOpen} onOpenChange={setIsSubmitDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Submit Assignment</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <h3 className="font-semibold mb-1">{selectedAssignment?.title}</h3>
              <p className="text-sm text-muted-foreground">
                {selectedAssignment?.course}
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Project Link *</Label>
              <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  id="link"
                  placeholder="https://github.com/username/project"
                  value={submissionLink}
                  onChange={(e) => setSubmissionLink(e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-muted-foreground">
                Provide a link to your GitHub repository, live demo, or other project URL
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Additional Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Any additional information about your submission..."
                value={submissionNotes}
                onChange={(e) => setSubmissionNotes(e.target.value)}
                rows={4}
              />
            </div>

            <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
              <div className="flex items-start gap-2">
                <AlertCircle className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-sm mb-1">Submission Guidelines</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li>• Ensure your project link is accessible</li>
                    <li>• Include a README with setup instructions</li>
                    <li>• Double-check all requirements are met</li>
                    <li>• You can resubmit before the deadline</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsSubmitDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              <Upload className="h-4 w-4 mr-2" />
              Submit Assignment
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
