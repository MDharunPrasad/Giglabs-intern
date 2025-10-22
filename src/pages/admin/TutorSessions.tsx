import { useState, useEffect } from "react";
import {
    Plus,
    Video,
    Calendar,
    Clock,
    Users,
    Pencil,
    Bell,
    ExternalLink,
    Edit3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { useUser } from "@/contexts/UserContext";

interface LiveSession {
    id: string;
    tutorId: string;
    title: string;
    description: string;
    courseTitle: string;
    date: string;
    startTime: string;
    endTime: string;
    maxAttendees: number;
    registeredAttendees: number;
    status: "upcoming" | "live" | "completed";
    category: string;
}

export default function TutorSessions() {
    const { user } = useUser();
    const [sessions, setSessions] = useState<LiveSession[]>([]);
    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);
    const [selectedSession, setSelectedSession] = useState<LiveSession | null>(null);

    const [sessionForm, setSessionForm] = useState({
        title: "",
        description: "",
        courseTitle: "",
        date: "",
        startTime: "",
        endTime: "",
        maxAttendees: 50,
        category: "",
    });

    useEffect(() => {
        loadSessions();
    }, []);

    const loadSessions = () => {
        const stored = localStorage.getItem("liveSessions");
        if (stored) {
            const allSessions: LiveSession[] = JSON.parse(stored);
            // Filter sessions for the current tutor (assuming user.id is the tutor ID)
            setSessions(allSessions.filter(s => s.tutorId === user?.id));
        } else {
            // Initialize with sample data for the current tutor
            const sampleSessions: LiveSession[] = [
                {
                    id: "1",
                    tutorId: user?.id || "current-tutor",
                    title: "Advanced React Patterns",
                    description: "Custom Hooks & Performance Optimization",
                    courseTitle: "React Fundamentals",
                    date: new Date().toISOString().split('T')[0],
                    startTime: "15:00",
                    endTime: "16:30",
                    maxAttendees: 50,
                    registeredAttendees: 45,
                    status: "live",
                    category: "Web Development"
                },
                {
                    id: "2",
                    tutorId: user?.id || "current-tutor",
                    title: "Backend Architecture",
                    description: "Microservices & API Design",
                    courseTitle: "Full Stack Development",
                    date: new Date(Date.now() + 86400000).toISOString().split('T')[0],
                    startTime: "14:00",
                    endTime: "15:30",
                    maxAttendees: 40,
                    registeredAttendees: 32,
                    status: "upcoming",
                    category: "Backend Development"
                },
                {
                    id: "3",
                    tutorId: user?.id || "current-tutor",
                    title: "UI/UX Design Principles",
                    description: "Creating Accessible Interfaces",
                    courseTitle: "Design Fundamentals",
                    date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
                    startTime: "16:00",
                    endTime: "17:30",
                    maxAttendees: 35,
                    registeredAttendees: 28,
                    status: "upcoming",
                    category: "Design"
                }
            ];
            localStorage.setItem("liveSessions", JSON.stringify(sampleSessions));
            setSessions(sampleSessions);
        }
    };

    const saveSessions = (updatedSessions: LiveSession[]) => {
        const stored = localStorage.getItem("liveSessions");
        const allSessions: LiveSession[] = stored ? JSON.parse(stored) : [];

        // Update sessions for this tutor
        const otherSessions = allSessions.filter(s => s.tutorId !== user?.id);
        const newAllSessions = [...otherSessions, ...updatedSessions];

        localStorage.setItem("liveSessions", JSON.stringify(newAllSessions));
        setSessions(updatedSessions);
    };

    const handleSubmitSession = () => {
        if (!sessionForm.title || !sessionForm.courseTitle || !sessionForm.date || !sessionForm.startTime || !sessionForm.endTime) {
            toast.error("Please fill all required fields");
            return;
        }

        // Validate time logic
        if (sessionForm.startTime >= sessionForm.endTime) {
            toast.error("End time must be after start time");
            return;
        }

        const newSession: LiveSession = {
            id: selectedSession?.id || Date.now().toString(),
            tutorId: user?.id || "current-tutor",
            ...sessionForm,
            registeredAttendees: selectedSession?.registeredAttendees || 0,
            status: "upcoming" as const,
        };

        let updatedSessions;
        if (selectedSession) {
            updatedSessions = sessions.map(s => s.id === selectedSession.id ? newSession : s);
            toast.success("Session updated successfully");
        } else {
            updatedSessions = [...sessions, newSession];
            toast.success("Session created successfully");
        }

        saveSessions(updatedSessions);
        setIsFormDialogOpen(false);
        resetForm();
    };

    const resetForm = () => {
        setSessionForm({
            title: "",
            description: "",
            courseTitle: "",
            date: "",
            startTime: "",
            endTime: "",
            maxAttendees: 50,
            category: "",
        });
        setSelectedSession(null);
    };

    const handleEditSession = (session: LiveSession) => {
        setSelectedSession(session);
        setSessionForm({
            title: session.title,
            description: session.description,
            courseTitle: session.courseTitle,
            date: session.date,
            startTime: session.startTime,
            endTime: session.endTime,
            maxAttendees: session.maxAttendees,
            category: session.category,
        });
        setIsFormDialogOpen(true);
    };

    const handleDeleteSession = (sessionId: string) => {
        if (window.confirm("Are you sure you want to delete this session? This action cannot be undone.")) {
            const updatedSessions = sessions.filter(s => s.id !== sessionId);
            saveSessions(updatedSessions);
            toast.success("Session deleted successfully");
        }
    };

    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const formatTime = (time: string) => {
        const [hours, minutes] = time.split(':');
        const date = new Date();
        date.setHours(parseInt(hours), parseInt(minutes));
        return date.toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    };

    const getDuration = (startTime: string, endTime: string) => {
        const start = new Date(`2000-01-01T${startTime}`);
        const end = new Date(`2000-01-01T${endTime}`);
        const diffMs = end.getTime() - start.getTime();
        const diffHours = Math.round(diffMs / (1000 * 60 * 60) * 10) / 10;

        if (diffHours === 1) {
            return "1 hour";
        } else if (diffHours < 1) {
            const diffMinutes = Math.round(diffMs / (1000 * 60));
            return `${diffMinutes} minutes`;
        } else {
            return `${diffHours} hours`;
        }
    };

    return (
        <div className="p-8">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-display font-bold text-primary mb-2">Live Sessions</h1>
                        <p className="text-muted-foreground">Join live interactive sessions with your instructors.</p>
                    </div>

                    <Button
                        onClick={() => {
                            resetForm();
                            setIsFormDialogOpen(true);
                        }}
                        className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Schedule New Class
                    </Button>
                </div>
            </div>

            {/* Live Sessions Section */}
            <div className="space-y-6">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-sm">
                            {sessions.length} Total Sessions
                        </Badge>
                        <Badge variant="destructive" className="text-sm">
                            {sessions.filter(s => s.status === 'live').length} Live Now
                        </Badge>
                    </div>
                </div>

                {/* Sessions Cards */}
                {sessions.length === 0 ? (
                    <Card>
                        <CardContent className="flex flex-col items-center justify-center py-12">
                            <Video className="h-12 w-12 text-muted-foreground mb-4" />
                            <h3 className="font-semibold mb-2">No live sessions yet</h3>
                            <p className="text-muted-foreground text-center mb-4">
                                Create your first live session to start engaging with students
                            </p>
                            <Button onClick={() => {
                                resetForm();
                                setIsFormDialogOpen(true);
                            }}>
                                <Plus className="h-4 w-4 mr-2" />
                                Create First Session
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {sessions.map((session) => (
                            <Card key={session.id} className="relative bg-white hover:shadow-lg transition-all duration-200 overflow-hidden">
                                {/* Edit button - positioned at top-right */}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleEditSession(session)}
                                    className="absolute top-4 right-4 z-10 h-8 w-8 p-0 hover:bg-gray-100"
                                >
                                    <Pencil className="h-4 w-4 text-gray-500" />
                                </Button>

                                <CardContent className="p-6">
                                    {/* Header with status */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex-1 pr-8">
                                            <h3 className="font-semibold text-lg text-gray-900 leading-tight mb-1">
                                                {session.title}
                                            </h3>
                                            <p className="text-sm text-gray-600 mb-2">
                                                Instructor: <span className="font-medium text-gray-900">{user?.name || "You"}</span>
                                            </p>
                                        </div>
                                        <div className="flex-shrink-0">
                                            {session.status === 'live' ? (
                                                <Badge className="bg-red-500 hover:bg-red-600 text-white animate-pulse">
                                                    Live Now
                                                </Badge>
                                            ) : session.status === 'upcoming' ? (
                                                <Badge variant="outline" className="text-gray-600 border-gray-300">
                                                    Upcoming
                                                </Badge>
                                            ) : (
                                                <Badge variant="secondary">
                                                    Completed
                                                </Badge>
                                            )}
                                        </div>
                                    </div>

                                    {/* Session details */}
                                    <div className="space-y-3 mb-6">
                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Calendar className="h-4 w-4" />
                                            <span className="font-medium text-gray-900">{formatDate(session.date)}</span>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Clock className="h-4 w-4" />
                                            <span className="font-medium text-gray-900">
                                                {formatTime(session.startTime)} • {getDuration(session.startTime, session.endTime)}
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <Users className="h-4 w-4" />
                                            <span className="font-medium text-gray-900">
                                                {session.registeredAttendees} registered
                                            </span>
                                        </div>

                                        <div className="flex items-center gap-2 text-sm text-gray-600">
                                            <ExternalLink className="h-4 w-4" />
                                            <span className="text-blue-600 hover:text-blue-700 cursor-pointer">
                                                Meeting Link
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action buttons */}
                                    <div className="flex gap-3">
                                        <Button
                                            className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white font-medium py-3"
                                            size="lg"
                                        >
                                            <Video className="h-4 w-4 mr-2" />
                                            {session.status === 'live' ? 'Join Class' : 'Join Class'}
                                        </Button>
                                        <Button
                                            variant="outline"
                                            className="px-4 py-3 border-primary text-primary hover:bg-primary hover:text-white"
                                            size="lg"
                                        >
                                            <Bell className="h-4 w-4 mr-2" />
                                            Send Reminder
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Session Form Dialog */}
            <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedSession ? "Edit Live Session" : "Schedule New Class"}
                        </DialogTitle>
                    </DialogHeader>

                    <div className="grid gap-6 py-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="title">Session Title *</Label>
                                <Input
                                    id="title"
                                    value={sessionForm.title}
                                    onChange={(e) => setSessionForm({ ...sessionForm, title: e.target.value })}
                                    placeholder="e.g., Advanced React Patterns"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="courseTitle">Course Title *</Label>
                                <Input
                                    id="courseTitle"
                                    value={sessionForm.courseTitle}
                                    onChange={(e) => setSessionForm({ ...sessionForm, courseTitle: e.target.value })}
                                    placeholder="e.g., React Fundamentals"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="description">Description</Label>
                            <Textarea
                                id="description"
                                value={sessionForm.description}
                                onChange={(e) => setSessionForm({ ...sessionForm, description: e.target.value })}
                                placeholder="Brief description of what will be covered..."
                                rows={3}
                            />
                        </div>

                        <div className="grid grid-cols-3 gap-4">
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
                                <Label htmlFor="startTime">Start Time *</Label>
                                <Input
                                    id="startTime"
                                    type="time"
                                    value={sessionForm.startTime}
                                    onChange={(e) => setSessionForm({ ...sessionForm, startTime: e.target.value })}
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="endTime">End Time *</Label>
                                <Input
                                    id="endTime"
                                    type="time"
                                    value={sessionForm.endTime}
                                    onChange={(e) => setSessionForm({ ...sessionForm, endTime: e.target.value })}
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="category">Category</Label>
                                <Select value={sessionForm.category} onValueChange={(v) => setSessionForm({ ...sessionForm, category: v })}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Web Development">Web Development</SelectItem>
                                        <SelectItem value="Backend Development">Backend Development</SelectItem>
                                        <SelectItem value="Mobile Development">Mobile Development</SelectItem>
                                        <SelectItem value="Data Science">Data Science</SelectItem>
                                        <SelectItem value="DevOps">DevOps</SelectItem>
                                        <SelectItem value="AI/ML">AI/ML</SelectItem>
                                        <SelectItem value="Design">Design</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="maxAttendees">Max Attendees</Label>
                                <Input
                                    id="maxAttendees"
                                    type="number"
                                    min="1"
                                    max="200"
                                    value={sessionForm.maxAttendees}
                                    onChange={(e) => setSessionForm({ ...sessionForm, maxAttendees: parseInt(e.target.value) || 50 })}
                                />
                            </div>
                        </div>
                    </div>

                    <DialogFooter>
                        <Button variant="outline" onClick={() => setIsFormDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSubmitSession}>
                            {selectedSession ? "Update Session" : "Schedule Class"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
