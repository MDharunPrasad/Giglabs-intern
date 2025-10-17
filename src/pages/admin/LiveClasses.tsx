import { Video, Calendar, Clock, Users, ExternalLink, Plus, Bell, Mail, MessageCircle } from "lucide-react";
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
  const [isScheduleDialogOpen, setIsScheduleDialogOpen] = useState(false);
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

  const upcomingClasses = [
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
  ];

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
        <Button onClick={() => setIsScheduleDialogOpen(true)} size="lg">
          <Plus className="h-5 w-5 mr-2" />
          Schedule New Class
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
              <Button className="flex-1">
                <Video className="h-4 w-4 mr-2" />
                Join Class
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

      {/* Schedule Class Dialog */}
      <Dialog open={isScheduleDialogOpen} onOpenChange={setIsScheduleDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Schedule New Live Class</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="title">Class Title *</Label>
              <Input
                id="title"
                placeholder="e.g., React Advanced Patterns"
                value={scheduleForm.title}
                onChange={(e) => setScheduleForm({ ...scheduleForm, title: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Date *</Label>
                <Input
                  id="date"
                  type="date"
                  value={scheduleForm.date}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, date: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Time *</Label>
                <Input
                  id="time"
                  type="time"
                  value={scheduleForm.time}
                  onChange={(e) => setScheduleForm({ ...scheduleForm, time: e.target.value })}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration</Label>
              <Input
                id="duration"
                placeholder="e.g., 2 hours"
                value={scheduleForm.duration}
                onChange={(e) => setScheduleForm({ ...scheduleForm, duration: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="meetingLink">Meeting Link</Label>
              <Input
                id="meetingLink"
                placeholder="https://meet.google.com/..."
                value={scheduleForm.meetingLink}
                onChange={(e) => setScheduleForm({ ...scheduleForm, meetingLink: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe what will be covered in this session..."
                rows={3}
                value={scheduleForm.description}
                onChange={(e) => setScheduleForm({ ...scheduleForm, description: e.target.value })}
              />
            </div>

            <div className="p-4 bg-muted/50 rounded-lg space-y-3">
              <Label className="text-base font-semibold">Notification Settings</Label>
              <p className="text-sm text-muted-foreground mb-3">
                Notify registered students about this class
              </p>
              
              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="whatsapp"
                  checked={scheduleForm.notifyWhatsApp}
                  onCheckedChange={(checked) => 
                    setScheduleForm({ ...scheduleForm, notifyWhatsApp: checked as boolean })
                  }
                />
                <label
                  htmlFor="whatsapp"
                  className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  <MessageCircle className="h-4 w-4 text-green-600" />
                  Send WhatsApp notification
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox 
                  id="email"
                  checked={scheduleForm.notifyEmail}
                  onCheckedChange={(checked) => 
                    setScheduleForm({ ...scheduleForm, notifyEmail: checked as boolean })
                  }
                />
                <label
                  htmlFor="email"
                  className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                >
                  <Mail className="h-4 w-4 text-blue-600" />
                  Send Email notification
                </label>
              </div>

              {(scheduleForm.notifyWhatsApp || scheduleForm.notifyEmail) && (
                <div className="mt-3 p-3 bg-accent/10 rounded-md border border-accent/20">
                  <p className="text-xs text-muted-foreground">
                    📢 Notifications will be sent to all registered students when you schedule this class.
                    {scheduleForm.notifyWhatsApp && " WhatsApp messages will include the meeting link and class details."}
                    {scheduleForm.notifyEmail && " Email will contain calendar invite and joining instructions."}
                  </p>
                </div>
              )}
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsScheduleDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleClass}>
              <Calendar className="h-4 w-4 mr-2" />
              Schedule Class
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
