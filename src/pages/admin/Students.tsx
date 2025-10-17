import { useState, useEffect, useMemo, useCallback } from "react";
import { Plus, Search, Info, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
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
  phone: string;
  collegeName: string;
  state: string;
  duration: string;
  courseType: string;
  mode: string;
  domain: string;
  track: string;
  enrollmentDate: string;
  status: "active" | "inactive";
}

export default function Students() {
  const [students, setStudents] = useState<Student[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isInfoDialogOpen, setIsInfoDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | null>(null);
  const [viewingStudent, setViewingStudent] = useState<Student | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    collegeName: "",
    state: "",
    duration: "",
    courseType: "",
    mode: "",
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
          phone: "+1 (555) 101-1001",
          collegeName: "Stanford University",
          state: "California",
          duration: "3-months",
          courseType: "full-stack",
          mode: "online",
          domain: "Full Stack Development",
          track: "Online",
          enrollmentDate: "2025-01-20",
          status: "active",
        },
        {
          id: "2",
          name: "Mike Ross",
          email: "mike.ross@giglabs.com",
          phone: "+1 (555) 102-1002",
          collegeName: "MIT",
          state: "Massachusetts",
          duration: "2-months",
          courseType: "aiml",
          mode: "offline",
          domain: "AI/ML",
          track: "Offline",
          enrollmentDate: "2025-01-19",
          status: "active",
        },
        {
          id: "3",
          name: "Sarah Johnson",
          email: "sarah.johnson@giglabs.com",
          phone: "+1 (555) 103-1003",
          collegeName: "UC Berkeley",
          state: "California",
          duration: "3-months",
          courseType: "full-stack",
          mode: "online",
          domain: "Full Stack Development",
          track: "Online",
          enrollmentDate: "2025-01-18",
          status: "active",
        },
        {
          id: "4",
          name: "David Kim",
          email: "david.kim@giglabs.com",
          phone: "+1 (555) 104-1004",
          collegeName: "Carnegie Mellon University",
          state: "Pennsylvania",
          duration: "2-months",
          courseType: "full-stack",
          mode: "online",
          domain: "Data Science",
          track: "Online",
          enrollmentDate: "2025-01-17",
          status: "active",
        },
        {
          id: "5",
          name: "Lisa Wang",
          email: "lisa.wang@giglabs.com",
          phone: "+1 (555) 105-1005",
          collegeName: "University of Washington",
          state: "Washington",
          duration: "1-month",
          courseType: "backend",
          mode: "online",
          domain: "Cloud Computing",
          track: "Hybrid",
          enrollmentDate: "2025-01-16",
          status: "active",
        },
        {
          id: "6",
          name: "James Miller",
          email: "james.miller@giglabs.com",
          phone: "+1 (555) 106-1006",
          collegeName: "Georgia Tech",
          state: "Georgia",
          duration: "3-months",
          courseType: "full-stack",
          mode: "online",
          domain: "DevOps",
          track: "Online",
          enrollmentDate: "2025-01-15",
          status: "inactive",
        },
        {
          id: "7",
          name: "Ana Rodriguez",
          email: "ana.rodriguez@giglabs.com",
          phone: "+1 (555) 107-1007",
          collegeName: "University of Texas",
          state: "Texas",
          duration: "2-months",
          courseType: "ui-ux",
          mode: "online",
          domain: "UI/UX Design",
          track: "Online",
          enrollmentDate: "2025-01-14",
          status: "active",
        },
        {
          id: "8",
          name: "Alex Thompson",
          email: "alex.thompson@giglabs.com",
          phone: "+1 (555) 108-1008",
          collegeName: "University of Michigan",
          state: "Michigan",
          duration: "3-months",
          courseType: "frontend",
          mode: "offline",
          domain: "Frontend Development",
          track: "Offline",
          enrollmentDate: "2025-01-13",
          status: "active",
        },
        {
          id: "9",
          name: "Jessica Lee",
          email: "jessica.lee@giglabs.com",
          phone: "+1 (555) 109-1009",
          collegeName: "Northwestern University",
          state: "Illinois",
          duration: "1-month",
          courseType: "prompt-engineering",
          mode: "online",
          domain: "Prompt Engineering",
          track: "Online",
          enrollmentDate: "2025-01-12",
          status: "active",
        },
        {
          id: "10",
          name: "Ryan Williams",
          email: "ryan.williams@giglabs.com",
          phone: "+1 (555) 110-1010",
          collegeName: "Duke University",
          state: "North Carolina",
          duration: "2-months",
          courseType: "full-stack",
          mode: "online",
          domain: "Full Stack Development",
          track: "Online",
          enrollmentDate: "2025-01-11",
          status: "active",
        },
        {
          id: "11",
          name: "Priya Patel",
          email: "priya.patel@giglabs.com",
          phone: "+1 (555) 111-1011",
          collegeName: "Indian Institute of Technology",
          state: "California",
          duration: "3-months",
          courseType: "aiml",
          mode: "online",
          domain: "AI/ML",
          track: "Online",
          enrollmentDate: "2025-01-10",
          status: "active",
        },
        {
          id: "12",
          name: "Marcus Johnson",
          email: "marcus.johnson@giglabs.com",
          phone: "+1 (555) 112-1012",
          collegeName: "Howard University",
          state: "Washington DC",
          duration: "2-months",
          courseType: "backend",
          mode: "offline",
          domain: "Backend Development",
          track: "Offline",
          enrollmentDate: "2025-01-09",
          status: "active",
        },
        {
          id: "13",
          name: "Emily Davis",
          email: "emily.davis@giglabs.com",
          phone: "+1 (555) 113-1013",
          collegeName: "University of Florida",
          state: "Florida",
          duration: "1-month",
          courseType: "ui-ux",
          mode: "online",
          domain: "UI/UX Design",
          track: "Online",
          enrollmentDate: "2025-01-08",
          status: "inactive",
        },
        {
          id: "14",
          name: "Kevin Zhang",
          email: "kevin.zhang@giglabs.com",
          phone: "+1 (555) 114-1014",
          collegeName: "University of California Los Angeles",
          state: "California",
          duration: "3-months",
          courseType: "full-stack",
          mode: "online",
          domain: "Full Stack Development",
          track: "Online",
          enrollmentDate: "2025-01-07",
          status: "active",
        },
        {
          id: "15",
          name: "Sophia Martinez",
          email: "sophia.martinez@giglabs.com",
          phone: "+1 (555) 115-1015",
          collegeName: "Arizona State University",
          state: "Arizona",
          duration: "2-months",
          courseType: "frontend",
          mode: "online",
          domain: "Frontend Development",
          track: "Online",
          enrollmentDate: "2025-01-06",
          status: "active",
        },
        {
          id: "16",
          name: "Daniel Brown",
          email: "daniel.brown@giglabs.com",
          phone: "+1 (555) 116-1016",
          collegeName: "Ohio State University",
          state: "Ohio",
          duration: "3-months",
          courseType: "aiml",
          mode: "offline",
          domain: "AI/ML",
          track: "Offline",
          enrollmentDate: "2025-01-05",
          status: "active",
        },
        {
          id: "17",
          name: "Rachel Green",
          email: "rachel.green@giglabs.com",
          phone: "+1 (555) 117-1017",
          collegeName: "University of Virginia",
          state: "Virginia",
          duration: "1-month",
          courseType: "prompt-engineering",
          mode: "online",
          domain: "Prompt Engineering",
          track: "Online",
          enrollmentDate: "2025-01-04",
          status: "active",
        },
        {
          id: "18",
          name: "Jordan Taylor",
          email: "jordan.taylor@giglabs.com",
          phone: "+1 (555) 118-1018",
          collegeName: "University of Colorado",
          state: "Colorado",
          duration: "2-months",
          courseType: "backend",
          mode: "online",
          domain: "Backend Development",
          track: "Online",
          enrollmentDate: "2025-01-03",
          status: "inactive",
        },
        {
          id: "19",
          name: "Ashley Wilson",
          email: "ashley.wilson@giglabs.com",
          phone: "+1 (555) 119-1019",
          collegeName: "Penn State University",
          state: "Pennsylvania",
          duration: "3-months",
          courseType: "full-stack",
          mode: "online",
          domain: "Full Stack Development",
          track: "Online",
          enrollmentDate: "2025-01-02",
          status: "active",
        },
        {
          id: "20",
          name: "Christopher Lee",
          email: "christopher.lee@giglabs.com",
          phone: "+1 (555) 120-1020",
          collegeName: "University of Minnesota",
          state: "Minnesota",
          duration: "1-month",
          courseType: "ui-ux",
          mode: "offline",
          domain: "UI/UX Design",
          track: "Offline",
          enrollmentDate: "2025-01-01",
          status: "active",
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
    if (!formData.name || !formData.email || !formData.phone || !formData.collegeName || !formData.state || !formData.duration || !formData.courseType || !formData.mode || !formData.domain || !formData.track) {
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
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        collegeName: formData.collegeName,
        state: formData.state,
        duration: formData.duration,
        courseType: formData.courseType,
        mode: formData.mode,
        domain: formData.domain,
        track: formData.track,
        status: formData.status,
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
      phone: student.phone,
      collegeName: student.collegeName,
      state: student.state,
      duration: student.duration,
      courseType: student.courseType,
      mode: student.mode,
      domain: student.domain,
      track: student.track,
      status: student.status,
    });
    setIsDialogOpen(true);
  }, []);

  const handleInfo = useCallback((student: Student) => {
    setViewingStudent(student);
    setIsInfoDialogOpen(true);
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
      phone: "",
      collegeName: "",
      state: "",
      duration: "",
      courseType: "",
      mode: "",
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

  // Pagination logic
  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedStudents = filteredStudents.slice(startIndex, endIndex);

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

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
              {paginatedStudents.map((student) => (
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
                        onClick={() => handleInfo(student)}
                        aria-label="View student info"
                      >
                        <Info className="h-4 w-4" />
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredStudents.length)} of {filteredStudents.length} students
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={goToPreviousPage}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Previous
            </Button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={currentPage === page ? "default" : "outline"}
                size="sm"
                onClick={() => goToPage(page)}
                className="min-w-[40px]"
              >
                {page}
              </Button>
            ))}
            
            <Button
              variant="outline"
              size="sm"
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
            >
              Next
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      )}

      {/* Student Info Dialog */}
      <Dialog open={isInfoDialogOpen} onOpenChange={setIsInfoDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Student Information</DialogTitle>
          </DialogHeader>
          {viewingStudent && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Full Name</Label>
                  <p className="text-sm font-medium">{viewingStudent.name}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Email</Label>
                  <p className="text-sm">{viewingStudent.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Phone</Label>
                  <p className="text-sm">{viewingStudent.phone}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">College/University</Label>
                  <p className="text-sm">{viewingStudent.collegeName}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">State</Label>
                  <p className="text-sm">{viewingStudent.state}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Status</Label>
                  <Badge variant={viewingStudent.status === "active" ? "default" : "secondary"}>
                    {viewingStudent.status}
                  </Badge>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Course Duration</Label>
                  <p className="text-sm">{viewingStudent.duration}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Course Type</Label>
                  <p className="text-sm">{viewingStudent.courseType}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Mode</Label>
                  <p className="text-sm">{viewingStudent.mode}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Domain</Label>
                  <p className="text-sm">{viewingStudent.domain}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Track</Label>
                  <p className="text-sm">{viewingStudent.track}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium text-muted-foreground">Enrollment Date</Label>
                  <p className="text-sm">{viewingStudent.enrollmentDate}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInfoDialogOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingStudent ? "Edit" : "Add"} Student</DialogTitle>
          </DialogHeader>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="name">Full Name</Label>
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
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="collegeName">College Name</Label>
              <Input
                id="collegeName"
                value={formData.collegeName}
                onChange={(e) => setFormData({ ...formData, collegeName: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="duration">Course Duration</Label>
              <Select value={formData.duration} onValueChange={(v) => setFormData({ ...formData, duration: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1-month">1 Month</SelectItem>
                  <SelectItem value="2-months">2 Months</SelectItem>
                  <SelectItem value="3-months">3 Months</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="courseType">Course Type</Label>
              <Select value={formData.courseType} onValueChange={(v) => setFormData({ ...formData, courseType: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select course type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-stack">Full Stack</SelectItem>
                  <SelectItem value="frontend">Frontend</SelectItem>
                  <SelectItem value="backend">Backend</SelectItem>
                  <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                  <SelectItem value="aiml">AIML</SelectItem>
                  <SelectItem value="prompt-engineering">Prompt Engineering</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="mode">Mode</Label>
              <Select value={formData.mode} onValueChange={(v) => setFormData({ ...formData, mode: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select mode" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="online">Online</SelectItem>
                  <SelectItem value="offline">Offline</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="domain">Domain</Label>
              <Select value={formData.domain} onValueChange={(v) => setFormData({ ...formData, domain: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select domain" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AI/ML">AI/ML</SelectItem>
                  <SelectItem value="Full Stack Development">Full Stack Development</SelectItem>
                  <SelectItem value="Frontend Development">Frontend Development</SelectItem>
                  <SelectItem value="Backend Development">Backend Development</SelectItem>
                  <SelectItem value="UI/UX Design">UI/UX Design</SelectItem>
                  <SelectItem value="Data Science">Data Science</SelectItem>
                  <SelectItem value="DevOps">DevOps</SelectItem>
                  <SelectItem value="Cloud Computing">Cloud Computing</SelectItem>
                  <SelectItem value="Prompt Engineering">Prompt Engineering</SelectItem>
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
                  <SelectItem value="Hybrid">Hybrid</SelectItem>
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