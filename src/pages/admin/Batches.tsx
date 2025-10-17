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

interface Batch {
  id: string;
  name: string;
  course: string;
  tutor: string;
  startDate: string;
  endDate: string;
  students: number;
  status: "active" | "completed" | "upcoming";
}

export default function Batches() {
  const [batches, setBatches] = useState<Batch[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingBatch, setEditingBatch] = useState<Batch | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    course: "",
    tutor: "",
    startDate: "",
    endDate: "",
    students: 0,
    status: "upcoming" as "active" | "completed" | "upcoming",
  });

  useEffect(() => {
    loadBatches();
  }, []);

  const loadBatches = () => {
    const stored = localStorage.getItem("batches");
    if (stored) {
      setBatches(JSON.parse(stored));
    } else {
      // Initialize with sample data if none exists
      const sampleBatches: Batch[] = [
        {
          id: "1",
          name: "FSWD Batch Oct 2025",
          course: "Full Stack Web Development",
          tutor: "John Doe",
          startDate: "2025-10-20",
          endDate: "2026-01-15",
          students: 45,
          status: "active",
        },
        {
          id: "2",
          name: "AI/ML Batch Sep 2025",
          course: "AI & Machine Learning",
          tutor: "Jane Smith",
          startDate: "2025-09-15",
          endDate: "2026-01-10",
          students: 32,
          status: "active",
        },
        {
          id: "3",
          name: "AWS Cloud Batch Oct 2025",
          course: "Cloud Computing with AWS",
          tutor: "Mike Johnson",
          startDate: "2025-10-01",
          endDate: "2025-12-15",
          students: 28,
          status: "active",
        },
        {
          id: "4",
          name: "Data Science Batch Nov 2025",
          course: "Data Science & Analytics",
          tutor: "Sarah Williams",
          startDate: "2025-11-01",
          endDate: "2026-02-10",
          students: 0,
          status: "upcoming",
        },
        {
          id: "5",
          name: "React Native Batch Aug 2025",
          course: "Mobile App Development",
          tutor: "David Brown",
          startDate: "2025-08-01",
          endDate: "2025-10-15",
          students: 25,
          status: "completed",
        },
        {
          id: "6",
          name: "DevOps Batch Nov 2025",
          course: "DevOps & CI/CD Pipeline",
          tutor: "Emily Davis",
          startDate: "2025-11-15",
          endDate: "2026-01-20",
          students: 0,
          status: "upcoming",
        },
      ];
      saveBatches(sampleBatches);
    }
  };

  const saveBatches = useCallback((data: Batch[]) => {
    localStorage.setItem("batches", JSON.stringify(data));
    setBatches(data);
  }, []);

  const handleSubmit = useCallback(() => {
    if (!formData.name || !formData.course || !formData.startDate) {
      toast.error("Please fill all required fields");
      return;
    }

    if (editingBatch) {
      const updated = batches.map((b) =>
        b.id === editingBatch.id ? { ...editingBatch, ...formData } : b
      );
      saveBatches(updated);
      toast.success("Batch updated successfully");
    } else {
      const newBatch: Batch = {
        id: Date.now().toString(),
        ...formData,
      };
      saveBatches([...batches, newBatch]);
      toast.success("Batch added successfully");
    }

    setIsDialogOpen(false);
    resetForm();
  }, [formData, editingBatch, batches, saveBatches]);

  const handleEdit = useCallback((batch: Batch) => {
    setEditingBatch(batch);
    setFormData({
      name: batch.name,
      course: batch.course,
      tutor: batch.tutor,
      startDate: batch.startDate,
      endDate: batch.endDate,
      students: batch.students,
      status: batch.status,
    });
    setIsDialogOpen(true);
  }, []);

  const handleDelete = useCallback((id: string) => {
    saveBatches(batches.filter((b) => b.id !== id));
    toast.success("Batch deleted successfully");
  }, [batches, saveBatches]);

  const resetForm = useCallback(() => {
    setEditingBatch(null);
    setFormData({
      name: "",
      course: "",
      tutor: "",
      startDate: "",
      endDate: "",
      students: 0,
      status: "upcoming",
    });
  }, []);

  const filteredBatches = useMemo(() =>
    batches.filter((b) =>
      b.name.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [batches, searchQuery]
  );

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-display font-bold">Batches</h1>
        <Button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
          className="w-full sm:w-auto"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Batch
        </Button>
      </div>

      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search batches..."
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
                <TableHead className="whitespace-nowrap">Batch Name</TableHead>
                <TableHead className="whitespace-nowrap hidden md:table-cell">Course</TableHead>
                <TableHead className="whitespace-nowrap hidden lg:table-cell">Tutor</TableHead>
                <TableHead className="whitespace-nowrap hidden xl:table-cell">Start Date</TableHead>
                <TableHead className="whitespace-nowrap hidden xl:table-cell">End Date</TableHead>
                <TableHead className="whitespace-nowrap hidden lg:table-cell">Students</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBatches.map((batch) => (
                <TableRow key={batch.id}>
                  <TableCell className="font-medium whitespace-nowrap">{batch.name}</TableCell>
                  <TableCell className="hidden md:table-cell">{batch.course}</TableCell>
                  <TableCell className="hidden lg:table-cell">{batch.tutor}</TableCell>
                  <TableCell className="hidden xl:table-cell">{batch.startDate}</TableCell>
                  <TableCell className="hidden xl:table-cell">{batch.endDate}</TableCell>
                  <TableCell className="hidden lg:table-cell">{batch.students}</TableCell>
                  <TableCell>
                    <Badge
                      variant={
                        batch.status === "active"
                          ? "default"
                          : batch.status === "completed"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {batch.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(batch)}
                        aria-label="Edit batch"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(batch.id)}
                        aria-label="Delete batch"
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
            <DialogTitle>{editingBatch ? "Edit" : "Add"} Batch</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Batch Name</Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="course">Course</Label>
              <Input
                id="course"
                value={formData.course}
                onChange={(e) => setFormData({ ...formData, course: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="tutor">Tutor</Label>
              <Input
                id="tutor"
                value={formData.tutor}
                onChange={(e) => setFormData({ ...formData, tutor: e.target.value })}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="students">Number of Students</Label>
              <Input
                id="students"
                type="number"
                value={formData.students}
                onChange={(e) => setFormData({ ...formData, students: parseInt(e.target.value) || 0 })}
              />
            </div>
            <div>
              <Label htmlFor="status">Status</Label>
              <Select
                value={formData.status}
                onValueChange={(v) => setFormData({ ...formData, status: v as "active" | "completed" | "upcoming" })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              {editingBatch ? "Update" : "Add"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
          </div>
  );
}
