import { Plus, BookOpen, Video, FileText, HelpCircle, CheckCircle, Upload, Edit3, Trash2, Save, X, Users, Eye, Download, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { toast } from "sonner";

interface Module {
    id: string;
    title: string;
    description: string;
    status: 'draft' | 'published' | 'archived';
    progress: number;
    duration: string;
    xpReward: number;
    contentTypes: string[];
    videoUrl?: string;
    notes?: string;
    quiz?: {
        questions: {
            question: string;
            options: string[];
            correctAnswer: number;
        }[];
    };
    enrolledStudents: number;
    completionRate: number;
    createdAt: string;
    updatedAt: string;
    week: number;
    moduleType: 'start' | 'regular' | 'final';
    isRequired: boolean;
}

interface Week {
    weekNumber: number;
    title: string;
    description: string;
    modules: Module[];
    isActive: boolean;
    completionRate: number;
}

export default function TutorModules() {
    const [weeks, setWeeks] = useState<Week[]>([
        {
            weekNumber: 1,
            title: 'Foundation',
            description: 'Learn the fundamentals of backend development',
            isActive: true,
            completionRate: 75,
            modules: [
                {
                    id: '1',
                    title: 'Course Introduction',
                    description: 'Welcome to Backend Development - Course overview and setup',
                    status: 'published',
                    progress: 100,
                    duration: '30 minutes',
                    xpReward: 50,
                    contentTypes: ['Video', 'Quiz'],
                    videoUrl: 'https://youtube.com/watch?v=example1',
                    notes: 'This is the mandatory start module for all students...',
                    quiz: {
                        questions: [
                            {
                                question: 'What will you learn in this course?',
                                options: ['Frontend Development', 'Backend Development', 'Mobile Development', 'Data Science'],
                                correctAnswer: 1
                            },
                            {
                                question: 'Which programming language is commonly used for backend development?',
                                options: ['HTML', 'CSS', 'JavaScript', 'Python'],
                                correctAnswer: 3
                            }
                        ]
                    },
                    enrolledStudents: 45,
                    completionRate: 100,
                    createdAt: '2025-01-15',
                    updatedAt: '2025-01-20',
                    week: 1,
                    moduleType: 'start',
                    isRequired: true
                },
                {
                    id: '2',
                    title: 'Environment Setup',
                    description: 'Set up your development environment and tools',
                    status: 'published',
                    progress: 85,
                    duration: '2-3 hours',
                    xpReward: 100,
                    contentTypes: ['Video', 'Quiz'],
                    videoUrl: 'https://youtube.com/watch?v=example2',
                    notes: 'Essential tools and environment configuration...',
                    quiz: {
                        questions: [
                            {
                                question: 'Which tool is essential for backend development?',
                                options: ['Photoshop', 'Node.js', 'Word', 'Excel'],
                                correctAnswer: 1
                            }
                        ]
                    },
                    enrolledStudents: 42,
                    completionRate: 78,
                    createdAt: '2025-01-16',
                    updatedAt: '2025-01-21',
                    week: 1,
                    moduleType: 'regular',
                    isRequired: false
                },
                {
                    id: '3',
                    title: 'Basic Concepts',
                    description: 'Understanding servers, APIs, and databases',
                    status: 'published',
                    progress: 70,
                    duration: '3-4 hours',
                    xpReward: 150,
                    contentTypes: ['Video', 'Quiz', 'Assessment'],
                    videoUrl: 'https://youtube.com/watch?v=example3',
                    notes: 'Core backend development concepts...',
                    quiz: {
                        questions: [
                            {
                                question: 'What does API stand for?',
                                options: ['Application Programming Interface', 'Advanced Programming Interface', 'Application Process Interface', 'Advanced Process Interface'],
                                correctAnswer: 0
                            }
                        ]
                    },
                    enrolledStudents: 38,
                    completionRate: 65,
                    createdAt: '2025-01-18',
                    updatedAt: '2025-01-22',
                    week: 1,
                    moduleType: 'regular',
                    isRequired: false
                }
            ]
        },
        {
            weekNumber: 2,
            title: 'Application Development',
            description: 'Build real-world applications and learn best practices',
            isActive: false,
            completionRate: 0,
            modules: [
                {
                    id: '4',
                    title: 'Building APIs',
                    description: 'Create RESTful APIs with Express.js',
                    status: 'draft',
                    progress: 45,
                    duration: '4-5 hours',
                    xpReward: 200,
                    contentTypes: ['Video', 'Quiz', 'Assessment'],
                    videoUrl: '',
                    notes: '',
                    quiz: {
                        questions: []
                    },
                    enrolledStudents: 0,
                    completionRate: 0,
                    createdAt: '2025-01-20',
                    updatedAt: '2025-01-25',
                    week: 2,
                    moduleType: 'regular',
                    isRequired: false
                },
                {
                    id: '5',
                    title: 'Database Integration',
                    description: 'Connect and manage databases in your applications',
                    status: 'draft',
                    progress: 30,
                    duration: '5-6 hours',
                    xpReward: 250,
                    contentTypes: ['Video', 'Quiz', 'Assessment'],
                    videoUrl: '',
                    notes: '',
                    quiz: {
                        questions: []
                    },
                    enrolledStudents: 0,
                    completionRate: 0,
                    createdAt: '2025-01-22',
                    updatedAt: '2025-01-27',
                    week: 2,
                    moduleType: 'regular',
                    isRequired: false
                },
                {
                    id: '6',
                    title: 'Course Final Project',
                    description: 'Complete your final backend development project',
                    status: 'draft',
                    progress: 0,
                    duration: '8-10 hours',
                    xpReward: 500,
                    contentTypes: ['Video', 'Project', 'Assessment'],
                    videoUrl: '',
                    notes: 'This is the mandatory final module - comprehensive project...',
                    quiz: {
                        questions: []
                    },
                    enrolledStudents: 0,
                    completionRate: 0,
                    createdAt: '2025-01-25',
                    updatedAt: '2025-01-30',
                    week: 2,
                    moduleType: 'final',
                    isRequired: true
                }
            ]
        }
    ]);

    const [editingModule, setEditingModule] = useState<Module | null>(null);
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [isAddModuleDialogOpen, setIsAddModuleDialogOpen] = useState(false);
    const [newModuleWeek, setNewModuleWeek] = useState<number>(1);

    const getStatusBadge = (status: Module['status']) => {
        const variants = {
            draft: "bg-gradient-to-r from-yellow-100 to-yellow-200 text-yellow-800 border border-yellow-300",
            published: "bg-gradient-to-r from-green-100 to-green-200 text-green-800 border border-green-300",
            archived: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border border-gray-300",
        };

        const statusLabels = {
            draft: "Draft",
            published: "Published",
            archived: "Disabled"
        };

        return (
            <Badge className={`${variants[status]} font-semibold px-3 py-1`}>
                {statusLabels[status]}
            </Badge>
        );
    };

    const getModuleTypeBadge = (moduleType: Module['moduleType']) => {
        const variants = {
            start: "bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 border border-blue-300",
            regular: "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-600 border border-gray-300",
            final: "bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 border border-purple-300",
        };

        const labels = {
            start: "START",
            regular: "MODULE",
            final: "FINAL"
        };

        return (
            <Badge className={`${variants[moduleType]} font-bold px-2 py-1 text-xs`}>
                {labels[moduleType]}
            </Badge>
        );
    };

    const getContentTypeIcon = (type: string) => {
        switch (type) {
            case 'Video':
                return <Video className="h-4 w-4" />;
            case 'Quiz':
                return <HelpCircle className="h-4 w-4" />;
            case 'Assessment':
                return <CheckCircle className="h-4 w-4" />;
            case 'Project':
                return <FileText className="h-4 w-4" />;
            default:
                return <FileText className="h-4 w-4" />;
        }
    };

    const handleEditModule = (module: Module) => {
        setEditingModule({ ...module });
        setIsEditDialogOpen(true);
    };

    const handleSaveModule = () => {
        if (!editingModule) return;

        if (isAddModuleDialogOpen) {
            // Adding new module
            const newModule: Module = {
                ...editingModule,
                id: Date.now().toString(),
                createdAt: new Date().toISOString().split('T')[0],
                updatedAt: new Date().toISOString().split('T')[0]
            };

            setWeeks(prev => prev.map(week =>
                week.weekNumber === newModuleWeek
                    ? { ...week, modules: [...week.modules, newModule] }
                    : week
            ));

            setIsAddModuleDialogOpen(false);
            setEditingModule(null);
            toast.success("New module added successfully!");
        } else {
            // Editing existing module
            setWeeks(prev => prev.map(week => ({
                ...week,
                modules: week.modules.map(module =>
                    module.id === editingModule.id ? { ...editingModule, updatedAt: new Date().toISOString().split('T')[0] } : module
                )
            })));

            setIsEditDialogOpen(false);
            setEditingModule(null);
            toast.success("Module updated successfully!");
        }
    };

    const handleAddModule = (weekNumber: number) => {
        setNewModuleWeek(weekNumber);
        setEditingModule({
            id: '',
            title: '',
            description: '',
            status: 'draft',
            progress: 0,
            duration: '',
            xpReward: 50,
            contentTypes: ['Video'],
            videoUrl: '',
            notes: '',
            quiz: {
                questions: []
            },
            enrolledStudents: 0,
            completionRate: 0,
            createdAt: new Date().toISOString().split('T')[0],
            updatedAt: new Date().toISOString().split('T')[0],
            week: weekNumber,
            moduleType: 'regular',
            isRequired: false
        });
        setIsAddModuleDialogOpen(true);
    };

    const handleDeleteModule = (moduleId: string) => {
        setWeeks(prev => prev.map(week => ({
            ...week,
            modules: week.modules.filter(module => module.id !== moduleId)
        })));
        toast.success("Module deleted!");
    };

    const handlePublishModule = (moduleId: string) => {
        setWeeks(prev => prev.map(week => ({
            ...week,
            modules: week.modules.map(module =>
                module.id === moduleId
                    ? { ...module, status: 'published' as const, updatedAt: new Date().toISOString().split('T')[0] }
                    : module
            )
        })));
        toast.success("Module published!");
    };

    const handleDisableModule = (moduleId: string) => {
        setWeeks(prev => prev.map(week => ({
            ...week,
            modules: week.modules.map(module =>
                module.id === moduleId
                    ? { ...module, status: 'archived' as const, updatedAt: new Date().toISOString().split('T')[0] }
                    : module
            )
        })));
        toast.success("Module disabled!");
    };

    const handleEnableModule = (moduleId: string) => {
        setWeeks(prev => prev.map(week => ({
            ...week,
            modules: week.modules.map(module =>
                module.id === moduleId
                    ? { ...module, status: 'published' as const, updatedAt: new Date().toISOString().split('T')[0] }
                    : module
            )
        })));
        toast.success("Module enabled!");
    };

    const handleAddWeek = () => {
        const newWeekNumber = Math.max(...weeks.map(w => w.weekNumber)) + 1;
        const newWeek: Week = {
            weekNumber: newWeekNumber,
            title: `Week ${newWeekNumber}`,
            description: `Content for week ${newWeekNumber}`,
            isActive: false,
            completionRate: 0,
            modules: []
        };

        setWeeks(prev => [...prev, newWeek]);
        toast.success(`Week ${newWeekNumber} added!`);
    };

    const handleCancelAddModule = () => {
        setIsAddModuleDialogOpen(false);
        setEditingModule(null);
    };


    return (
        <div className="p-8 max-w-8xl mx-auto">
            {/* Page Header */}
            <div className="flex items-center justify-between mb-12">
                <div>
                    <h1 className="text-5xl font-display font-bold bg-gradient-to-r from-primary via-accent to-gold bg-clip-text text-transparent mb-3">
                        Course Content Management
                    </h1>
                    <p className="text-muted-foreground text-xl">
                        Upload and manage course modules by weeks - Start and Final modules are mandatory
                    </p>
                </div>
                <div className="flex gap-3">
                    <Button onClick={handleAddWeek} size="lg" className="shrink-0 h-14 px-8 text-lg font-semibold shadow-lg hover:shadow-xl">
                        <Plus className="h-6 w-6 mr-3" />
                        Add New Week
                    </Button>
                </div>
            </div>


            {/* Weeks Layout */}
            {weeks.map((week) => (
                <div key={week.weekNumber} className="mb-12">
                    {/* Week Header */}
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-2">Week {week.weekNumber}: {week.title}</h2>
                            <p className="text-gray-600 text-lg">{week.description}</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Badge className={`font-semibold px-4 py-2 ${week.isActive
                                ? 'bg-green-100 text-green-600 border border-green-300'
                                : 'bg-gray-100 text-gray-600 border border-gray-300'
                                }`}>
                                {week.isActive ? 'Active' : 'Inactive'} {week.completionRate}% Complete
                            </Badge>
                            <Button
                                onClick={() => handleAddModule(week.weekNumber)}
                                size="sm"
                                className="bg-primary hover:bg-primary/90 text-white"
                            >
                                <Plus className="h-4 w-4 mr-2" />
                                Add Module
                            </Button>
                        </div>
                    </div>

                    {/* Modules Grid for this Week */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                        {week.modules.map((module) => (
                            <Card key={module.id} className="p-6 hover:shadow-xl transition-all duration-300 border-0 shadow-md hover:shadow-lg bg-white h-full flex flex-col">
                                {/* Card Content */}
                                <div className="flex-1 flex flex-col">
                                    {/* Module Header */}
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3 flex-1 min-w-0">
                                            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${module.moduleType === 'start'
                                                ? 'bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200'
                                                : module.moduleType === 'final'
                                                    ? 'bg-gradient-to-br from-purple-50 to-purple-100 border-2 border-purple-200'
                                                    : 'bg-gradient-to-br from-primary/10 to-primary/20 border-2 border-primary/20'
                                                }`}>
                                                {module.moduleType === 'start' ? (
                                                    <Play className="h-6 w-6 text-blue-600" />
                                                ) : module.moduleType === 'final' ? (
                                                    <CheckCircle className="h-6 w-6 text-purple-600" />
                                                ) : (
                                                    <BookOpen className="h-6 w-6 text-primary" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="font-bold text-lg text-gray-800 truncate">{module.title}</h3>
                                                <p className="text-xs text-gray-500">Updated: {module.updatedAt}</p>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-2 flex-shrink-0 ml-3">
                                            {getModuleTypeBadge(module.moduleType)}
                                            {getStatusBadge(module.status)}
                                        </div>
                                    </div>

                                    {/* Module Description */}
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed line-clamp-3">
                                        {module.description}
                                    </p>

                                    {/* Required Indicator */}
                                    {module.isRequired && (
                                        <div className="mb-4">
                                            <Badge className="bg-red-100 text-red-800 border border-red-300 font-bold text-xs px-2 py-1">
                                                REQUIRED
                                            </Badge>
                                        </div>
                                    )}

                                    {/* Progress and Stats */}
                                    <div className="mb-4">
                                        <div className="flex justify-between text-xs text-gray-500 mb-1">
                                            <span>Completion Rate</span>
                                            <span>{module.completionRate}%</span>
                                        </div>
                                        <div className="w-full bg-gray-200 rounded-full h-2">
                                            <div
                                                className="bg-primary h-2 rounded-full transition-all duration-300"
                                                style={{ width: `${module.completionRate}%` }}
                                            ></div>
                                        </div>
                                    </div>

                                    {/* Content Types */}
                                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                                        {module.contentTypes.map((type, index) => (
                                            <div key={index} className="flex items-center gap-1 text-xs text-gray-500">
                                                {getContentTypeIcon(type)}
                                                <span>{type}</span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center justify-between mb-6">
                                        <div className="flex items-center gap-4 text-sm text-gray-600">
                                            <div className="flex items-center gap-1">
                                                <Users className="h-4 w-4" />
                                                <span>{module.enrolledStudents} students</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <span>+{module.xpReward} XP</span>
                                            </div>
                                        </div>
                                        <div className="text-gray-600 text-sm">
                                            {module.duration}
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons - Pushed to bottom */}
                                <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-100">
                                    <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-primary/5"
                                            onClick={() => handleEditModule(module)}
                                        >
                                            <Edit3 className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-blue-50 hover:border-blue-200"
                                            onClick={() => window.open(module.videoUrl, '_blank')}
                                            disabled={!module.videoUrl}
                                        >
                                            <Eye className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200"
                                            onClick={() => handleDeleteModule(module.id)}
                                            disabled={module.isRequired}
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    {module.status === 'draft' ? (
                                        <Button
                                            size="sm"
                                            className="bg-primary hover:bg-primary/90 text-white font-semibold px-4"
                                            onClick={() => handlePublishModule(module.id)}
                                        >
                                            Publish
                                        </Button>
                                    ) : module.status === 'published' ? (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="font-semibold px-4"
                                            onClick={() => handleDisableModule(module.id)}
                                        >
                                            Disable
                                        </Button>
                                    ) : (
                                        <Button
                                            size="sm"
                                            variant="outline"
                                            className="font-semibold px-4"
                                            onClick={() => handleEnableModule(module.id)}
                                        >
                                            Enable
                                        </Button>
                                    )}
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            ))}

            {/* Edit Module Dialog */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Edit Module: {editingModule?.title}</DialogTitle>
                    </DialogHeader>

                    {editingModule && (
                        <div className="space-y-6">
                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="video">Video</TabsTrigger>
                                    <TabsTrigger value="notes">Notes</TabsTrigger>
                                    <TabsTrigger value="quiz">Quiz</TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Module Title</Label>
                                            <Input
                                                id="title"
                                                value={editingModule.title}
                                                onChange={(e) => setEditingModule({ ...editingModule, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="duration">Duration</Label>
                                            <Input
                                                id="duration"
                                                value={editingModule.duration}
                                                onChange={(e) => setEditingModule({ ...editingModule, duration: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description</Label>
                                        <Textarea
                                            id="description"
                                            rows={3}
                                            value={editingModule.description}
                                            onChange={(e) => setEditingModule({ ...editingModule, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="xpReward">XP Reward</Label>
                                            <Input
                                                id="xpReward"
                                                type="number"
                                                value={editingModule.xpReward}
                                                onChange={(e) => setEditingModule({ ...editingModule, xpReward: parseInt(e.target.value) })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="status">Status</Label>
                                            <select
                                                id="status"
                                                className="w-full p-2 border rounded-md"
                                                value={editingModule.status}
                                                onChange={(e) => setEditingModule({ ...editingModule, status: e.target.value as Module['status'] })}
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="published">Published</option>
                                                <option value="archived">Disabled</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="moduleType">Module Type</Label>
                                            <select
                                                id="moduleType"
                                                className="w-full p-2 border rounded-md"
                                                value={editingModule.moduleType}
                                                onChange={(e) => setEditingModule({ ...editingModule, moduleType: e.target.value as Module['moduleType'] })}
                                            >
                                                <option value="start">Start Module</option>
                                                <option value="regular">Regular Module</option>
                                                <option value="final">Final Module</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id="isRequired"
                                                checked={editingModule.isRequired}
                                                onChange={(e) => setEditingModule({ ...editingModule, isRequired: e.target.checked })}
                                                className="rounded border-gray-300"
                                            />
                                            <Label htmlFor="isRequired">Required Module (Cannot be deleted)</Label>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="video" className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="videoUrl">Video URL</Label>
                                        <Input
                                            id="videoUrl"
                                            placeholder="https://youtube.com/watch?v=..."
                                            value={editingModule.videoUrl || ''}
                                            onChange={(e) => setEditingModule({ ...editingModule, videoUrl: e.target.value })}
                                        />
                                    </div>
                                    {editingModule.videoUrl && (
                                        <div className="mt-4">
                                            <Label>Video Preview</Label>
                                            <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                                                <p className="text-sm text-gray-600">Video will be embedded here</p>
                                                <p className="text-xs text-gray-500 mt-1">{editingModule.videoUrl}</p>
                                            </div>
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="notes" className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Module Notes</Label>
                                        <Textarea
                                            id="notes"
                                            rows={8}
                                            placeholder="Add detailed notes for this module..."
                                            value={editingModule.notes || ''}
                                            onChange={(e) => setEditingModule({ ...editingModule, notes: e.target.value })}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="quiz" className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-lg font-semibold">Quiz Questions</Label>
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={() => {
                                                const newQuestion = {
                                                    question: '',
                                                    options: ['', '', '', ''],
                                                    correctAnswer: 0
                                                };
                                                setEditingModule({
                                                    ...editingModule,
                                                    quiz: {
                                                        questions: [...(editingModule.quiz?.questions || []), newQuestion]
                                                    }
                                                });
                                            }}
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Question
                                        </Button>
                                    </div>

                                    {editingModule.quiz?.questions?.map((question, questionIndex) => (
                                        <div key={questionIndex} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-base font-medium">Question {questionIndex + 1}</Label>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200"
                                                    onClick={() => {
                                                        const updatedQuestions = editingModule.quiz?.questions?.filter((_, index) => index !== questionIndex) || [];
                                                        setEditingModule({
                                                            ...editingModule,
                                                            quiz: { questions: updatedQuestions }
                                                        });
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor={`question-${questionIndex}`}>Question Text</Label>
                                                <Textarea
                                                    id={`question-${questionIndex}`}
                                                    rows={2}
                                                    placeholder="Enter quiz question..."
                                                    value={question.question}
                                                    onChange={(e) => {
                                                        const updatedQuestions = [...(editingModule.quiz?.questions || [])];
                                                        updatedQuestions[questionIndex] = {
                                                            ...updatedQuestions[questionIndex],
                                                            question: e.target.value
                                                        };
                                                        setEditingModule({
                                                            ...editingModule,
                                                            quiz: { questions: updatedQuestions }
                                                        });
                                                    }}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Answer Options</Label>
                                                {question.options.map((option, optionIndex) => (
                                                    <div key={optionIndex} className="flex items-center gap-2">
                                                        <Input
                                                            placeholder={`Option ${optionIndex + 1}`}
                                                            value={option}
                                                            onChange={(e) => {
                                                                const updatedQuestions = [...(editingModule.quiz?.questions || [])];
                                                                const newOptions = [...updatedQuestions[questionIndex].options];
                                                                newOptions[optionIndex] = e.target.value;
                                                                updatedQuestions[questionIndex] = {
                                                                    ...updatedQuestions[questionIndex],
                                                                    options: newOptions
                                                                };
                                                                setEditingModule({
                                                                    ...editingModule,
                                                                    quiz: { questions: updatedQuestions }
                                                                });
                                                            }}
                                                        />
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className={`h-8 w-8 p-0 ${question.correctAnswer === optionIndex ? 'bg-primary text-white' : ''}`}
                                                            onClick={() => {
                                                                const updatedQuestions = [...(editingModule.quiz?.questions || [])];
                                                                updatedQuestions[questionIndex] = {
                                                                    ...updatedQuestions[questionIndex],
                                                                    correctAnswer: optionIndex
                                                                };
                                                                setEditingModule({
                                                                    ...editingModule,
                                                                    quiz: { questions: updatedQuestions }
                                                                });
                                                            }}
                                                        >
                                                            {question.correctAnswer === optionIndex ? '✓' : optionIndex + 1}
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    {(!editingModule.quiz?.questions || editingModule.quiz.questions.length === 0) && (
                                        <div className="text-center py-8 text-gray-500">
                                            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                            <p className="text-lg font-medium mb-2">No questions added yet</p>
                                            <p className="text-sm">Click "Add Question" to create your first quiz question</p>
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button
                                    variant="outline"
                                    onClick={() => setIsEditDialogOpen(false)}
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                </Button>
                                <Button onClick={handleSaveModule}>
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Add Module Dialog */}
            <Dialog open={isAddModuleDialogOpen} onOpenChange={setIsAddModuleDialogOpen}>
                <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle className="text-2xl font-bold">Add New Module to Week {newModuleWeek}</DialogTitle>
                    </DialogHeader>

                    {editingModule && (
                        <div className="space-y-6">
                            <Tabs value={activeTab} onValueChange={setActiveTab}>
                                <TabsList className="grid w-full grid-cols-4">
                                    <TabsTrigger value="overview">Overview</TabsTrigger>
                                    <TabsTrigger value="video">Video</TabsTrigger>
                                    <TabsTrigger value="notes">Notes</TabsTrigger>
                                    <TabsTrigger value="quiz">Quiz</TabsTrigger>
                                </TabsList>

                                <TabsContent value="overview" className="space-y-4">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="title">Module Title *</Label>
                                            <Input
                                                id="title"
                                                placeholder="Enter module title..."
                                                value={editingModule.title}
                                                onChange={(e) => setEditingModule({ ...editingModule, title: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="duration">Duration</Label>
                                            <Input
                                                id="duration"
                                                placeholder="e.g., 2-3 hours"
                                                value={editingModule.duration}
                                                onChange={(e) => setEditingModule({ ...editingModule, duration: e.target.value })}
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="description">Description *</Label>
                                        <Textarea
                                            id="description"
                                            rows={3}
                                            placeholder="Describe what students will learn in this module..."
                                            value={editingModule.description}
                                            onChange={(e) => setEditingModule({ ...editingModule, description: e.target.value })}
                                        />
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="xpReward">XP Reward</Label>
                                            <Input
                                                id="xpReward"
                                                type="number"
                                                value={editingModule.xpReward}
                                                onChange={(e) => setEditingModule({ ...editingModule, xpReward: parseInt(e.target.value) })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="status">Status</Label>
                                            <select
                                                id="status"
                                                className="w-full p-2 border rounded-md"
                                                value={editingModule.status}
                                                onChange={(e) => setEditingModule({ ...editingModule, status: e.target.value as Module['status'] })}
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="published">Published</option>
                                                <option value="archived">Disabled</option>
                                            </select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="moduleType">Module Type</Label>
                                            <select
                                                id="moduleType"
                                                className="w-full p-2 border rounded-md"
                                                value={editingModule.moduleType}
                                                onChange={(e) => setEditingModule({ ...editingModule, moduleType: e.target.value as Module['moduleType'] })}
                                            >
                                                <option value="start">Start Module</option>
                                                <option value="regular">Regular Module</option>
                                                <option value="final">Final Module</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="flex items-center space-x-2">
                                            <input
                                                type="checkbox"
                                                id="isRequired"
                                                checked={editingModule.isRequired}
                                                onChange={(e) => setEditingModule({ ...editingModule, isRequired: e.target.checked })}
                                                className="rounded border-gray-300"
                                            />
                                            <Label htmlFor="isRequired">Required Module (Cannot be deleted)</Label>
                                        </div>
                                    </div>
                                </TabsContent>

                                <TabsContent value="video" className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="videoUrl">Video URL</Label>
                                        <Input
                                            id="videoUrl"
                                            placeholder="https://youtube.com/watch?v=..."
                                            value={editingModule.videoUrl || ''}
                                            onChange={(e) => setEditingModule({ ...editingModule, videoUrl: e.target.value })}
                                        />
                                    </div>
                                    {editingModule.videoUrl && (
                                        <div className="mt-4">
                                            <Label>Video Preview</Label>
                                            <div className="mt-2 p-4 border rounded-lg bg-gray-50">
                                                <p className="text-sm text-gray-600">Video will be embedded here</p>
                                                <p className="text-xs text-gray-500 mt-1">{editingModule.videoUrl}</p>
                                            </div>
                                        </div>
                                    )}
                                </TabsContent>

                                <TabsContent value="notes" className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="notes">Module Notes</Label>
                                        <Textarea
                                            id="notes"
                                            rows={8}
                                            placeholder="Add detailed notes for this module..."
                                            value={editingModule.notes || ''}
                                            onChange={(e) => setEditingModule({ ...editingModule, notes: e.target.value })}
                                        />
                                    </div>
                                </TabsContent>

                                <TabsContent value="quiz" className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <Label className="text-lg font-semibold">Quiz Questions</Label>
                                        <Button
                                            type="button"
                                            size="sm"
                                            onClick={() => {
                                                const newQuestion = {
                                                    question: '',
                                                    options: ['', '', '', ''],
                                                    correctAnswer: 0
                                                };
                                                setEditingModule({
                                                    ...editingModule,
                                                    quiz: {
                                                        questions: [...(editingModule.quiz?.questions || []), newQuestion]
                                                    }
                                                });
                                            }}
                                        >
                                            <Plus className="h-4 w-4 mr-2" />
                                            Add Question
                                        </Button>
                                    </div>

                                    {editingModule.quiz?.questions?.map((question, questionIndex) => (
                                        <div key={questionIndex} className="border rounded-lg p-4 space-y-4 bg-gray-50">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-base font-medium">Question {questionIndex + 1}</Label>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    className="h-8 w-8 p-0 hover:bg-red-50 hover:border-red-200"
                                                    onClick={() => {
                                                        const updatedQuestions = editingModule.quiz?.questions?.filter((_, index) => index !== questionIndex) || [];
                                                        setEditingModule({
                                                            ...editingModule,
                                                            quiz: { questions: updatedQuestions }
                                                        });
                                                    }}
                                                >
                                                    <Trash2 className="h-4 w-4" />
                                                </Button>
                                            </div>

                                            <div className="space-y-2">
                                                <Label htmlFor={`question-${questionIndex}`}>Question Text</Label>
                                                <Textarea
                                                    id={`question-${questionIndex}`}
                                                    rows={2}
                                                    placeholder="Enter quiz question..."
                                                    value={question.question}
                                                    onChange={(e) => {
                                                        const updatedQuestions = [...(editingModule.quiz?.questions || [])];
                                                        updatedQuestions[questionIndex] = {
                                                            ...updatedQuestions[questionIndex],
                                                            question: e.target.value
                                                        };
                                                        setEditingModule({
                                                            ...editingModule,
                                                            quiz: { questions: updatedQuestions }
                                                        });
                                                    }}
                                                />
                                            </div>

                                            <div className="space-y-2">
                                                <Label>Answer Options</Label>
                                                {question.options.map((option, optionIndex) => (
                                                    <div key={optionIndex} className="flex items-center gap-2">
                                                        <Input
                                                            placeholder={`Option ${optionIndex + 1}`}
                                                            value={option}
                                                            onChange={(e) => {
                                                                const updatedQuestions = [...(editingModule.quiz?.questions || [])];
                                                                const newOptions = [...updatedQuestions[questionIndex].options];
                                                                newOptions[optionIndex] = e.target.value;
                                                                updatedQuestions[questionIndex] = {
                                                                    ...updatedQuestions[questionIndex],
                                                                    options: newOptions
                                                                };
                                                                setEditingModule({
                                                                    ...editingModule,
                                                                    quiz: { questions: updatedQuestions }
                                                                });
                                                            }}
                                                        />
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            className={`h-8 w-8 p-0 ${question.correctAnswer === optionIndex ? 'bg-primary text-white' : ''}`}
                                                            onClick={() => {
                                                                const updatedQuestions = [...(editingModule.quiz?.questions || [])];
                                                                updatedQuestions[questionIndex] = {
                                                                    ...updatedQuestions[questionIndex],
                                                                    correctAnswer: optionIndex
                                                                };
                                                                setEditingModule({
                                                                    ...editingModule,
                                                                    quiz: { questions: updatedQuestions }
                                                                });
                                                            }}
                                                        >
                                                            {question.correctAnswer === optionIndex ? '✓' : optionIndex + 1}
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}

                                    {(!editingModule.quiz?.questions || editingModule.quiz.questions.length === 0) && (
                                        <div className="text-center py-8 text-gray-500">
                                            <HelpCircle className="h-12 w-12 mx-auto mb-4 text-gray-300" />
                                            <p className="text-lg font-medium mb-2">No questions added yet</p>
                                            <p className="text-sm">Click "Add Question" to create your first quiz question</p>
                                        </div>
                                    )}
                                </TabsContent>
                            </Tabs>

                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-4 border-t">
                                <Button
                                    variant="outline"
                                    onClick={handleCancelAddModule}
                                >
                                    <X className="h-4 w-4 mr-2" />
                                    Cancel
                                </Button>
                                <Button onClick={handleSaveModule}>
                                    <Plus className="h-4 w-4 mr-2" />
                                    Add Module
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}