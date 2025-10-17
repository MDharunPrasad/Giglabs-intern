import { FileText, Download, Search, Filter } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function Materials() {
  const [searchQuery, setSearchQuery] = useState("");

  const materials = [
    {
      id: "1",
      title: "Full Stack Development Guide",
      course: "Full Stack Web Development",
      type: "PDF",
      size: "5.2 MB",
      uploadedDate: "2025-10-01",
    },
    {
      id: "2",
      title: "React Hooks Cheat Sheet",
      course: "Full Stack Web Development",
      type: "PDF",
      size: "1.8 MB",
      uploadedDate: "2025-10-05",
    },
    {
      id: "3",
      title: "Machine Learning Datasets",
      course: "AI & ML Fundamentals",
      type: "ZIP",
      size: "45 MB",
      uploadedDate: "2025-09-28",
    },
  ];

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent mb-2">
        Course Materials
      </h1>
      <p className="text-muted-foreground text-lg mb-8">
        Access and download all your course resources
      </p>

      <div className="flex gap-4 mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search materials..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        <Button variant="outline">
          <Filter className="h-4 w-4 mr-2" />
          Filter
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {materials.map((material) => (
          <Card key={material.id} className="p-6 hover:shadow-xl transition-all">
            <div className="flex items-start gap-3 mb-4">
              <div className="p-3 rounded-lg bg-primary/10">
                <FileText className="h-6 w-6 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold mb-1 line-clamp-2">{material.title}</h3>
                <p className="text-sm text-muted-foreground">{material.course}</p>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Type:</span>
                <Badge variant="secondary">{material.type}</Badge>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Size:</span>
                <span>{material.size}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Uploaded:</span>
                <span>{new Date(material.uploadedDate).toLocaleDateString()}</span>
              </div>
            </div>

            <Button className="w-full" variant="outline">
              <Download className="h-4 w-4 mr-2" />
              Download
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
}
