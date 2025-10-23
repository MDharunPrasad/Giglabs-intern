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
    instructor?: string;
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
            title: "Advanced React Patterns",
            date: "2025-01-25",
            time: "15:00",
            duration: "1.5 hours",
            description: "Custom Hooks & Performance Optimization",
            meetingLink: "https://meet.google.com/abc-defg-hij",
            attendees: 45,
            instructor: "Sarah Johnson",
            status: "live",
            notifyWhatsApp: true,
            notifyEmail: true,
        },
        {
            id: "2",
            title: "Backend Architecture",
            date: "2025-01-26",
            time: "14:00",
            duration: "1.5 hours",
            description: "Microservices & API Design Patterns",
            meetingLink: "https://meet.google.com/xyz-mnop-qrs",
            attendees: 32,
            instructor: "Mike Chen",
            status: "upcoming",
            notifyWhatsApp: true,
            notifyEmail: true,
        },
        {
            id: "3",
            title: "UI/UX Design Principles",
            date: "2025-01-27",
            time: "16:00",
            duration: "1.5 hours",
            description: "User-Centered Design & Prototyping",
            meetingLink: "https://meet.google.com/ui-ux-design",
            attendees: 28,
            instructor: "Emma Davis",
            status: "upcoming",
            notifyWhatsApp: true,
            notifyEmail: true,
        },
        {
            id: "4",
            title: "Database Optimization",
            date: "2025-01-28",
            time: "11:00",
            duration: "1.5 hours",
            description: "Query Performance & Indexing Strategies",
            meetingLink: "https://meet.google.com/db-optimization",
            attendees: 38,
            instructor: "David Park",
            status: "upcoming",
            notifyWhatsApp: true,
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
        instructor: "",
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
                instructor: session.instructor || "",
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
                instructor: "",
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
            instructor: sessionForm.instructor,
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
            upcoming: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-800 border border-gray-300",
            live: "bg-gradient-to-r from-red-100 to-red-200 text-red-800 border border-red-300",
            completed: "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300",
        };

        return (
            <Badge variant={variants[status]} className={`${colors[status]} font-bold text-sm px-3 py-1 shadow-sm`}>
                {status === 'live' ? 'Live Now' : status.charAt(0).toUpperCase() + status.slice(1)}
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
        <div className="p-8 max-w-8xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-5xl font-display font-bold bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent mb-3">
                        Live Sessions Management
                    </h1>
                    <p className="text-muted-foreground text-xl">
                        Manage your live teaching sessions and student interactions
                    </p>
                </div>
                <Button onClick={() => handleOpenDialog()} size="lg" className="shrink-0 h-14 px-8 text-lg font-semibold shadow-lg hover:shadow-xl">
                    <Plus className="h-6 w-6 mr-3" />
                    Create New Session
                </Button>
            </div>

            {/* Sessions Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
                {sessions.map((session) => (
                    <Card key={session.id} className="px-8 pt-8 pb-10 hover:shadow-2xl transition-all duration-300 border-0 shadow-md hover:shadow-lg h-64 flex flex-col bg-white/50 backdrop-blur-sm">
                        {/* Header Section */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4 flex-1 min-w-0">
                                <div className={`w-16 h-16 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${session.status === 'live'
                                    ? 'bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-200'
                                    : 'bg-gradient-to-br from-primary/5 to-primary/10 border-2 border-primary/20'
                                    }`}>
                                    <Video className={`h-8 w-8 ${session.status === 'live' ? 'text-red-600' : 'text-primary'
                                        }`} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h3 className="font-bold text-xl leading-tight truncate mb-1">{session.title}</h3>
                                    <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2">
                                        {session.description}
                                    </p>
                                </div>
                            </div>
                            <div className="flex-shrink-0 ml-3">
                                {getStatusBadge(session.status)}
                            </div>
                        </div>

                        {/* Content Section */}
                        <div className="flex-1 flex flex-col justify-between">
                            {/* Details Grid */}
                            <div className="grid grid-cols-2 gap-x-4 gap-y-2 mb-4">
                                <div className="flex items-center gap-2 min-w-0">
                                    <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    <span className="truncate text-sm font-medium">{session.instructor || "You"}</span>
                                </div>
                                <div className="flex items-center gap-2 min-w-0">
                                    <Calendar className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    <span className="truncate text-sm font-medium">
                                        {new Date(session.date).toLocaleDateString('en-US', {
                                            weekday: 'short',
                                            month: 'short',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 min-w-0">
                                    <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    <span className="truncate text-sm font-medium">{formatTime(session.time)}</span>
                                </div>
                                <div className="flex items-center gap-2 min-w-0">
                                    <Users className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                                    <span className="truncate text-sm font-medium">{session.attendees} attendees</span>
                                </div>
                            </div>

                            {/* Bottom Section - Duration and Actions */}
                            <div className="flex items-center justify-between mt-auto pt-6">
                                <div className="flex items-center gap-2">
                                    <div className="text-sm font-semibold text-muted-foreground">Duration:</div>
                                    <div className="text-sm font-bold text-primary">{session.duration}</div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <Button
                                        className="h-10 px-6 text-sm font-semibold bg-primary hover:bg-primary/90 text-white"
                                        size="sm"
                                        onClick={() => {
                                            if (session.status === 'live' && session.meetingLink) {
                                                window.open(session.meetingLink, '_blank');
                                            } else {
                                                handleOpenDialog(session);
                                            }
                                        }}
                                    >
                                        {session.status === 'live' ? (
                                            <>
                                                <Video className="h-4 w-4 mr-2" />
                                                Join Live
                                            </>
                                        ) : (
                                            <>
                                                <Calendar className="h-4 w-4 mr-2" />
                                                Edit
                                            </>
                                        )}
                                    </Button>

                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-10 w-10 p-0 border-primary/20 hover:bg-primary/5 hover:border-primary/30"
                                        onClick={() => sendReminder(session)}
                                    >
                                        <Bell className="h-4 w-4 text-primary" />
                                    </Button>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        className="h-10 w-10 p-0 border-primary/20 hover:bg-red-50 hover:border-red-200"
                                        onClick={() => handleDeleteSession(session.id)}
                                    >
                                        <Trash2 className="h-4 w-4 text-primary" />
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

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
                                placeholder="e.g., 1.5 hours"
                                value={sessionForm.duration}
                                onChange={(e) => setSessionForm({ ...sessionForm, duration: e.target.value })}
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="instructor">Instructor</Label>
                            <Input
                                id="instructor"
                                placeholder="e.g., Sarah Johnson"
                                value={sessionForm.instructor}
                                onChange={(e) => setSessionForm({ ...sessionForm, instructor: e.target.value })}
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
