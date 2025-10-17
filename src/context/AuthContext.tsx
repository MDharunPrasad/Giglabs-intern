import React, { useState, useEffect } from 'react';
import { cacheService, CachedUser } from '@/lib/cache';
import { AuthContext, AuthContextType } from './auth-context';

export { AuthContext, type AuthContextType } from './auth-context';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<CachedUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Initialize from cache on mount
  useEffect(() => {
    const cachedUser = cacheService.getCachedUser();
    if (cachedUser && cacheService.isSessionValid()) {
      setUser(cachedUser);
    } else {
      cacheService.clearAll();
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string, role?: 'student' | 'tutor' | 'admin') => {
    setIsLoading(true);
    try {
      // TODO: Replace with actual API call
      // For now, this is a mock implementation
      const mockUser: CachedUser = {
        id: Math.random().toString(36).substr(2, 9),
        email,
        name: email.split('@')[0],
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        level: 1,
        xp: 0,
        role: role || 'student',
        timestamp: Date.now(),
      };

      // Simulate API delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Validate password (mock)
      if (password.length < 6) {
        throw new Error('Invalid credentials');
      }

      // Cache the user and tokens
      cacheService.setCachedUser(mockUser);
      cacheService.setAuthToken(`token_${mockUser.id}`);
      cacheService.setRefreshToken(`refresh_${mockUser.id}`);
      cacheService.setSessionExpiry(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

      setUser(mockUser);
    } catch (error) {
      cacheService.clearAll();
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    cacheService.clearAll();
    setUser(null);
  };

  const updateProfile = (updates: Partial<CachedUser>) => {
    if (!user) return;

    const updatedUser: CachedUser = {
      ...user,
      ...updates,
      timestamp: Date.now(),
    };

    setUser(updatedUser);
    cacheService.setCachedUser(updatedUser);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook is exported from hooks/use-auth.ts
