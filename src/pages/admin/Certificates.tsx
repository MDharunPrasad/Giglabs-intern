import { Award, Download, Share2, Calendar, ExternalLink } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useState } from "react";
import { toast } from "sonner";

interface Certificate {
  id: string;
  courseTitle: string;
  completedDate: string;
  instructor: string;
  grade: number;
  credentialId: string;
  skills: string[];
}

export default function Certificates() {
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  // Mock data
  const certificates: Certificate[] = [
    {
      id: "1",
      courseTitle: "Cloud Computing with AWS",
      completedDate: "2025-10-15",
      instructor: "Mike Johnson",
      grade: 92,
      credentialId: "GIG-AWS-2025-001234",
      skills: ["AWS", "Cloud Architecture", "DevOps", "Scalability"],
    },
    {
      id: "2",
      courseTitle: "Full Stack Web Development",
      completedDate: "2025-09-20",
      instructor: "John Doe",
      grade: 88,
      credentialId: "GIG-FSWD-2025-005678",
      skills: ["React", "Node.js", "MongoDB", "RESTful APIs"],
    },
  ];

  const handleDownload = (certificate: Certificate) => {
    toast.success("Certificate downloaded successfully!");
  };

  const handleShare = (certificate: Certificate) => {
    navigator.clipboard.writeText(
      `https://giglabs.com/certificates/${certificate.credentialId}`
    );
    toast.success("Certificate link copied to clipboard!");
  };

  const CertificatePreview = ({ certificate }: { certificate: Certificate }) => (
    <div className="bg-gradient-to-br from-primary via-accent to-gold p-1 rounded-lg">
      <div className="bg-white dark:bg-card p-12 rounded-lg relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-primary/10 to-transparent rounded-full -mr-32 -mt-32" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-gradient-to-tr from-accent/10 to-transparent rounded-full -ml-24 -mb-24" />

        <div className="relative z-10">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-accent via-gold to-accent mx-auto mb-4 flex items-center justify-center shadow-xl">
              <Award className="h-10 w-10 text-white" />
            </div>
            <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent mb-2">
              Certificate of Completion
            </h1>
            <p className="text-muted-foreground">
              This certifies that
            </p>
          </div>

          {/* Name */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">Student Name</h2>
            <p className="text-lg text-muted-foreground">
              has successfully completed
            </p>
          </div>

          {/* Course */}
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold mb-4">{certificate.courseTitle}</h3>
            <p className="text-muted-foreground mb-2">
              Instructed by {certificate.instructor}
            </p>
            <p className="text-muted-foreground">
              Grade: <span className="font-bold text-accent">{certificate.grade}%</span>
            </p>
          </div>

          {/* Date and ID */}
          <div className="grid grid-cols-2 gap-8 mb-8 pt-8 border-t">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Completion Date</p>
              <p className="font-semibold">
                {new Date(certificate.completedDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">Credential ID</p>
              <p className="font-semibold font-mono text-sm">
                {certificate.credentialId}
              </p>
            </div>
          </div>

          {/* Signature */}
          <div className="flex justify-around pt-8 border-t">
            <div className="text-center">
              <div className="w-32 h-px bg-foreground/20 mb-2 mx-auto" />
              <p className="text-sm font-medium">Director</p>
              <p className="text-xs text-muted-foreground">GigLabs</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-px bg-foreground/20 mb-2 mx-auto" />
              <p className="text-sm font-medium">{certificate.instructor}</p>
              <p className="text-xs text-muted-foreground">Instructor</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent mb-2">
          My Certificates
        </h1>
        <p className="text-muted-foreground text-lg">
          Showcase your achievements and share with the world
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="p-6 bg-gradient-to-br from-accent/10 to-transparent border-accent/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Total Certificates</p>
              <p className="text-3xl font-bold">{certificates.length}</p>
            </div>
            <Award className="h-10 w-10 text-accent" />
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-gold/10 to-transparent border-gold/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Average Grade</p>
              <p className="text-3xl font-bold">
                {Math.round(
                  certificates.reduce((acc, c) => acc + c.grade, 0) /
                    certificates.length
                )}
                %
              </p>
            </div>
            <div className="p-3 rounded-xl bg-gold/10">
              <Calendar className="h-7 w-7 text-gold" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-primary/10 to-transparent border-primary/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground mb-1">Skills Acquired</p>
              <p className="text-3xl font-bold">
                {new Set(certificates.flatMap((c) => c.skills)).size}
              </p>
            </div>
            <div className="p-3 rounded-xl bg-primary/10">
              <ExternalLink className="h-7 w-7 text-primary" />
            </div>
          </div>
        </Card>
      </div>

      {/* Certificates Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {certificates.map((certificate) => (
          <Card
            key={certificate.id}
            className="overflow-hidden hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] bg-gradient-to-br from-card via-card to-card/50"
          >
            {/* Certificate Preview Thumbnail */}
            <div className="relative h-64 bg-gradient-to-br from-primary/10 via-accent/10 to-gold/10 p-6 flex flex-col justify-center items-center text-center border-b">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent via-gold to-accent flex items-center justify-center shadow-xl mb-4 animate-pulse">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="font-bold text-xl mb-2">{certificate.courseTitle}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                Completed on{" "}
                {new Date(certificate.completedDate).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
              <Badge className="bg-accent/20 text-accent border-accent/40">
                Grade: {certificate.grade}%
              </Badge>
            </div>

            {/* Certificate Info */}
            <div className="p-6 space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-1">
                  Credential ID
                </p>
                <p className="font-mono text-sm">{certificate.credentialId}</p>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">
                  Skills Acquired
                </p>
                <div className="flex flex-wrap gap-2">
                  {certificate.skills.map((skill, index) => (
                    <Badge key={index} variant="secondary">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex gap-2 pt-2">
                <Button
                  className="flex-1"
                  onClick={() => {
                    setSelectedCertificate(certificate);
                    setIsPreviewOpen(true);
                  }}
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleDownload(certificate)}
                >
                  <Download className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => handleShare(certificate)}
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {certificates.length === 0 && (
        <div className="text-center py-16">
          <Award className="h-20 w-20 mx-auto text-muted-foreground mb-4 opacity-50" />
          <h3 className="text-2xl font-semibold mb-2">No certificates yet</h3>
          <p className="text-muted-foreground mb-4">
            Complete courses to earn your first certificate
          </p>
          <Button>Browse Courses</Button>
        </div>
      )}

      {/* Certificate Preview Dialog */}
      <Dialog open={isPreviewOpen} onOpenChange={setIsPreviewOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Certificate Preview</DialogTitle>
          </DialogHeader>
          {selectedCertificate && (
            <div className="py-4">
              <CertificatePreview certificate={selectedCertificate} />
              <div className="flex gap-4 mt-6">
                <Button
                  className="flex-1"
                  onClick={() => handleDownload(selectedCertificate)}
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download Certificate
                </Button>
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => handleShare(selectedCertificate)}
                >
                  <Share2 className="h-4 w-4 mr-2" />
                  Share on LinkedIn
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
