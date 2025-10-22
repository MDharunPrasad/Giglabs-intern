import { useState, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
    ArrowLeft,
    Plus,
    Edit3,
    Video,
    Calendar,
    Clock,
    Users,
    Book,
    User,
    ChevronRight,
    Pencil
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
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

interface Tutor {
    id: string;
    name: string;
    email: string;
    expertise: string;
    experience: string;
    status: "active" | "inactive";
}

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

type SidebarSection = "modules" | "live-sessions" | "add-session" | "edit-session";

// Live Session Card Component - Matches the screenshot design
function LiveSessionCard({
    session,
    onEdit,
    tutorName
}: {
    session: LiveSession;
    onEdit: (session: LiveSession) => void;
    tutorName: string;
}) {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) {
            return "Today";
        } else if (date.toDateString() === tomorrow.toDateString()) {
            return "Tomorrow";
        } else {
            return date.toLocaleDateString('en-US', {
                weekday: 'long'
            });
        }
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

    const isLive = session.status === 'live';
    const isUpcoming = session.status === 'upcoming';

    return (
        <Card className="relative bg-white hover:shadow-lg transition-all duration-200 overflow-hidden">
            {/* Edit button - positioned at top-right */}
            <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(session)}
                className="absolute top-4 right-4 z-10 h-8 w-8 p-0 hover:bg-gray-100"
            >
                <Pencil className="h-4 w-4 text-gray-500" />
            </Button>

            <CardContent className="p-6">
                {/* Header with icon and status */}
                <div className="flex items-start gap-4 mb-6">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${isLive ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                        <Video className={`h-6 w-6 ${isLive ? 'text-red-600' : 'text-blue-600'
                            }`} />
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900 leading-tight">
                                {session.title}
                            </h3>
                            <div className="flex-shrink-0">
                                {isLive && (
                                    <Badge className="bg-red-500 hover:bg-red-600 text-white font-medium">
                                        Live Now
                                    </Badge>
                                )}
                                {isUpcoming && (
                                    <Badge variant="outline" className="text-gray-600 border-gray-300">
                                        Upcoming
                                    </Badge>
                                )}
                            </div>
                        </div>
                        <p className="text-gray-600 text-sm leading-relaxed mb-1">
                            {session.description}
                        </p>
                    </div>
                </div>

                {/* Session details */}
                <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <User className="h-4 w-4" />
                        <span>Tutor: <span className="font-medium text-gray-900">{tutorName}</span></span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span className="font-medium text-gray-900">{formatDate(session.date)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span className="font-medium text-gray-900">
                            {formatTime(session.startTime)} - {formatTime(session.endTime)}
                        </span>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Users className="h-4 w-4" />
                        <span className="font-medium text-gray-900">
                            {session.registeredAttendees} attendees registered
                        </span>
                    </div>
                </div>

                {/* Action button */}
                <div className="pt-4 border-t border-gray-100">
                    {isLive ? (
                        <Button
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3"
                            size="lg"
                        >
                            <Video className="h-4 w-4 mr-2" />
                            Join Live Session
                        </Button>
                    ) : (
                        <Button
                            className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium py-3"
                            size="lg"
                        >
                            <Calendar className="h-4 w-4 mr-2" />
                            Register for Session
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

export default function TutorManagement() {
    const { tutorId } = useParams<{ tutorId: string }>();
    const navigate = useNavigate();

    const [tutor, setTutor] = useState<Tutor | null>(null);
    const [sessions, setSessions] = useState<LiveSession[]>([]);
    const [activeSection, setActiveSection] = useState<SidebarSection>("live-sessions");
    const [selectedSession, setSelectedSession] = useState<LiveSession | null>(null);
    const [isFormDialogOpen, setIsFormDialogOpen] = useState(false);

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
        loadTutorData();
        loadSessions();
    }, [tutorId]);

    const loadTutorData = () => {
        const stored = localStorage.getItem("tutors");
        if (stored) {
            const tutors: Tutor[] = JSON.parse(stored);
            const foundTutor = tutors.find(t => t.id === tutorId);
            if (foundTutor) {
                setTutor(foundTutor);
            } else {
                toast.error("Tutor not found");
                navigate("/admin/tutors");
            }
        }
    };

    const loadSessions = () => {
        const stored = localStorage.getItem("liveSessions");
        if (stored) {
            const allSessions: LiveSession[] = JSON.parse(stored);
            setSessions(allSessions.filter(s => s.tutorId === tutorId));
        } else {
            // Initialize with sample data
            const sampleSessions: LiveSession[] = [
                {
                    id: "1",
                    tutorId: tutorId || "",
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
                    tutorId: tutorId || "",
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
        const otherSessions = allSessions.filter(s => s.tutorId !== tutorId);
        const newAllSessions = [...otherSessions, ...updatedSessions];

        localStorage.setItem("liveSessions", JSON.stringify(newAllSessions));
        setSessions(updatedSessions);
    };

    const handleSubmitSession = () => {
        if (!sessionForm.title || !sessionForm.courseTitle || !sessionForm.date || !sessionForm.startTime || !sessionForm.endTime) {
            toast.error("Please fill all required fields");
            return;
        }

        const newSession: LiveSession = {
            id: selectedSession?.id || Date.now().toString(),
            tutorId: tutorId || "",
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
        setActiveSection("live-sessions");
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

    const upcomingSessions = useMemo(() =>
        sessions.filter(s => s.status === "upcoming"),
        [sessions]
    );

    const liveSessions = useMemo(() =>
        sessions.filter(s => s.status === "live"),
        [sessions]
    );

    if (!tutor) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold mb-2">Loading tutor data...</h2>
                    <p className="text-muted-foreground">Please wait while we fetch the information.</p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex h-screen bg-background">
            {/* Sidebar Navigation */}
            <div className="w-80 bg-card border-r border-border flex flex-col">
                {/* Header */}
                <div className="p-6 border-b border-border">
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => navigate("/admin/tutors")}
                        className="mb-4 -ml-2"
                    >
                        <ArrowLeft className="h-4 w-4 mr-2" />
                        Back to Tutors
                    </Button>

                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent text-white flex items-center justify-center font-bold">
                            {tutor.name.split(" ").map(n => n[0]).join("")}
                        </div>
                        <div>
                            <h2 className="font-semibold text-lg">{tutor.name}</h2>
                            <p className="text-sm text-muted-foreground">{tutor.expertise}</p>
                        </div>
                    </div>
                </div>

                {/* Navigation Menu */}
                <div className="flex-1 p-4">
                    <div className="space-y-2">
                        <Button
                            variant={activeSection === "modules" ? "default" : "ghost"}
                            className="w-full justify-start"
                            onClick={() => setActiveSection("modules")}
                        >
                            <Book className="h-4 w-4 mr-3" />
                            Modules
                        </Button>

                        <div className="pt-4">
                            <h3 className="text-sm font-semibold text-muted-foreground mb-3 px-3">Live Sessions</h3>
                            <div className="space-y-1">
                                <Button
                                    variant={activeSection === "live-sessions" ? "default" : "ghost"}
                                    className="w-full justify-start"
                                    onClick={() => setActiveSection("live-sessions")}
                                >
                                    <Video className="h-4 w-4 mr-3" />
                                    Live Sessions
                                </Button>

                                <Button
                                    variant={activeSection === "add-session" ? "default" : "ghost"}
                                    className="w-full justify-start"
                                    onClick={() => {
                                        setActiveSection("add-session");
                                        resetForm();
                                        setIsFormDialogOpen(true);
                                    }}
                                >
                                    <Plus className="h-4 w-4 mr-3" />
                                    Add Live Session
                                </Button>

                                <Button
                                    variant={activeSection === "edit-session" ? "default" : "ghost"}
                                    className="w-full justify-start"
                                    onClick={() => setActiveSection("edit-session")}
                                >
                                    <Edit3 className="h-4 w-4 mr-3" />
                                    Edit Live Session
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Stats Footer */}
                <div className="p-4 border-t border-border">
                    <div className="grid grid-cols-2 gap-3 text-sm">
                        <div className="text-center">
                            <div className="font-semibold text-lg">{sessions.length}</div>
                            <div className="text-muted-foreground">Total Sessions</div>
                        </div>
                        <div className="text-center">
                            <div className="font-semibold text-lg">{liveSessions.length}</div>
                            <div className="text-muted-foreground">Live Now</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-auto">
                {activeSection === "modules" && (
                    <div className="p-8">
                        <div className="mb-8">
                            <h1 className="text-3xl font-display font-bold mb-2">Course Modules</h1>
                            <p className="text-muted-foreground">Manage {tutor.name}'s course modules and content</p>
                        </div>

                        {/* Modules Section */}
                        <div className="grid gap-6">
                            <Card>
                                <CardContent className="flex flex-col items-center justify-center py-12">
                                    <Book className="h-12 w-12 text-muted-foreground mb-4" />
                                    <h3 className="font-semibold mb-2">No modules available</h3>
                                    <p className="text-muted-foreground text-center mb-4">
                                        Course modules will be displayed here once they are created
                                    </p>
                                    <Button>
                                        <Plus className="h-4 w-4 mr-2" />
                                        Add Module
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}

                {/* Live Sessions Section */}
                {activeSection === "live-sessions" && (
                    <div className="p-8">
                        <div className="mb-8 flex items-center justify-between">
                            <div>
                                <h1 className="text-3xl font-display font-bold mb-2">Live Sessions</h1>
                                <p className="text-muted-foreground">Manage live teaching sessions for {tutor.name}</p>
                            </div>
                            <Button
                                onClick={() => {
                                    resetForm();
                                    setIsFormDialogOpen(true);
                                }}
                                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Live Session
                            </Button>
                        </div>

                        {/* Live Sessions Grid */}
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {sessions.length === 0 ? (
                                <div className="lg:col-span-2">
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
                                </div>
                            ) : (
                                sessions.map((session) => (
                                    <LiveSessionCard
                                        key={session.id}
                                        session={session}
                                        onEdit={handleEditSession}
                                        tutorName={tutor.name}
                                    />
                                ))
                            )}
                        </div>
                    </div>
                )}

            </div>

            {/* Session Form Dialog */}
            <Dialog open={isFormDialogOpen} onOpenChange={setIsFormDialogOpen}>
                <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>
                            {selectedSession ? "Edit Live Session" : "Add Live Session"}
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
                            {selectedSession ? "Update Session" : "Create Session"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}

// Session Card Component
function SessionCard({
    session,
    onEdit,
    isLive = false,
    showEditButton = false
}: {
    session: LiveSession;
    onEdit: (session: LiveSession) => void;
    isLive?: boolean;
    showEditButton?: boolean;
}) {
    const formatDate = (dateStr: string) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
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

    return (
        <Card className={`${isLive ? 'ring-2 ring-red-500 ring-opacity-50 bg-red-50/50' : 'hover:shadow-md'} transition-all`}>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isLive ? 'bg-red-100' : session.status === 'upcoming' ? 'bg-blue-100' : 'bg-gray-100'
                            }`}>
                            <Video className={`h-6 w-6 ${isLive ? 'text-red-600' : session.status === 'upcoming' ? 'text-blue-600' : 'text-gray-600'
                                }`} />
                        </div>
                        <div>
                            <CardTitle className="text-lg">{session.title}</CardTitle>
                            <CardDescription className="font-medium text-primary">{session.courseTitle}</CardDescription>
                        </div>
                    </div>

                    <div className="flex items-center gap-2">
                        {isLive && (
                            <Badge variant="destructive" className="animate-pulse">
                                <div className="w-2 h-2 bg-white rounded-full mr-1"></div>
                                Live Now
                            </Badge>
                        )}
                        {session.status === 'upcoming' && (
                            <Badge variant="secondary">Upcoming</Badge>
                        )}
                    </div>
                </div>
            </CardHeader>

            <CardContent className="pt-0">
                {session.description && (
                    <p className="text-sm text-muted-foreground mb-4">{session.description}</p>
                )}

                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                            <span>{formatDate(session.date)}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 text-muted-foreground" />
                            <span>{formatTime(session.startTime)} - {formatTime(session.endTime)}</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <div className="flex items-center gap-2">
                            <Users className="h-4 w-4 text-muted-foreground" />
                            <span>{session.registeredAttendees}/{session.maxAttendees} registered</span>
                        </div>
                        {session.category && (
                            <div className="flex items-center gap-2">
                                <Book className="h-4 w-4 text-muted-foreground" />
                                <span>{session.category}</span>
                            </div>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t">
                    <div className="flex items-center gap-2">
                        {isLive ? (
                            <Button size="sm" className="bg-red-600 hover:bg-red-700">
                                <Video className="h-4 w-4 mr-2" />
                                Join Live Session
                            </Button>
                        ) : session.status === 'upcoming' ? (
                            <Button size="sm" variant="outline">
                                <Calendar className="h-4 w-4 mr-2" />
                                Register for Session
                            </Button>
                        ) : null}
                    </div>

                    {(showEditButton || !isLive) && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => onEdit(session)}
                            className="text-muted-foreground hover:text-foreground"
                        >
                            <Edit3 className="h-4 w-4 mr-2" />
                            Edit
                        </Button>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
