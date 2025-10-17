# Authentication & Cache System Documentation

## Overview

This document outlines the login system, authentication context, and cache management implementation for the GigLabs Internship Platform.

## Features

✅ **Login Screen** - Beautiful, theme-integrated login interface
✅ **Session Management** - Token-based authentication with cache
✅ **Protected Routes** - Guard pages that require authentication
✅ **User Caching** - Persistent user data across sessions
✅ **Auto-logout** - Session expiry validation
✅ **Profile Integration** - Display cached user data on profile page

## Architecture

### 1. Cache System (`src/lib/cache.ts`)

Manages all localStorage operations for authentication data.

**Features:**
- User data caching with 24-hour expiry
- Auth token storage
- Session management
- Cache validation and cleanup

**Key Methods:**
```typescript
// User caching
cacheService.setCachedUser(user)
cacheService.getCachedUser()
cacheService.clearUser()

// Token management
cacheService.setAuthToken(token)
cacheService.getAuthToken()

// Session management
cacheService.isSessionValid()
cacheService.clearAll()
```

### 2. Auth Context (`src/context/auth-context.ts` & `src/context/AuthContext.tsx`)

Provides authentication state and methods throughout the app.

**Context Type:**
```typescript
interface AuthContextType {
  user: CachedUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (user: Partial<CachedUser>) => void;
}
```

**Features:**
- Automatic session restoration on app load
- User profile management
- Global authentication state

### 3. Auth Hook (`src/hooks/use-auth.ts`)

Custom hook for using auth context in components.

```typescript
const { user, isAuthenticated, isLoading, login, logout, updateProfile } = useAuth();
```

### 4. Login Page (`src/pages/Login.tsx`)

Beautiful login interface matching your site theme.

**Features:**
- Email validation
- Password validation
- Real-time error messages
- Loading states
- Responsive design
- Theme-consistent styling
- Links to sign-up and forgot password

**Demo Credentials:**
- Email: any valid email format
- Password: minimum 6 characters

### 5. Protected Route Component (`src/components/ProtectedRoute.tsx`)

Guards pages requiring authentication.

**Usage:**
```tsx
<Route path="/profile" element={
  <ProtectedRoute>
    <Profile />
  </ProtectedRoute>
} />
```

**Behavior:**
- Redirects to login if not authenticated
- Shows loading skeleton while checking auth state
- Persists across page refreshes

## User Data Structure

```typescript
interface CachedUser {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  level?: number;
  xp?: number;
  role?: 'student' | 'tutor' | 'admin';
  timestamp: number;
}
```

## Authentication Flow

### Login Flow

```
1. User navigates to /login
2. Enters email and password
3. Form validation occurs
4. On submit:
   - API call to authenticate (currently mocked)
   - User data cached with timestamp
   - Auth tokens stored
   - Session expiry set to 24 hours
   - Redirect to /profile

5. Profile page displays:
   - Cached user information
   - User avatar (with initials fallback)
   - User level and XP
   - User role
```

### Session Restoration Flow

```
1. App loads (App.tsx -> AuthProvider)
2. AuthProvider useEffect runs
3. Checks if cached user exists
4. Validates session hasn't expired
5. Restores user state if valid
6. Clears cache if invalid
```

### Logout Flow

```
1. User clicks "Sign Out" button on profile
2. logout() called
3. All cache cleared (user, tokens, session)
4. User state set to null
5. Redirect to home page
```

## Protected Routes

Currently protected routes:
- `/profile` - User profile page
- `/admin/*` - All admin pages
  - `/admin/students`
  - `/admin/courses`
  - `/admin/tutors`
  - `/admin/batches`
  - `/admin/payments`
  - `/admin/settings`

## Integration with Backend

### Current State (Mock)
The `login()` function in `AuthContext.tsx` currently uses a mock implementation. 

### To Connect to Real API

Replace the mock login function:

```typescript
const login = async (email: string, password: string) => {
  setIsLoading(true);
  try {
    // Call your API
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    if (!response.ok) {
      throw new Error('Authentication failed');
    }

    const data = await response.json();
    
    // Cache the response
    cacheService.setCachedUser(data.user);
    cacheService.setAuthToken(data.token);
    cacheService.setRefreshToken(data.refreshToken);
    cacheService.setSessionExpiry(data.expiresAt);

    setUser(data.user);
  } catch (error) {
    cacheService.clearAll();
    throw error;
  } finally {
    setIsLoading(false);
  }
};
```

