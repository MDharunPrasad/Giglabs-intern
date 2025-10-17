import { Card } from '@/components/ui/card';
import { Sparkles, BookOpen, Users, Briefcase } from 'lucide-react';

type UserRole = 'student' | 'tutor' | 'admin';

interface RoleSelectionProps {
  onRoleSelect: (role: UserRole) => void;
}

export function RoleSelection({ onRoleSelect }: RoleSelectionProps) {
  const handleRoleClick = (role: UserRole) => {
    onRoleSelect(role);
    window.scrollTo(0, 0);
  };

  const roles = [
    {
      id: 'student' as UserRole,
      icon: BookOpen,
      title: 'Student',
      description: 'Learn new skills, earn certificates, and track your progress',
      iconBgColor: 'bg-primary/10',
      iconHoverColor: 'group-hover:bg-primary/20',
      iconColor: 'text-primary',
      borderColor: 'hover:border-primary/50',
      shadowColor: 'hover:shadow-primary/20',
      textColor: 'text-primary',
      borderBottomColor: 'border-primary/10',
    },
    {
      id: 'tutor' as UserRole,
      icon: Users,
      title: 'Tutor',
      description: 'Teach, inspire students, and build your teaching portfolio',
      iconBgColor: 'bg-accent/10',
      iconHoverColor: 'group-hover:bg-accent/20',
      iconColor: 'text-accent',
      borderColor: 'hover:border-accent/50',
      shadowColor: 'hover:shadow-accent/20',
      textColor: 'text-accent',
      borderBottomColor: 'border-accent/10',
    },
    {
      id: 'admin' as UserRole,
      icon: Briefcase,
      title: 'Admin',
      description: 'Manage platform, users, and oversee all activities',
      iconBgColor: 'bg-gold/10',
      iconHoverColor: 'group-hover:bg-gold/20',
      iconColor: 'text-gold',
      borderColor: 'hover:border-gold/50',
      shadowColor: 'hover:shadow-gold/20',
      textColor: 'text-gold',
      borderBottomColor: 'border-gold/10',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12 overflow-x-hidden relative">
      {/* Background gradient elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-20 pointer-events-none" />

      <div className="w-full max-w-2xl relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 border border-primary/20 mb-6 mx-auto">
            <Sparkles className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-4xl font-display font-bold mb-3">Select Your Role</h1>
          <p className="text-muted-foreground text-lg">
            Choose your role to get started with GigLabs
          </p>
        </div>

        {/* Role Selection Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {roles.map((role) => {
            const IconComponent = role.icon;
            return (
              <button
                key={role.id}
                onClick={() => handleRoleClick(role.id)}
                className="group relative overflow-hidden"
              >
                <Card className={`h-full p-8 border-2 border-transparent ${role.borderColor} transition-all duration-300 hover:shadow-lg ${role.shadowColor} cursor-pointer bg-card/95 backdrop-blur-sm`}>
                  <div className="space-y-4 text-center">
                    <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${role.iconBgColor} ${role.iconHoverColor} transition-colors mx-auto mb-2`}>
                      <IconComponent className={`w-8 h-8 ${role.iconColor}`} />
                    </div>
                    <div>
                      <h2 className="text-xl font-display font-bold mb-2">{role.title}</h2>
                      <p className="text-sm text-muted-foreground">
                        {role.description}
                      </p>
                    </div>
                    <div className={`pt-4 border-t ${role.borderBottomColor}`}>
                      <span className={`text-xs font-medium ${role.textColor}`}>
                        Continue Login →
                      </span>
                    </div>
                  </div>
                </Card>
              </button>
            );
          })}
        </div>

        {/* Additional Info */}
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            Not sure which role? Check our{' '}
            <button className="text-primary hover:underline font-medium">
              role guide
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}
