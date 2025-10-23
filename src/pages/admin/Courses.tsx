import { useState, useEffect, useMemo, useCallback } from "react";
import { Plus, Search, Pencil, Trash2, ChevronLeft, ChevronRight, Upload, Download, Image, FileArchive } from "lucide-react";
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
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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
  linkedinBadge?: string; // Base64 or URL for LinkedIn badge image
  resourceFiles?: string; // Base64 or URL for resource zip file
  certificate?: string; // Base64 or URL for certificate file
  linkedinBadgeName?: string; // Original filename
  resourceFilesName?: string; // Original filename
  certificateName?: string; // Original filename
}

export default function Courses() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    domain: "",
    duration: "",
    level: "",
    modules: 0,
    status: "active" as "active" | "draft",
    linkedinBadge: "",
    resourceFiles: "",
    certificate: "",
    linkedinBadgeName: "",
    resourceFilesName: "",
    certificateName: "",
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

  const handleFileUpload = useCallback((file: File, type: 'linkedinBadge' | 'resourceFiles' | 'certificate') => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setFormData(prev => ({
        ...prev,
        [type]: result,
        [`${type}Name`]: file.name
      }));
    };
    reader.readAsDataURL(file);
  }, []);

  const handleLinkedInBadgeUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        toast.error("Please upload an image file for LinkedIn badge");
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        toast.error("File size should be less than 5MB");
        return;
      }
      handleFileUpload(file, 'linkedinBadge');
      toast.success("LinkedIn badge uploaded successfully");
    }
  }, [handleFileUpload]);

  const handleResourceFilesUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.name.endsWith('.zip')) {
        toast.error("Please upload a ZIP file for resources");
        return;
      }
      if (file.size > 50 * 1024 * 1024) { // 50MB limit
        toast.error("File size should be less than 50MB");
        return;
      }
      handleFileUpload(file, 'resourceFiles');
      toast.success("Resource files uploaded successfully");
    }
  }, [handleFileUpload]);

  const handleCertificateUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (!file.type.includes('pdf') && !file.name.endsWith('.pdf')) {
        toast.error("Please upload a PDF file for certificate");
        return;
      }
      if (file.size > 10 * 1024 * 1024) { // 10MB limit
        toast.error("File size should be less than 10MB");
        return;
      }
      handleFileUpload(file, 'certificate');
      toast.success("Certificate uploaded successfully");
    }
  }, [handleFileUpload]);

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
      linkedinBadge: course.linkedinBadge || "",
      resourceFiles: course.resourceFiles || "",
      certificate: course.certificate || "",
      linkedinBadgeName: course.linkedinBadgeName || "",
      resourceFilesName: course.resourceFilesName || "",
      certificateName: course.certificateName || "",
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
      linkedinBadge: "",
      resourceFiles: "",
      certificate: "",
      linkedinBadgeName: "",
      resourceFilesName: "",
      certificateName: "",
    });
  }, []);

  const filteredCourses = useMemo(() =>
    courses.filter((c) =>
      c.title.toLowerCase().includes(searchQuery.toLowerCase())
    ),
    [courses, searchQuery]
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredCourses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedCourses = filteredCourses.slice(startIndex, endIndex);

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
                <TableHead className="whitespace-nowrap hidden sm:table-cell">Domain</TableHead>
                <TableHead className="whitespace-nowrap hidden md:table-cell">Duration</TableHead>
                <TableHead className="whitespace-nowrap hidden lg:table-cell">Modules</TableHead>
                <TableHead className="whitespace-nowrap">Resources</TableHead>
                <TableHead className="whitespace-nowrap">Status</TableHead>
                <TableHead className="text-right whitespace-nowrap">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedCourses.map((course) => (
                <TableRow key={course.id}>
                  <TableCell className="font-medium">{course.title}</TableCell>
                  <TableCell className="whitespace-nowrap hidden sm:table-cell">{course.domain}</TableCell>
                  <TableCell className="hidden md:table-cell">{course.duration}</TableCell>
                  <TableCell className="hidden lg:table-cell">{course.modules}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 flex-wrap">
                      {course.linkedinBadge && (
                        <Badge variant="outline" className="text-xs">
                          <Image className="w-3 h-3 mr-1" />
                          Badge
                        </Badge>
                      )}
                      {course.resourceFiles && (
                        <Badge variant="outline" className="text-xs">
                          <FileArchive className="w-3 h-3 mr-1" />
                          Resources
                        </Badge>
                      )}
                      {course.certificate && (
                        <Badge variant="outline" className="text-xs">
                          <Download className="w-3 h-3 mr-1" />
                          Certificate
                        </Badge>
                      )}
                      {!course.linkedinBadge && !course.resourceFiles && !course.certificate && (
                        <span className="text-xs text-muted-foreground">No files</span>
                      )}
                    </div>
                  </TableCell>
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

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-muted-foreground">
            Showing {startIndex + 1}-{Math.min(endIndex, filteredCourses.length)} of {filteredCourses.length} courses
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

            {/* File Upload Section */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Course Resources</h3>
              
              {/* LinkedIn Badge Upload */}
              <div>
                <Label htmlFor="linkedinBadge">LinkedIn Achievement Badge</Label>
                <div className="mt-2">
                  {formData.linkedinBadge ? (
                    <div className="flex items-center gap-3 p-3 border rounded-lg bg-green-50">
                      <Image className="w-5 h-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800">{formData.linkedinBadgeName}</p>
                        <p className="text-xs text-green-600">Badge uploaded successfully</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFormData({ ...formData, linkedinBadge: "", linkedinBadgeName: "" })}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        id="linkedinBadge"
                        accept="image/*"
                        onChange={handleLinkedInBadgeUpload}
                        className="hidden"
                      />
                      <label htmlFor="linkedinBadge" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm font-medium text-gray-600">Upload LinkedIn Badge</p>
                        <p className="text-xs text-gray-500">PNG, JPG up to 5MB</p>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Resource Files Upload */}
              <div>
                <Label htmlFor="resourceFiles">Course Resources (ZIP)</Label>
                <div className="mt-2">
                  {formData.resourceFiles ? (
                    <div className="flex items-center gap-3 p-3 border rounded-lg bg-green-50">
                      <FileArchive className="w-5 h-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800">{formData.resourceFilesName}</p>
                        <p className="text-xs text-green-600">Resources uploaded successfully</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFormData({ ...formData, resourceFiles: "", resourceFilesName: "" })}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        id="resourceFiles"
                        accept=".zip"
                        onChange={handleResourceFilesUpload}
                        className="hidden"
                      />
                      <label htmlFor="resourceFiles" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm font-medium text-gray-600">Upload Resource Files</p>
                        <p className="text-xs text-gray-500">ZIP file up to 50MB</p>
                      </label>
                    </div>
                  )}
                </div>
              </div>

              {/* Certificate Upload */}
              <div>
                <Label htmlFor="certificate">Course Certificate (PDF)</Label>
                <div className="mt-2">
                  {formData.certificate ? (
                    <div className="flex items-center gap-3 p-3 border rounded-lg bg-green-50">
                      <Download className="w-5 h-5 text-green-600" />
                      <div className="flex-1">
                        <p className="text-sm font-medium text-green-800">{formData.certificateName}</p>
                        <p className="text-xs text-green-600">Certificate uploaded successfully</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setFormData({ ...formData, certificate: "", certificateName: "" })}
                      >
                        Remove
                      </Button>
                    </div>
                  ) : (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                      <input
                        type="file"
                        id="certificate"
                        accept=".pdf"
                        onChange={handleCertificateUpload}
                        className="hidden"
                      />
                      <label htmlFor="certificate" className="cursor-pointer">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm font-medium text-gray-600">Upload Certificate</p>
                        <p className="text-xs text-gray-500">PDF file up to 10MB</p>
                      </label>
                    </div>
                  )}
                </div>
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
