import { useState, useEffect } from "react";
import { Plus, Search, Pencil, Trash2 } from "lucide-react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AdminSidebar } from "@/components/AdminSidebar";
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
    }
  };

  const saveTutors = (data: Tutor[]) => {
    localStorage.setItem("tutors", JSON.stringify(data));
    setTutors(data);
  };

  const handleSubmit = () => {
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
  };

  const handleEdit = (tutor: Tutor) => {
    setEditingTutor(tutor);
    setFormData({
      name: tutor.name,
      email: tutor.email,
      expertise: tutor.expertise,
      experience: tutor.experience,
      status: tutor.status,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    saveTutors(tutors.filter((t) => t.id !== id));
    toast.success("Tutor deleted successfully");
  };

  const resetForm = () => {
    setEditingTutor(null);
    setFormData({
      name: "",
      email: "",
      expertise: "",
      experience: "",
      status: "active",
    });
  };

  const filteredTutors = tutors.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AdminSidebar />
        <div className="flex-1">
          <header className="border-b bg-card px-6 py-4 flex items-center gap-4">
            <SidebarTrigger />
            <h1 className="text-2xl font-display font-bold">LearnHub Admin</h1>
          </header>
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
        </div>
      </div>
    </SidebarProvider>
  );
}
