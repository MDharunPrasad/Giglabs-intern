import { useState, useEffect, useMemo, useCallback } from "react";
import { Plus, Search, Pencil, Trash2, ChevronLeft, ChevronRight } from "lucide-react";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
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
  company: string;
  expertise: string;
  experience: string;
  status: "active" | "inactive";
}

export default function Tutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [tutorToDelete, setTutorToDelete] = useState<Tutor | null>(null);
  const [editingTutor, setEditingTutor] = useState<Tutor | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
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
          company: "Google",
          expertise: "Fullstack",
          experience: "8 years",
          status: "active",
        },
        {
          id: "2",
          name: "Jane Smith",
          email: "jane.smith@giglabs.com",
          company: "Microsoft",
          expertise: "UI/UX",
          experience: "10 years",
          status: "active",
        },
        {
          id: "3",
          name: "Mike Johnson",
          email: "mike.johnson@giglabs.com",
          company: "GigLabs",
          expertise: "Backend",
          experience: "12 years",
          status: "active",
        },
        {
          id: "4",
          name: "Sarah Williams",
          email: "sarah.williams@giglabs.com",
          company: "Zoho",
          expertise: "Frontend",
          experience: "7 years",
          status: "active",
        },
        {
          id: "5",
          name: "David Brown",
          email: "david.brown@giglabs.com",
          company: "Accenture",
          expertise: "UI/UX",
          experience: "6 years",
          status: "active",
        },
        {
          id: "6",
          name: "Emily Davis",
          email: "emily.davis@giglabs.com",
          company: "Freelancer",
          expertise: "Backend",
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
    if (!formData.name || !formData.email || !formData.company || !formData.expertise) {
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
      company: tutor.company,
      expertise: tutor.expertise,
      experience: tutor.experience,
      status: tutor.status,
    });
    setIsDialogOpen(true);
  }, []);

  const handleDeleteClick = useCallback((tutor: Tutor) => {
    setTutorToDelete(tutor);
    setIsDeleteDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback(() => {
    if (tutorToDelete) {
      saveTutors(tutors.filter((t) => t.id !== tutorToDelete.id));
      toast.success("Tutor deleted successfully");
      setIsDeleteDialogOpen(false);
      setTutorToDelete(null);
    }
  }, [tutorToDelete, tutors, saveTutors]);

  const handleDeleteCancel = useCallback(() => {
    setIsDeleteDialogOpen(false);
    setTutorToDelete(null);
  }, []);

  const resetForm = useCallback(() => {
    setEditingTutor(null);
    setFormData({
      name: "",
      email: "",
      company: "",
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

  // Pagination logic
  const totalPages = Math.ceil(filteredTutors.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedTutors = filteredTutors.slice(startIndex, endIndex);

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
        <h1 className="text-2xl md:text-3xl font-display font-bold">Tutors</h1>
        <Button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
          className="w-full sm:w-auto"
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

      <div className="bg-card rounded-lg border shadow-md overflow-hidden">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="whitespace-nowrap">Name</TableHead>
                <TableHead className="whitespace-nowrap hidden md:table-cell">Email</TableHead>
                <TableHead className="whitespace-nowrap">Company</TableHead>
                <TableHead className="whitespace-nowrap">Expertise</TableHead>
                <TableHead className="whitespace-nowrap hidden lg:table-cell">Experience</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedTutors.map((tutor) => (
                <TableRow key={tutor.id}>
                  <TableCell className="font-medium whitespace-nowrap">{tutor.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{tutor.email}</TableCell>
                  <TableCell className="whitespace-nowrap">{tutor.company}</TableCell>
                  <TableCell className="whitespace-nowrap">{tutor.expertise}</TableCell>
                  <TableCell className="hidden lg:table-cell">{tutor.experience}</TableCell>
                  <TableCell>
                    <Badge variant={tutor.status === "active" ? "default" : "secondary"}>
                      {tutor.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(tutor)}
                        aria-label="Edit tutor"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteClick(tutor)}
                        aria-label="Delete tutor"
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
            Showing {startIndex + 1}-{Math.min(endIndex, filteredTutors.length)} of {filteredTutors.length} tutors
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
              <Label htmlFor="company">Company</Label>
              <Input
                id="company"
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="e.g., Google, Microsoft, GigLabs, Zoho, Accenture, or Freelancer"
              />
            </div>
            <div>
              <Label htmlFor="expertise">Expertise</Label>
              <Select value={formData.expertise} onValueChange={(v) => setFormData({ ...formData, expertise: v })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select expertise" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="UI/UX">UI/UX</SelectItem>
                  <SelectItem value="Fullstack">Fullstack</SelectItem>
                  <SelectItem value="Frontend">Frontend</SelectItem>
                  <SelectItem value="Backend">Backend</SelectItem>
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

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete{" "}
              <span className="font-semibold">{tutorToDelete?.name}</span> from the tutors list.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={handleDeleteCancel}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
          </div>
  );
}
