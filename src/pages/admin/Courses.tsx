import { useState, useEffect, useMemo, useCallback } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";

interface Course {
  id: string;
  title: string;
  description: string;
  domain: string;
  duration: string;
  level: string;
  modules: number;
  status: "active" | "draft";
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    domain: "",
    duration: "",
    level: "",
    modules: 0,
    status: "active" as "active" | "draft",
  });

  useEffect(() => {
    loadCourses();
  }, []);

  const loadCourses = () => {
    const stored = localStorage.getItem("courses");
    if (stored) {
      setCourses(JSON.parse(stored));
    } else {
      // Initialize with sample data if none exists
      const sampleCourses: Course[] = [
        {
          id: "1",
          title: "Full Stack Web Development",
          description: "Master modern web development with React, Node.js, and MongoDB. Build real-world applications from scratch.",
          domain: "Web Development",
          duration: "12 weeks",
          level: "Intermediate",
          modules: 12,
          status: "active",
        },
        {
          id: "2",
          title: "AI & Machine Learning Fundamentals",
          description: "Learn the foundations of artificial intelligence and machine learning. Covers neural networks, deep learning, and practical applications.",
          domain: "AI/ML",
          duration: "16 weeks",
          level: "Advanced",
          modules: 15,
          status: "active",
        },
        {
          id: "3",
          title: "Cloud Computing with AWS",
          description: "Comprehensive AWS training covering EC2, S3, Lambda, and cloud architecture best practices.",
          domain: "Cloud Computing",
          duration: "10 weeks",
          level: "Intermediate",
          modules: 10,
          status: "active",
        },
        {
          id: "4",
          title: "Data Science & Analytics",
          description: "Learn data analysis, visualization, and statistical modeling using Python, Pandas, and Jupyter.",
          domain: "Data Science",
          duration: "14 weeks",
          level: "Intermediate",
          modules: 14,
          status: "active",
        },
        {
          id: "5",
          title: "Mobile App Development with React Native",
          description: "Build cross-platform mobile applications for iOS and Android using React Native and Expo.",
          domain: "Mobile Development",
          duration: "10 weeks",
          level: "Intermediate",
          modules: 10,
          status: "active",
        },
        {
          id: "6",
          title: "DevOps & CI/CD Pipeline",
          description: "Master DevOps practices, Docker, Kubernetes, Jenkins, and automated deployment pipelines.",
          domain: "DevOps",
          duration: "8 weeks",
          level: "Advanced",
          modules: 8,
          status: "active",
        },
      ];
      saveCourses(sampleCourses);
    }
  };

  const saveCourses = useCallback((data: Course[]) => {
    localStorage.setItem("courses", JSON.stringify(data));
    setCourses(data);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!formData.title || !formData.domain || !formData.duration || !formData.level) {
      toast.error("Please fill all required fields");
      return;
    }

    if (editingCourse) {
      const updated = courses.map((c) =>
        c.id === editingCourse.id ? { ...editingCourse, ...formData } : c
      );
      saveCourses(updated);
      toast.success("Course updated successfully");
    } else {
      const newCourse: Course = {
        id: Date.now().toString(),
        ...formData,
      };
      saveCourses([...courses, newCourse]);
      toast.success("Course added successfully");
    }

    setIsDialogOpen(false);
    resetForm();
  }, [formData, editingCourse, courses, saveCourses]);

  const handleEdit = useCallback((course: Course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      description: course.description,
      domain: course.domain,
      duration: course.duration,
      level: course.level,
      modules: course.modules,
      status: course.status,
    });
    setIsDialogOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    saveCourses(courses.filter((c) => c.id !== id));
    toast.success("Course deleted successfully");
  }, [courses, saveCourses]);

  const resetForm = useCallback(() => {
    setEditingCourse(null);
    setFormData({
      title: "",
      description: "",
      domain: "",
      duration: "",
      level: "",
      modules: 0,
      status: "active",
    });
  }, []);

  const filteredCourses = useMemo(() =>
    courses.filter((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [courses, searchQuery]
  );

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-display font-bold">Courses</h1>
        <Button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Course
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search courses..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-card rounded-lg border shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Title</TableHead>
                <TableHead className="whitespace-nowrap">Domain</TableHead>
                <TableHead className="whitespace-nowrap hidden lg:table-cell">Duration</TableHead>
                <TableHead className="whitespace-nowrap hidden md:table-cell">Level</TableHead>
                <TableHead className="whitespace-nowrap hidden xl:table-cell">Modules</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell className="whitespace-nowrap">{course.domain}</TableCell>
                  <TableCell className="hidden lg:table-cell">{course.duration}</TableCell>
                  <TableCell className="hidden md:table-cell">{course.level}</TableCell>
                  <TableCell className="hidden xl:table-cell">{course.modules}</TableCell>
                  <TableCell>
                    <Badge variant={course.status === "active" ? "default" : "secondary"}>
                      {course.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(course)}
                        aria-label="Edit course"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(course.id)}
                        aria-label="Delete course"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editingCourse ? "Edit" : "Add"} Course</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="domain">Domain</Label>
                <Select value={formData.domain} onValueChange={(v) => setFormData({ ...formData, domain: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select domain" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="AI/ML">AI/ML</SelectItem>
                    <SelectItem value="Full-Stack">Full-Stack</SelectItem>
                    <SelectItem value="Data Science">Data Science</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration}
                  onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
                  placeholder="e.g., 12 weeks"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="level">Level</Label>
                <Select value={formData.level} onValueChange={(v) => setFormData({ ...formData, level: v })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Advanced">Advanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="modules">Number of Modules</Label>
                <Input
                  id="modules"
                  type="number"
                  value={formData.modules}
                  onChange={(e) => setFormData({ ...formData, modules: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as "active" | "draft" })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="draft">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingCourse ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
          </div>
  );
}
