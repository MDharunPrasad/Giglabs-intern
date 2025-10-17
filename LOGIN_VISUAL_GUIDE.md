# 🎯 Login System - Visual Guide

## 🔄 Authentication Flow Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                    USER FLOW                                │
└─────────────────────────────────────────────────────────────┘

                      ┌──────────────┐
                      │  App Loads   │
                      └──────┬───────┘
                             │
                    ┌────────▼────────┐
                    │  AuthProvider   │
                    │  initializes    │
                    └────────┬────────┘
                             │
                    ┌────────▼───────────────────┐
                    │ Check localStorage for    │
                    │ cached user + session?    │
                    └────────┬──────────┬────────┘
                    ┌────────▼──┐    ┌─▼─────────┐
                    │    YES    │    │     NO    │
                    └────────┬──┘    └─┬─────────┘
                    ┌────────▼──────┐  │
                    │  Validate     │  │
                    │  expiry?      │  │
                    └──┬─────────┬──┘  │
                ┌──────▼──┐  ┌──▼───┐ │
                │  YES    │  │ NO   │ │
                └────┬────┘  └──┬───┘ │
                     │          │    │
         ┌───────────▼──────────▼────▼──────────┐
         │   User = null                        │
         │   Show Login Page                    │
         └───────────┬──────────────────────────┘
                     │
         ┌───────────▼──────────────────────┐
         │  User enters credentials        │
         │  - Email validation             │
         │  - Password validation          │
         └───────────┬──────────────────────┘
                     │
         ┌───────────▼──────────────────────┐
         │  Click "Sign In"                 │
         │  - Call login()                  │
         │  - Show loading state            │
         └───────────┬──────────────────────┘
                     │
         ┌───────────▼──────────────────────┐
         │  API Authentication              │
         │  (Mock or Real Backend)          │
         └──┬──────────────────────────┬────┘
            │                          │
         ┌──▼──────────┐          ┌────▼──────┐
         │   SUCCESS   │          │  FAILURE  │
         └──┬──────────┘          └────┬──────┘
            │                          │
    ┌───────▼─────────────┐    ┌──────▼──────────┐
    │ Cache user data     │    │ Show error      │
    │ Cache tokens        │    │ Clear form      │
    │ Set session expiry  │    │ Clear cache     │
    └───────┬─────────────┘    └─────────────────┘
            │
    ┌───────▼──────────────────┐
    │ Redirect to /profile     │
    │ Show user info           │
    │ - Avatar/Initials        │
    │ - Name & Email           │
    │ - Level & XP             │
    │ - Role                   │
    └───────┬──────────────────┘
            │
    ┌───────▼──────────────────┐
    │ User can:                │
    │ - View profile           │
    │ - Access dashboard       │
    │ - Click "Sign Out"       │
    └────────────────────────────┘
                │
        ┌───────▼──────────────────┐
        │  Click Sign Out           │
        │  - Clear cache            │
        │  - Clear user state       │
        │  - Redirect to home       │
        └──────────────────────────┘
```

## 📁 File Structure

```
src/
├── context/
│   ├── auth-context.ts          ← Auth context type & creation
│   └── AuthContext.tsx          ← Auth provider component
├── hooks/
│   └── use-auth.ts              ← Auth hook for components
├── lib/
│   └── cache.ts                 ← Cache service
├── pages/
│   ├── Login.tsx                ← Login page (NEW)
│   └── Profile.tsx              ← Updated with user data
├── components/
│   └── ProtectedRoute.tsx        ← Route protection (NEW)
└── App.tsx                       ← Updated with auth setup

DATABASE: Browser localStorage
├── giglabs_user                 ← Cached user object
├── giglabs_token                ← Auth token
├── giglabs_refresh_token        ← Refresh token
└── giglabs_session_expires      ← Expiry timestamp
```

## 🎨 Login Page Preview

```
┌──────────────────────────────────────────┐
│                                          │
│     ✨ (Gradient background)            │
│                                          │
│          🔐  ← Icon                      │
│     Welcome Back                         │
│     Sign in to continue learning         │
│                                          │
│   ┌──────────────────────────────────┐  │
│   │                                  │  │
│   │  📧 Email Address                │  │
│   │  [____________________]           │  │
│   │                                  │  │
│   │  🔒 Password                     │  │
│   │  [____________________] Forgot?  │  │
│   │                                  │  │
│   │  ☑ Keep me signed in             │  │
│   │                                  │  │
│   │  [    Sign In (Loading...)    ]  │  │
│   │                                  │  │
│   │  Don't have account? Sign up →  │  │
│   │                                  │  │
│   └──────────────────────────────────┘  │
│                                          │
│     🔒 Secure   ⚡ Fast   ✨ Simple    │
│                                          │
└──────────────────────────────────────────┘
```

## 🔐 User Data Cache

```javascript
// What's stored in localStorage after login