## Cache Storage

Data is stored in browser's `localStorage`:

**Keys Used:**
- `giglabs_user` - Cached user object with timestamp
- `giglabs_token` - Auth token
- `giglabs_refresh_token` - Refresh token
- `giglabs_session_expires` - Session expiry timestamp

**Cache Expiry:**
- Default: 24 hours
- On app load: Validates timestamp
- Invalid sessions are automatically cleared

## Styling & Theme

The login page uses your site's existing design system:

- **Colors**: Primary, secondary, accent from theme variables
- **Typography**: Font families from tailwind config
- **Components**: Existing UI components (Button, Input, Card, etc.)
- **Animations**: Consistent with PageTransition animations
- **Dark Mode**: Fully supported via existing dark mode setup

## Component Updates

### Profile Page Changes

Added:
- `useAuth` hook integration
- User data from cache
- Avatar display with fallback
- Dynamic level, XP, and role display
- Sign Out button
- Logout functionality

### App.tsx Changes

Added:
- `AuthProvider` wrapper
- `/login` route
- `ProtectedRoute` wrapper for secured pages

## Testing the System

### Test Login
1. Navigate to `/login`
2. Enter any email (e.g., `test@example.com`)
3. Enter password (minimum 6 characters)
4. Click "Sign In"
5. Should redirect to `/profile`

### Test Session Persistence
1. Login as above
2. Refresh the page
3. Should still be logged in (cached session)

### Test Protected Routes
1. Clear cache (DevTools > Application > localStorage)
2. Try to navigate directly to `/profile`
3. Should redirect to `/login`

### Test Logout
1. Login as above
2. Click "Sign Out" button
3. Should redirect to home page
4. Try to access `/profile`
5. Should redirect to `/login`

## Error Handling

The system includes error handling for:
- Invalid email format
- Password too short
- Network errors (when integrated with API)
- Cache read/write failures
- Expired sessions

## Security Considerations

Current implementation considerations:

1. **Tokens**: Currently stored in localStorage
   - For production: Consider HttpOnly cookies for tokens
   - Implement refresh token rotation
   - Add CSRF protection

2. **Session Validation**: 
   - Validates on app load
   - Should validate on API calls (in backend)
   - Implement timeout warnings

3. **Password**: 
   - Minimum 6 characters (adjust as needed)
   - Should be transmitted over HTTPS
   - Never stored in cache

## Future Enhancements

- [ ] Implement forgot password flow
- [ ] Add two-factor authentication
- [ ] Implement social login (Google, GitHub)
- [ ] Add session timeout warning
- [ ] Implement remember me functionality
- [ ] Add login history tracking
- [ ] Implement rate limiting on login attempts
- [ ] Add biometric authentication
- [ ] Implement role-based access control UI
- [ ] Add password strength indicator

## Files Modified/Created

**Created:**
- `src/lib/cache.ts` - Cache service
- `src/context/auth-context.ts` - Auth context interface
- `src/context/AuthContext.tsx` - Auth provider component
- `src/hooks/use-auth.ts` - Auth hook
- `src/pages/Login.tsx` - Login page
- `src/components/ProtectedRoute.tsx` - Route protection component
- `AUTH_SYSTEM.md` - This documentation

**Modified:**
- `src/App.tsx` - Added AuthProvider and Login route
- `src/pages/Profile.tsx` - Integrated user data and logout

## Usage Examples

### In Components

```tsx
import { useAuth } from '@/hooks/use-auth';

function MyComponent() {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <div>
      {isAuthenticated && <p>Welcome, {user?.name}</p>}
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### With Protected Routes

```tsx
<Route path="/my-page" element={
  <ProtectedRoute>
    <MyPage />
  </ProtectedRoute>
} />
```

### Updating User Profile

```tsx
const { updateProfile } = useAuth();

updateProfile({
  level: 5,
  xp: 1000
});
```

## Support

For questions or issues with the authentication system, refer to the component files and their inline documentation.
