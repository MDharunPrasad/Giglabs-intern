/**
 * TutorLiveSessions - Live Sessions Management for Tutors
 * 
 * Features:
 * - Live Sessions management with CRUD operations
 * - Clean table layout with session details
 * - Unified form for adding/editing sessions
 * - Notification settings (WhatsApp & Email)
 * - Status tracking (upcoming, live, completed)
 * - Responsive design matching the existing theme
 */

import { Video, Calendar, Clock, Users, ExternalLink, Plus, Bell, Mail, MessageCircle, Edit, Trash2, Play } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
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
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface LiveSession {
    id: string;
    title: string;
    date: string;
    time: string;
    duration: string;
    description: string;
    meetingLink: string;
    attendees: number;
    status: "upcoming" | "live" | "completed";
    notifyWhatsApp: boolean;
    notifyEmail: boolean;
}

export default function TutorLiveSessions() {
    const [isSessionDialogOpen, setIsSessionDialogOpen] = useState(false);
    const [editingSession, setEditingSession] = useState<LiveSession | null>(null);
    const [sessions, setSessions] = useState<LiveSession[]>([
        {
            id: "1",
            title: "React Advanced Patterns",
            date: "2025-01-25",
            time: "10:00",
            duration: "2 hours",
            description: "Deep dive into React patterns and best practices",
            meetingLink: "https://meet.google.com/abc-defg-hij",
            attendees: 45,
            status: "upcoming",
            notifyWhatsApp: true,
            notifyEmail: true,
        },
        {
            id: "2",
            title: "Machine Learning Workshop",
            date: "2025-01-27",
            time: "14:00",
            duration: "3 hours",
            description: "Introduction to ML algorithms and implementation",
            meetingLink: "https://meet.google.com/xyz-mnop-qrs",
            attendees: 32,
            status: "upcoming",
            notifyWhatsApp: true,
            notifyEmail: true,
        },
        {
            id: "3",
            title: "JavaScript Fundamentals",
            date: "2025-01-20",
            time: "09:00",
            duration: "1.5 hours",
            description: "Core JavaScript concepts and ES6+ features",
            meetingLink: "https://meet.google.com/js-fundamentals",
            attendees: 28,
            status: "completed",
            notifyWhatsApp: false,
            notifyEmail: true,
        },
    ]);

    const [sessionForm, setSessionForm] = useState({
        title: "",
        date: "",
        time: "",
        duration: "",
        description: "",
        meetingLink: "",
        notifyWhatsApp: true,
        notifyEmail: true,
    });

    const handleOpenDialog = (session?: LiveSession) => {
        if (session) {
            setEditingSession(session);
            setSessionForm({
                title: session.title,
                date: session.date,
                time: session.time,
                duration: session.duration,
                description: session.description,
                meetingLink: session.meetingLink,
                notifyWhatsApp: session.notifyWhatsApp,
                notifyEmail: session.notifyEmail,
            });
        } else {
            setEditingSession(null);
            setSessionForm({
                title: "",
                date: "",
                time: "",
                duration: "",
                description: "",
                meetingLink: "",
                notifyWhatsApp: true,
                notifyEmail: true,
            });
        }
        setIsSessionDialogOpen(true);
    };

    const handleSaveSession = () => {
        if (!sessionForm.title || !sessionForm.date || !sessionForm.time) {
            toast.error("Please fill all required fields");
            return;
        }

        const sessionData: LiveSession = {
            id: editingSession?.id || Date.now().toString(),
            title: sessionForm.title,
            date: sessionForm.date,
            time: sessionForm.time,
            duration: sessionForm.duration,
            description: sessionForm.description,
            meetingLink: sessionForm.meetingLink,
            attendees: editingSession?.attendees || 0,
            status: editingSession?.status || "upcoming",
            notifyWhatsApp: sessionForm.notifyWhatsApp,
            notifyEmail: sessionForm.notifyEmail,
        };

        if (editingSession) {
            setSessions(prev => prev.map(s => s.id === editingSession.id ? sessionData : s));
            toast.success("Live session updated successfully!");
        } else {
            setSessions(prev => [...prev, sessionData]);
            toast.success("Live session created successfully!");
        }

        setIsSessionDialogOpen(false);
        setEditingSession(null);
    };

    const handleDeleteSession = (sessionId: string) => {
        setSessions(prev => prev.filter(s => s.id !== sessionId));
        toast.success("Live session deleted successfully!");
    };

    const sendReminder = (session: LiveSession) => {
        const notifications = [];
        if (session.notifyWhatsApp) notifications.push("WhatsApp");
        if (session.notifyEmail) notifications.push("Email");

        const notificationText = notifications.length > 0
            ? ` via ${notifications.join(" and ")}`
            : "";

        toast.success(`Reminder sent to all ${session.attendees} attendees${notificationText}!`);
    };

    const getStatusBadge = (status: LiveSession["status"]) => {
        const variants = {
            upcoming: "secondary",
            live: "destructive",
            completed: "default",
        } as const;

        const colors = {
            upcoming: "bg-blue-100 text-blue-800",
            live: "bg-red-100 text-red-800",
            completed: "bg-green-100 text-green-800",
        };

        return (
            <Badge variant={variants[status]} className={colors[status]}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
            </Badge>
        );
    };

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const displayHour = hour % 12 || 12;
        return `${displayHour}:${minutes} ${ampm}`;
    };

    return (
        <div className="p-6 max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-4xl font-display font-bold bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent mb-2">
                        Live Sessions Management
                    </h1>
                    <p className="text-muted-foreground text-lg">
                        Manage your live teaching sessions and student interactions
                    </p>
                </div>
                <Button onClick={() => handleOpenDialog()} size="lg">
                    <Plus className="h-5 w-5 mr-2" />
                    Create New Session
                </Button>
            </div>

            {/* Sessions Table */}
            <Card className="overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Session Title</TableHead>
                            <TableHead>Date & Time</TableHead>
                            <TableHead>Duration</TableHead>
                            <TableHead>Attendees</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {sessions.map((session) => (
                            <TableRow key={session.id} className="hover:bg-muted/50">
                                <TableCell>
                                    <div>
                                        <div className="font-semibold">{session.title}</div>
                                        <div className="text-sm text-muted-foreground truncate max-w-xs">
                                            {session.description}
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="h-4 w-4 text-muted-foreground" />
                                            <span>{new Date(session.date).toLocaleDateString()}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="h-4 w-4 text-muted-foreground" />
                                            <span>{formatTime(session.time)}</span>
                                        </div>
                                    </div>
                                </TableCell>
                                <TableCell>{session.duration}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Users className="h-4 w-4 text-muted-foreground" />
                                        <span>{session.attendees}</span>
                                    </div>
                                </TableCell>
                                <TableCell>{getStatusBadge(session.status)}</TableCell>
                                <TableCell>
                                    <div className="flex items-center gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleOpenDialog(session)}
                                        >
                                            <Edit className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => sendReminder(session)}
                                        >
                                            <Bell className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleDeleteSession(session.id)}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                        {session.meetingLink && (
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => window.open(session.meetingLink, '_blank')}
                                            >
                                                <Play className="h-4 w-4" />
                                            </Button>
                                        )}
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>

            {/* Session Dialog */}
            <Dialog open={isSessionDialogOpen} onOpenChange={setIsSessionDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {editingSession ? "Edit Live Session" : "Create New Live Session"}
                        </DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="title">Session Title *</Label>
                            <Input
                                id="title"
                                placeholder="e.g., React Advanced Patterns"
                                value={sessionForm.title}
                                onChange={(e) => setSessionForm({ ...sessionForm, title: e.target.value })}
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="date">Date *</Label>
                                <Input
                                    id="date"
                                    type="date"
                                    value={sessionForm.date}
                                    onChange={(e) => setSessionForm({ ...sessionForm, date: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="time">Time *</Label>
                                <Input
                                    id="time"
                                    type="time"
                                    value={sessionForm.time}
                                    onChange={(e) => setSessionForm({ ...sessionForm, time: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="duration">Duration</Label>
                            <Input
                                id="duration"
                                placeholder="e.g., 2 hours"
                                value={sessionForm.duration}
                                onChange={(e) => setSessionForm({ ...sessionForm, duration: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="meetingLink">Meeting Link</Label>
                            <Input
                                id="meetingLink"
                                placeholder="https://meet.google.com/..."
                                value={sessionForm.meetingLink}
                                onChange={(e) => setSessionForm({ ...sessionForm, meetingLink: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                placeholder="Describe what will be covered in this session..."
                                rows={3}
                                value={sessionForm.description}
                                onChange={(e) => setSessionForm({ ...sessionForm, description: e.target.value })}
                            />
                        </div>

                        <div className="p-4 bg-muted/50 rounded-lg space-y-3">
                            <Label className="text-base font-semibold">Notification Settings</Label>
                            <p className="text-sm text-muted-foreground mb-3">
                                Notify registered students about this session
                            </p>

                            <div className="flex items-center space-x-2">
                                <Checkbox
                                    id="whatsapp"
                                    checked={sessionForm.notifyWhatsApp}
                                    onCheckedChange={(checked) =>
                                        setSessionForm({ ...sessionForm, notifyWhatsApp: checked as boolean })
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
                                    checked={sessionForm.notifyEmail}
                                    onCheckedChange={(checked) =>
                                        setSessionForm({ ...sessionForm, notifyEmail: checked as boolean })
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

                            {(sessionForm.notifyWhatsApp || sessionForm.notifyEmail) && (
                                <div className="mt-3 p-3 bg-accent/10 rounded-md border border-accent/20">
                                    <p className="text-xs text-muted-foreground">
                                        📢 Notifications will be sent to all registered students when you save this session.
                                        {sessionForm.notifyWhatsApp && " WhatsApp messages will include the meeting link and session details."}
                                        {sessionForm.notifyEmail && " Email will contain calendar invite and joining instructions."}
                                    </p>
                                </div>
                            )}
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsSessionDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSaveSession}>
                            <Calendar className="h-4 w-4 mr-2" />
                            {editingSession ? "Update Session" : "Create Session"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
