import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  PlayCircle, 
  FileText, 
  CheckCircle, 
  Trophy, 
  ArrowLeft, 
  ArrowRight,
  Clock,
  BookOpen,
  Video,
  FileCheck,
  Code,
  Award
} from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { courseModules, CourseContent, updateUserProgress, getUserProgress, markModuleInProgress, updateContentProgress, completeModule } from '@/data/courseModules';
import { toast } from 'sonner';
import YouTubePlayer from '@/components/YouTubePlayer';

export default function ModuleViewer() {
  const { moduleId } = useParams();
  const navigate = useNavigate();
  const [currentModule, setCurrentModule] = useState(courseModules.find(m => m.id === parseInt(moduleId || '0')));
  const [currentContentIndex, setCurrentContentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [key: string]: number }>({});
  const [quizResults, setQuizResults] = useState<{ [key: string]: boolean }>({});
  const [moduleProgress, setModuleProgress] = useState(0);

  useEffect(() => {
    if (moduleId) {
      const module = courseModules.find(m => m.id === parseInt(moduleId));
      if (module) {
        setCurrentModule(module);
        const progress = getUserProgress()[module.id] || 0;
        setModuleProgress(progress);
        
        // Mark module as in progress when user starts viewing it
        if (module.status === 'available') {
          markModuleInProgress(module.id);
        }
      }
    }
  }, [moduleId]);

  if (!currentModule) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Module Not Found</h2>
            <p className="text-muted-foreground mb-6">The requested module could not be found.</p>
            <Link to="/dashboard">
              <Button>Return to Dashboard</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentContent = currentModule.content[currentContentIndex];
  const isLastContent = currentContentIndex === currentModule.content.length - 1;
  const isFirstContent = currentContentIndex === 0;

  const handleContentComplete = () => {
    if (currentContent) {
      updateContentProgress(currentModule.id, currentContent.id, true);
      const completedCount = currentModule.content.filter(c => c.completed).length;
      const newProgress = Math.round((completedCount / currentModule.content.length) * 100);
      
      setModuleProgress(newProgress);
      
      if (newProgress === 100) {
        toast.success('Module completed! 🎉');
        completeModule(currentModule.id);
      } else {
        toast.success('Content completed! ✅');
      }
    }
  };

  const handleQuizSubmit = () => {
    if (currentContent.type === 'quiz') {
      let correctAnswers = 0;
      const results: { [key: string]: boolean } = {};
      
      currentContent.questions?.forEach(question => {
        const userAnswer = userAnswers[question.id];
        const isCorrect = userAnswer === question.correctAnswer;
        results[question.id] = isCorrect;
        if (isCorrect) correctAnswers++;
      });
      
      setQuizResults(results);
      const score = Math.round((correctAnswers / (currentContent.questions?.length || 1)) * 100);
      
      if (score >= 70) {
        toast.success(`Quiz passed! Score: ${score}%`);
        handleContentComplete();
      } else {
        toast.error(`Quiz failed. Score: ${score}%. Try again!`);
      }
    }
  };

  const handleNext = () => {
    if (isLastContent) {
      navigate('/dashboard');
    } else {
      setCurrentContentIndex(prev => prev + 1);
    }
  };

  const handlePrevious = () => {
    if (!isFirstContent) {
      setCurrentContentIndex(prev => prev - 1);
    }
  };

  const getContentIcon = (type: CourseContent['type']) => {
    switch (type) {
      case 'video': return <Video className="w-5 h-5" />;
      case 'reading': return <BookOpen className="w-5 h-5" />;
      case 'quiz': return <FileCheck className="w-5 h-5" />;
      case 'assessment': return <CheckCircle className="w-5 h-5" />;
      case 'project': return <Code className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const renderContent = () => {
    if (!currentContent) return null;

    switch (currentContent.type) {
      case 'video':
        return (
          <div className="space-y-6">
            <YouTubePlayer 
              videoId={currentContent.url || ''}
              title={currentContent.title}
              className="aspect-video"
            />
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{currentContent.title}</h3>
              <p className="text-muted-foreground">{currentContent.description}</p>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="w-4 h-4" />
                <span>{currentContent.duration}</span>
              </div>
            </div>
          </div>
        );

      case 'reading':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{currentContent.title}</h3>
              <p className="text-muted-foreground">{currentContent.description}</p>
            </div>
            <div className="prose prose-gray max-w-none">
              <div dangerouslySetInnerHTML={{ __html: currentContent.content?.replace(/\n/g, '<br>') || '' }} />
            </div>
          </div>
        );

      case 'quiz':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{currentContent.title}</h3>
              <p className="text-muted-foreground">{currentContent.description}</p>
            </div>
            <div className="space-y-6">
              {currentContent.questions?.map((question, index) => (
                <Card key={question.id}>
                  <CardContent className="p-6">
                    <h4 className="text-lg font-semibold mb-4">
                      {index + 1}. {question.question}
                    </h4>
                    <div className="space-y-3">
                      {question.options.map((option, optionIndex) => (
                        <label
                          key={optionIndex}
                          className={`flex items-center space-x-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                            userAnswers[question.id] === optionIndex
                              ? 'border-primary bg-primary/5'
                              : 'border-border hover:border-primary/50'
                          }`}
                        >
                          <input
                            type="radio"
                            name={question.id}
                            value={optionIndex}
                            checked={userAnswers[question.id] === optionIndex}
                            onChange={(e) => setUserAnswers(prev => ({
                              ...prev,
                              [question.id]: parseInt(e.target.value)
                            }))}
                            className="sr-only"
                          />
                          <span className="flex-1">{option}</span>
                          {quizResults[question.id] !== undefined && (
                            <Badge variant={quizResults[question.id] ? "default" : "destructive"}>
                              {quizResults[question.id] ? "Correct" : "Incorrect"}
                            </Badge>
                          )}
                        </label>
                      ))}
                    </div>
                    {quizResults[question.id] !== undefined && question.explanation && (
                      <div className="mt-4 p-4 bg-muted rounded-lg">
                        <p className="text-sm text-muted-foreground">
                          <strong>Explanation:</strong> {question.explanation}
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 'assessment':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{currentContent.title}</h3>
              <p className="text-muted-foreground">{currentContent.description}</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4">Requirements</h4>
                <ul className="space-y-2">
                  {currentContent.requirements?.map((requirement, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-muted-foreground" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        );

      case 'project':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold">{currentContent.title}</h3>
              <p className="text-muted-foreground">{currentContent.description}</p>
            </div>
            <Card>
              <CardContent className="p-6">
                <h4 className="text-lg font-semibold mb-4">Project Requirements</h4>
                <ul className="space-y-2">
                  {currentContent.requirements?.map((requirement, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <Trophy className="w-4 h-4 text-accent" />
                      <span>{requirement}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-6">
                  <Button className="w-full">
                    <Code className="w-4 h-4 mr-2" />
                    Submit Project
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      default:
        return <div>Content type not supported</div>;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Fixed Sidebar */}
      <div className="w-80 bg-card border-r border-border flex flex-col h-screen sticky top-0">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/dashboard">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Dashboard
              </Button>
            </Link>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              {getContentIcon(currentContent?.type || 'reading')}
              <h1 className="text-xl font-bold">{currentModule.title}</h1>
            </div>
            <p className="text-sm text-muted-foreground">{currentModule.description}</p>
            
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">{currentModule.estimatedTime}</span>
              </div>
              <div className="flex items-center gap-2">
                <Award className="w-4 h-4 text-gold" />
                <span className="text-xs font-medium text-gold">+{currentModule.xp} XP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Progress Section */}
        <div className="p-6 border-b border-border">
          <h3 className="text-lg font-semibold mb-4">Module Progress</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span>Progress</span>
                <span>{moduleProgress}%</span>
              </div>
              <Progress value={moduleProgress} className="h-2" />
            </div>
          </div>
        </div>

        {/* Content Navigation */}
        <div className="flex-1 overflow-y-auto p-6">
          <h4 className="font-semibold text-sm mb-4">Content</h4>
          <div className="space-y-2">
            {currentModule.content.map((content, index) => (
              <div
                key={content.id}
                className={`flex items-center gap-2 p-3 rounded-lg cursor-pointer transition-colors ${
                  index === currentContentIndex
                    ? 'bg-primary/10 border border-primary'
                    : content.completed
                    ? 'bg-green-50 border border-green-200'
                    : 'hover:bg-muted'
                }`}
                onClick={() => setCurrentContentIndex(index)}
              >
                {getContentIcon(content.type)}
                <span className="text-sm flex-1">{content.title}</span>
                {content.completed && <CheckCircle className="w-4 h-4 text-green-600" />}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scrollable Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-8">
          <Card>
            <CardContent className="p-8">
              {renderContent()}
              
              {/* Action Buttons */}
              <div className="flex justify-between items-center mt-8 pt-6 border-t">
                <Button
                  variant="outline"
                  onClick={handlePrevious}
                  disabled={isFirstContent}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Previous
                </Button>
                
                <div className="flex gap-2">
                  {currentContent?.type === 'quiz' && (
                    <Button onClick={handleQuizSubmit}>
                      Submit Quiz
                    </Button>
                  )}
                  {currentContent?.type !== 'quiz' && (
                    <Button onClick={handleContentComplete}>
                      Mark Complete
                    </Button>
                  )}
                  <Button onClick={handleNext}>
                    {isLastContent ? 'Finish Module' : 'Next'}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
