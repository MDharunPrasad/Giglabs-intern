import { useState, useEffect, useMemo, useCallback } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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

interface Student {
  id: string;
  name: string;
  email: string;
  domain: string;
  track: string;
  enrollmentDate: string;
  status: "active" | "inactive";
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    domain: "",
    track: "",
    status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    loadStudents();
  }, []);

  const loadStudents = () => {
    const stored = localStorage.getItem("students");
    if (stored) {
      setStudents(JSON.parse(stored));
    } else {
      // Initialize with sample data if none exists
      const sampleStudents: Student[] = [
        {
          id: "1",
          name: "Emma Chen",
          email: "emma.chen@giglabs.com",
          domain: "Full Stack Development",
          track: "Online",
          enrollmentDate: "2025-01-20",
          status: "active",
        },
        {
          id: "2",
          name: "Mike Ross",
          email: "mike.ross@giglabs.com",
          domain: "AI/ML",
          track: "Offline",
          enrollmentDate: "2025-01-19",
          status: "active",
        },
        {
          id: "3",
          name: "Sarah Johnson",
          email: "sarah.johnson@giglabs.com",
          domain: "Full Stack Development",
          track: "Online",
          enrollmentDate: "2025-01-18",
          status: "active",
        },
        {
          id: "4",
          name: "David Kim",
          email: "david.kim@giglabs.com",
          domain: "Data Science",
          track: "Online",
          enrollmentDate: "2025-01-17",
          status: "active",
        },
        {
          id: "5",
          name: "Lisa Wang",
          email: "lisa.wang@giglabs.com",
          domain: "Cloud Computing",
          track: "Hybrid",
          enrollmentDate: "2025-01-16",
          status: "active",
        },
        {
          id: "6",
          name: "James Miller",
          email: "james.miller@giglabs.com",
          domain: "DevOps",
          track: "Online",
          enrollmentDate: "2025-01-15",
          status: "inactive",
        },
      ];
      saveStudents(sampleStudents);
    }
  };

  const saveStudents = useCallback((data: Student[]) => {
    localStorage.setItem("students", JSON.stringify(data));
    setStudents(data);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!formData.name || !formData.email || !formData.domain || !formData.track) {
      toast.error("Please fill all fields");
      return;
    }

    if (editingStudent) {
      const updated = students.map((s) =>
        s.id === editingStudent.id ? { ...editingStudent, ...formData } : s
      );
      saveStudents(updated);
      toast.success("Student updated successfully");
    } else {
      const newStudent: Student = {
        id: Date.now().toString(),
        ...formData,
        enrollmentDate: new Date().toISOString().split("T")[0],
      };
      saveStudents([...students, newStudent]);
      toast.success("Student added successfully");
    }

    setIsDialogOpen(false);
    resetForm();
  }, [formData, editingStudent, students, saveStudents]);

  const handleEdit = useCallback((student: Student) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      email: student.email,
      domain: student.domain,
      track: student.track,
      status: student.status,
    });
    setIsDialogOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    saveStudents(students.filter((s) => s.id !== id));
    toast.success("Student deleted successfully");
  }, [students, saveStudents]);

  const resetForm = useCallback(() => {
    setEditingStudent(null);
    setFormData({
      name: "",
      email: "",
      domain: "",
      track: "",
      status: "active",
    });
  }, []);

  const filteredStudents = useMemo(() => 
    students.filter(
      (s) =>
        s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        s.email.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [students, searchQuery]
  );

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-display font-bold">Students</h1>
        <Button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Student
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search students..."
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
                <TableHead className="whitespace-nowrap">Name</TableHead>
                <TableHead className="whitespace-nowrap hidden md:table-cell">Email</TableHead>
                <TableHead className="whitespace-nowrap">Domain</TableHead>
                <TableHead className="whitespace-nowrap hidden lg:table-cell">Track</TableHead>
                <TableHead className="whitespace-nowrap hidden xl:table-cell">Enrollment Date</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredStudents.map((student) => (
                <TableRow key={student.id}>
                  <TableCell className="font-medium whitespace-nowrap">{student.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{student.email}</TableCell>
                  <TableCell className="whitespace-nowrap">{student.domain}</TableCell>
                  <TableCell className="hidden lg:table-cell">{student.track}</TableCell>
                  <TableCell className="hidden xl:table-cell">{student.enrollmentDate}</TableCell>
                  <TableCell>
                    <Badge variant={student.status === "active" ? "default" : "secondary"}>
                      {student.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(student)}
                        aria-label="Edit student"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(student.id)}
                        aria-label="Delete student"
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
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingStudent ? "Edit" : "Add"} Student</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
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
              <Label htmlFor="track">Track</Label>
              <Select value={formData.track} onValueChange={(v) => setFormData({ ...formData, track: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select track" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Online">Online</SelectItem>
                  <SelectItem value="Offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select value={formData.status} onValueChange={(v) => setFormData({ ...formData, status: v as "active" | "inactive" })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingStudent ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
        </Dialog>
      </div>
  );
}