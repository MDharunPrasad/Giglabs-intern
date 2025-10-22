import { Video, Calendar, Clock, Users, ExternalLink, Plus, Bell, Mail, MessageCircle, Pencil } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { toast } from "sonner";

export default function LiveClasses() {
  const [isCreateMeetDialogOpen, setIsCreateMeetDialogOpen] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    title: "",
    date: "",
    time: "",
    duration: "",
    description: "",
    meetingLink: "",
    notifyWhatsApp: true,
    notifyEmail: true,
  });

  const [upcomingClasses, setUpcomingClasses] = useState([
    {
      id: "1",
      title: "React Advanced Patterns",
      instructor: "John Doe",
      date: "2025-10-20",
      time: "10:00 AM",
      duration: "2 hours",
      attendees: 45,
      meetingLink: "https://meet.google.com/abc-defg-hij",
    },
    {
      id: "2",
      title: "Machine Learning Workshop",
      instructor: "Jane Smith",
      date: "2025-10-22",
      time: "2:00 PM",
      duration: "3 hours",
      attendees: 32,
      meetingLink: "https://meet.google.com/xyz-mnop-qrs",
    },
  ]);

  const handleScheduleClass = () => {
    if (!scheduleForm.title || !scheduleForm.date || !scheduleForm.time) {
      toast.error("Please fill all required fields");
      return;
    }

    // Simulate scheduling and sending notifications
    const notifications = [];
    if (scheduleForm.notifyWhatsApp) {
      notifications.push("WhatsApp");
    }
    if (scheduleForm.notifyEmail) {
      notifications.push("Email");
    }

    const notificationText = notifications.length > 0
      ? ` Notifications sent via ${notifications.join(" and ")}.`
      : "";

    toast.success(`Live class scheduled successfully!${notificationText}`);

    // Reset form
    setScheduleForm({
      title: "",
      date: "",
      time: "",
      duration: "",
      description: "",
      meetingLink: "",
      notifyWhatsApp: true,
      notifyEmail: true,
    });
    setIsScheduleDialogOpen(false);
  };

  const sendReminder = (classItem: typeof upcomingClasses[0]) => {
    toast.success(`Reminder sent to all ${classItem.attendees} attendees via WhatsApp and Email!`);
  };

  const handleEditClass = (classItem: typeof upcomingClasses[0]) => {
    // Pre-fill form with existing class data
    setScheduleForm({
      title: classItem.title,
      date: classItem.date,
      time: classItem.time,
      duration: classItem.duration,
      description: "",
      meetingLink: classItem.meetingLink,
      notifyWhatsApp: true,
      notifyEmail: true,
    });
    setIsCreateMeetDialogOpen(true);
  };

  const handleCreateMeet = () => {
    if (!scheduleForm.title || !scheduleForm.date || !scheduleForm.time) {
      toast.error("Please fill all required fields");
      return;
    }

    // Create new meet object
    const newMeet = {
      id: Date.now().toString(),
      title: scheduleForm.title,
      instructor: "Current User", // You can replace this with actual user name
      date: scheduleForm.date,
      time: scheduleForm.time,
      duration: scheduleForm.duration || "1 hour",
      attendees: 0,
      meetingLink: scheduleForm.meetingLink || `https://meet.google.com/${Math.random().toString(36).substr(2, 9)}`,
    };

    // Add new meet to the list
    setUpcomingClasses(prev => [...prev, newMeet]);

    toast.success("Meet created successfully!");

    // Reset form
    setScheduleForm({
      title: "",
      date: "",
      time: "",
      duration: "",
      description: "",
      meetingLink: "",
      notifyWhatsApp: true,
      notifyEmail: true,
    });
    setIsCreateMeetDialogOpen(false);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent mb-2">
            Live Classes
          </h1>
          <p className="text-muted-foreground text-lg">
            Join live interactive sessions with your instructors
          </p>
        </div>
        <Button onClick={() => setIsCreateMeetDialogOpen(true)} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Create a Meet
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {upcomingClasses.map((session) => (
          <Card key={session.id} className="p-6 hover:shadow-xl transition-all">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-2">{session.title}</h3>
                <p className="text-sm text-muted-foreground">{session.instructor}</p>
              </div>
              <Badge variant="secondary">Upcoming</Badge>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="h-4 w-4 text-muted-foreground" />
                <span>{new Date(session.date).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span>{session.time} • {session.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Users className="h-4 w-4 text-muted-foreground" />
                <span>{session.attendees} registered</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <ExternalLink className="h-4 w-4 text-muted-foreground" />
                <a
                  href={session.meetingLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline truncate"
                >
                  Meeting Link
                </a>
              </div>
            </div>

            <div className="flex gap-2">
              <Button
                className="flex-1"
                onClick={() => handleEditClass(session)}
              >
                <Pencil className="h-4 w-4 mr-2" />
                Edit Class
              </Button>
              <Button
                variant="outline"
                onClick={() => sendReminder(session)}
              >
                <Bell className="h-4 w-4 mr-2" />
                Send Reminder
              </Button>
            </div>
          </Card>
        ))}
      </div>

      {/* Create Meet Dialog */}
      <Dialog open={isCreateMeetDialogOpen} onOpenChange={setIsCreateMeetDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create a Meet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="meet-title">Meet Title *</Label>
              <Input
                id="meet-title"
                placeholder="e.g., Team Standup Meeting"
                value={scheduleForm.title}
                onChange={(e) => setScheduleForm({ ...scheduleForm, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="meet-date">Date *</Label>
                <Input
                  id="meet-date"
                  type="date"
                  value={scheduleForm.date}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="meet-time">Time *</Label>
                <Input
                  id="meet-time"
                  type="time"
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="meet-duration">Duration</Label>
              <Input
                id="meet-duration"
                placeholder="e.g., 1 hour"
                value={scheduleForm.duration}
                onChange={(e) => setScheduleForm({ ...scheduleForm, duration: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meet-description">Description</Label>
              <Textarea
                id="meet-description"
                placeholder="Describe the purpose of this meeting..."
                rows={3}
                value={scheduleForm.description}
                onChange={(e) => setScheduleForm({ ...scheduleForm, description: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateMeetDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateMeet}>
              <Video className="h-4 w-4 mr-2" />
              Create Meet
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
