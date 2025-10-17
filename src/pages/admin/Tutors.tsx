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

interface Tutor {
  id: string;
  name: string;
  email: string;
  expertise: string;
  experience: string;
  status: "active" | "inactive";
}

export default function Tutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    expertise: "",
    experience: "",
    status: "active" as "active" | "inactive",
  });

  useEffect(() => {
    loadTutors();
  }, []);

  const loadTutors = () => {
    const stored = localStorage.getItem("tutors");
    if (stored) {
      setTutors(JSON.parse(stored));
    } else {
      // Initialize with sample data if none exists
      const sampleTutors: Tutor[] = [
        {
          id: "1",
          name: "John Doe",
          email: "john.doe@giglabs.com",
          expertise: "Full Stack Development, React, Node.js",
          experience: "8 years",
          status: "active",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane.smith@giglabs.com",
          expertise: "AI/ML, Python, TensorFlow",
          experience: "10 years",
          status: "active",
        },
        {
          id: "3",
          name: "Mike Johnson",
          email: "mike.johnson@giglabs.com",
          expertise: "Cloud Computing, AWS, DevOps",
          experience: "12 years",
          status: "active",
        },
        {
          id: "4",
          name: "Sarah Williams",
          email: "sarah.williams@giglabs.com",
          expertise: "Data Science, Analytics, Python",
          experience: "7 years",
          status: "active",
        },
        {
          id: "5",
          name: "David Brown",
          email: "david.brown@giglabs.com",
          expertise: "Mobile Development, React Native",
          experience: "6 years",
          status: "active",
        },
        {
          id: "6",
          name: "Emily Davis",
          email: "emily.davis@giglabs.com",
          expertise: "DevOps, Kubernetes, CI/CD",
          experience: "9 years",
          status: "active",
        },
      ];
      saveTutors(sampleTutors);
    }
  };

  const saveTutors = useCallback((data: Tutor[]) => {
    localStorage.setItem("tutors", JSON.stringify(data));
    setTutors(data);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!formData.name || !formData.email || !formData.expertise) {
      toast.error("Please fill all required fields");
      return;
    }

    if (editingTutor) {
      const updated = tutors.map((t) =>
        t.id === editingTutor.id ? { ...editingTutor, ...formData } : t
      );
      saveTutors(updated);
      toast.success("Tutor updated successfully");
    } else {
      const newTutor: Tutor = {
        id: Date.now().toString(),
        ...formData,
      };
      saveTutors([...tutors, newTutor]);
      toast.success("Tutor added successfully");
    }

    setIsDialogOpen(false);
    resetForm();
  }, [formData, editingTutor, tutors, saveTutors]);

  const handleEdit = useCallback((tutor: Tutor) => {
    setEditingTutor(tutor);
    setFormData({
      name: tutor.name,
      email: tutor.email,
      expertise: tutor.expertise,
      experience: tutor.experience,
      status: tutor.status,
    });
    setIsDialogOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    saveTutors(tutors.filter((t) => t.id !== id));
    toast.success("Tutor deleted successfully");
  }, [tutors, saveTutors]);

  const resetForm = useCallback(() => {
    setEditingTutor(null);
    setFormData({
      name: "",
      email: "",
      expertise: "",
      experience: "",
      status: "active",
    });
  }, []);

  const filteredTutors = useMemo(() =>
    tutors.filter(
      (t) =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        t.email.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [tutors, searchQuery]
  );

  return (
          <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-display font-bold">Tutors</h1>
        <Button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Tutor
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search tutors..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      <div className="bg-card rounded-lg border shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Expertise</TableHead>
              <TableHead>Experience</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTutors.map((tutor) => (
              <TableRow key={tutor.id}>
                <TableCell className="font-medium">{tutor.name}</TableCell>
                <TableCell>{tutor.email}</TableCell>
                <TableCell>{tutor.expertise}</TableCell>
                <TableCell>{tutor.experience}</TableCell>
                <TableCell>
                  <Badge variant={tutor.status === "active" ? "default" : "secondary"}>
                    {tutor.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(tutor)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(tutor.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingTutor ? "Edit" : "Add"} Tutor</DialogTitle>
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
              <Label htmlFor="expertise">Expertise</Label>
              <Select value={formData.expertise} onValueChange={(v) => setFormData({ ...formData, expertise: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select expertise" />
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
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                value={formData.experience}
                onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                placeholder="e.g., 5 years"
              />
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
              {editingTutor ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
          </div>
  );
}
