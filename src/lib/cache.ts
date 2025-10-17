// Cache utility for storing user data in localStorage

export interface CachedUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  level?: number;
  xp?: number;
  role?: 'student' | 'tutor' | 'admin';
  timestamp: number;
}

const CACHE_KEYS = {
  USER: 'giglabs_user',
  AUTH_TOKEN: 'giglabs_token',
  REFRESH_TOKEN: 'giglabs_refresh_token',
  SESSION_EXPIRES: 'giglabs_session_expires',
};

const CACHE_EXPIRY_TIME = 24 * 60 * 60 * 1000; // 24 hours

export const cacheService = {
  // User caching
  setCachedUser: (user: CachedUser) => {
    try {
      const userWithTimestamp = {
        ...user,
        timestamp: Date.now(),
      };
      localStorage.setItem(CACHE_KEYS.USER, JSON.stringify(userWithTimestamp));
    } catch (error) {
      console.error('Error caching user:', error);
    }
  },

  getCachedUser: (): CachedUser | null => {
    try {
      const cached = localStorage.getItem(CACHE_KEYS.USER);
      if (!cached) return null;

      const user: CachedUser = JSON.parse(cached);
      const now = Date.now();

      // Check if cache is expired
      if (now - user.timestamp > CACHE_EXPIRY_TIME) {
        cacheService.clearUser();
        return null;
      }

      return user;
    } catch (error) {
      console.error('Error retrieving cached user:', error);
      return null;
    }
  },

  clearUser: () => {
    try {
      localStorage.removeItem(CACHE_KEYS.USER);
    } catch (error) {
      console.error('Error clearing user cache:', error);
    }
  },

  // Token caching
  setAuthToken: (token: string) => {
    try {
      localStorage.setItem(CACHE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error('Error caching auth token:', error);
    }
  },

  getAuthToken: (): string | null => {
    try {
      return localStorage.getItem(CACHE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error('Error retrieving auth token:', error);
      return null;
    }
  },

  setRefreshToken: (token: string) => {
    try {
      localStorage.setItem(CACHE_KEYS.REFRESH_TOKEN, token);
    } catch (error) {
      console.error('Error caching refresh token:', error);
    }
  },

  getRefreshToken: (): string | null => {
    try {
      return localStorage.getItem(CACHE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error('Error retrieving refresh token:', error);
      return null;
    }
  },

  // Session management
  setSessionExpiry: (expiryTime: number) => {
    try {
      localStorage.setItem(CACHE_KEYS.SESSION_EXPIRES, expiryTime.toString());
    } catch (error) {
      console.error('Error setting session expiry:', error);
    }
  },

  getSessionExpiry: (): number | null => {
    try {
      const expiry = localStorage.getItem(CACHE_KEYS.SESSION_EXPIRES);
      return expiry ? parseInt(expiry, 10) : null;
    } catch (error) {
      console.error('Error retrieving session expiry:', error);
      return null;
    }
  },

  isSessionValid: (): boolean => {
    try {
      const expiry = cacheService.getSessionExpiry();
      if (!expiry) return false;
      return Date.now() < expiry;
    } catch (error) {
      console.error('Error checking session validity:', error);
      return false;
    }
  },

  // Clear all auth data
  clearAll: () => {
    try {
      localStorage.removeItem(CACHE_KEYS.USER);
      localStorage.removeItem(CACHE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(CACHE_KEYS.REFRESH_TOKEN);
      localStorage.removeItem(CACHE_KEYS.SESSION_EXPIRES);
    } catch (error) {
      console.error('Error clearing all cache:', error);
    }
  },
};
