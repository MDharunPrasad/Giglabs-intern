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
    }
  };

  const saveBatches = (data: Batch[]) => {
    localStorage.setItem("batches", JSON.stringify(data));
    setBatches(data);
  };

  const handleSubmit = () => {
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
  };

  const handleEdit = (batch: Batch) => {
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
  };

  const handleDelete = (id: string) => {
    saveBatches(batches.filter((b) => b.id !== id));
    toast.success("Batch deleted successfully");
  };

  const resetForm = () => {
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
  };

  const filteredBatches = batches.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase())
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
        <h1 className="text-3xl font-display font-bold">Batches</h1>
        <Button
          onClick={() => {
            resetForm();
            setIsDialogOpen(true);
          }}
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

      <div className="bg-card rounded-lg border shadow-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Batch Name</TableHead>
              <TableHead>Course</TableHead>
              <TableHead>Tutor</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Students</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredBatches.map((batch) => (
              <TableRow key={batch.id}>
                <TableCell className="font-medium">{batch.name}</TableCell>
                <TableCell>{batch.course}</TableCell>
                <TableCell>{batch.tutor}</TableCell>
                <TableCell>{batch.startDate}</TableCell>
                <TableCell>{batch.endDate}</TableCell>
                <TableCell>{batch.students}</TableCell>
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
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleEdit(batch)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleDelete(batch.id)}
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
        </div>
      </div>
    </SidebarProvider>
  );
}