localStorage['giglabs_user'] = {
  id: "abc123xyz",
  email: "user@example.com",
  name: "John Doe",
  avatar: "https://api.dicebear.com/...",
  level: 1,
  xp: 0,
  role: "student",
  timestamp: 1697568000000
}

localStorage['giglabs_token'] = "token_abc123xyz"
localStorage['giglabs_refresh_token'] = "refresh_abc123xyz"
localStorage['giglabs_session_expires'] = "1697654400000"
```

## 📊 Protected Routes Structure

```
/login                    ← PUBLIC
  └─ Anyone can access
  
/profile                  ← PROTECTED
  └─ AuthProvider
     └─ ProtectedRoute
        └─ Only if isAuthenticated
        
/admin                    ← PROTECTED
/admin/students           ← PROTECTED
/admin/courses            ← PROTECTED
/admin/tutors             ← PROTECTED
/admin/batches            ← PROTECTED
/admin/payments           ← PROTECTED
/admin/settings           ← PROTECTED
  └─ All wrapped with ProtectedRoute
  
/ (landing)               ← PUBLIC
/browse-courses           ← PUBLIC
/registration             ← PUBLIC
```

## 🔄 State Management

```
AuthContext
├── user: CachedUser | null
│   ├── id
│   ├── email
│   ├── name
│   ├── avatar
│   ├── level
│   ├── xp
│   ├── role
│   └── timestamp
│
├── isAuthenticated: boolean
├── isLoading: boolean
│
├── login(email, password): Promise<void>
├── logout(): void
└── updateProfile(updates): void
```

## 🔍 Component Usage

```tsx
// Using the auth hook
import { useAuth } from '@/hooks/use-auth';

function MyComponent() {
  const { 
    user,              // Current user or null
    isAuthenticated,   // boolean
    isLoading,         // boolean
    login,             // async function
    logout,            // function
    updateProfile      // function
  } = useAuth();

  return (
    <>
      {isLoading && <p>Loading...</p>}
      {isAuthenticated && (
        <div>
          <p>Welcome, {user?.name}</p>
          <button onClick={logout}>Logout</button>
        </div>
      )}
      {!isAuthenticated && (
        <p>Please login first</p>
      )}
    </>
  );
}
```

## 🛡️ Protected Route Usage

```tsx
<Route path="/profile" element={
  <ProtectedRoute>
    <Profile />
  </ProtectedRoute>
} />
```

When user tries to access:
- ✅ If authenticated → Show Profile
- ❌ If not authenticated → Redirect to /login
- ⏳ While checking → Show loading skeleton

## ⚙️ Session Management

```
┌─────────────────┐
│  User Logs In   │
└────────┬────────┘
         │
         ├─► Cache user data
         ├─► Cache tokens
         ├─► Set session_expires = now + 24h
         │
         └─► ✅ Session active
         
┌──────────────────┐
│ User Refreshes   │
│ the Page         │
└────────┬─────────┘
         │
         ├─► Check cached user exists?
         ├─► Check session_expires > now?
         │
         └─► ✅ Restore session from cache
         
┌──────────────────┐
│  24 hours pass   │
│  User refreshes  │
└────────┬─────────┘
         │
         ├─► Check cached user exists?
         ├─► Check session_expires > now? ❌ NO
         │
         └─► Clear all cache, redirect to login
         
┌──────────────────┐
│ User Logs Out    │
└────────┬─────────┘
         │
         ├─► Clear cached user
         ├─► Clear tokens
         ├─► Clear session_expires
         │
         └─► Redirect to home
```

## 🧪 Testing Checklist

- [ ] Navigate to /login
- [ ] See login form
- [ ] Try invalid email → Error shown
- [ ] Try short password → Error shown
- [ ] Enter valid credentials → Form valid
- [ ] Click Sign In → Loading state
- [ ] Redirects to /profile
- [ ] See cached user info
- [ ] Refresh page → Still logged in
- [ ] Clear cache → Redirects to login
- [ ] Click Sign Out → Logged out
- [ ] Try to access /profile → Redirects to login

---

**Everything is ready to use! Start testing now! 🚀**
