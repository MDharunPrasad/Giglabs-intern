import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { Mail, Lock, Loader2, AlertCircle, Sparkles, ArrowLeft } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { RoleSelection } from '@/components/RoleSelection';

type UserRole = 'student' | 'tutor' | 'admin' | null;

export default function Login() {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;
    setEmail(newEmail);
    validateForm(newEmail, password);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    validateForm(email, newPassword);
  };

  const validateForm = (emailVal: string, passwordVal: string) => {
    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal);
    const isPasswordValid = passwordVal.length >= 6;
    setIsFormValid(isEmailValid && isPasswordValid);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      await login(email, password, selectedRole);
      navigate('/profile');
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Login failed. Please try again.'
      );
    }
  };

  // Role selection screen
  if (!selectedRole) {
    return <RoleSelection onRoleSelect={setSelectedRole} />;
  }

  // Login form screen
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5 flex items-center justify-center px-4 py-12 overflow-x-hidden relative">
      {/* Background gradient elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-30 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-20 pointer-events-none" />

      <div className="w-full max-w-md relative z-10">
        {/* Header with Back Button */}
        <div className="mb-8">
          <button
            onClick={() => {
              setSelectedRole(null);
              setError('');
              setEmail('');
              setPassword('');
            }}
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back to Roles</span>
          </button>

          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 dark:bg-white/5 backdrop-blur-md border border-white/20 dark:border-white/10">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <span className="text-xs text-muted-foreground capitalize">
                {selectedRole} login
              </span>
            </div>
            <h1 className="text-3xl font-display font-bold">Welcome Back</h1>
            <p className="text-muted-foreground">
              Sign in to your {selectedRole} account to continue
            </p>
          </div>
        </div>

        {/* Login Card */}
        <Card className="p-8 border border-primary/10 shadow-lg backdrop-blur-sm bg-card/95">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Error Alert */}
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Email Input */}
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email Address
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={handleEmailChange}
                  disabled={isLoading}
                  className="pl-10 bg-input/50 border-primary/20 focus:border-primary/50 transition-colors"
                />
              </div>
              {email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                <p className="text-xs text-destructive">
                  Please enter a valid email address
                </p>
              )}
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium">
                  Password
                </Label>
                <button
                  type="button"
                  className="text-xs text-primary hover:underline"
                  onClick={() => navigate('/forgot-password')}
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={handlePasswordChange}
                  disabled={isLoading}
                  className="pl-10 bg-input/50 border-primary/20 focus:border-primary/50 transition-colors"
                />
              </div>
              {password && password.length < 6 && (
                <p className="text-xs text-destructive">
                  Password must be at least 6 characters
                </p>
              )}
            </div>

            {/* Remember Me */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="w-4 h-4 rounded border-primary/30 text-primary"
                disabled={isLoading}
              />
              <label htmlFor="remember" className="ml-2 text-sm text-muted-foreground">
                Keep me signed in
              </label>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={!isFormValid || isLoading}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-medium h-11 transition-all"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Signing in...
                </>
              ) : (
                'Sign In'
              )}
            </Button>

            {/* Sign Up Link */}
            <div className="text-center">
              <p className="text-sm text-muted-foreground">
                Don't have an account?{' '}
                <button
                  type="button"
                  onClick={() => navigate('/registration')}
                  className="text-primary hover:underline font-medium"
                >
                  Sign up
                </button>
              </p>
            </div>
          </form>
        </Card>

        {/* Features Info */}
        <div className="mt-8 grid grid-cols-3 gap-4">
          {[
            { label: 'Secure', icon: '🔒' },
            { label: 'Fast', icon: '⚡' },
            { label: 'Simple', icon: '✨' },
          ].map((feature) => (
            <div
              key={feature.label}
              className="text-center p-3 rounded-lg bg-card/50 border border-primary/10 hover:border-primary/30 transition-all"
            >
              <div className="text-2xl mb-1">{feature.icon}</div>
              <p className="text-xs font-medium text-muted-foreground">
                {feature.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
