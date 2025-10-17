import { createContext } from 'react';
import { CachedUser } from '@/lib/cache';

export interface AuthContextType {
  user: CachedUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string, role?: 'student' | 'tutor' | 'admin') => Promise<void>;
  logout: () => void;
  updateProfile: (user: Partial<CachedUser>) => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
