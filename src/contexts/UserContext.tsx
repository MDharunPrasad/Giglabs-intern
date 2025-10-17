import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type UserRole = "student" | "tutor" | "admin";

interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

interface UserContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  isStudent: boolean;
  isTutor: boolean;
  isAdmin: boolean;
  switchRole: (role: UserRole) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Load user from localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      // Default to admin for demo purposes
      const defaultUser: User = {
        id: "admin-1",
        name: "Admin User",
        email: "admin@giglabs.com",
        role: "admin",
      };
      setUser(defaultUser);
      localStorage.setItem("currentUser", JSON.stringify(defaultUser));
    }
  }, []);

  const switchRole = (role: UserRole) => {
    if (!user) return;
    
    const updatedUser = { ...user, role };
    setUser(updatedUser);
    localStorage.setItem("currentUser", JSON.stringify(updatedUser));
  };

  const value: UserContextType = {
    user,
    setUser: (newUser) => {
      setUser(newUser);
      if (newUser) {
        localStorage.setItem("currentUser", JSON.stringify(newUser));
      } else {
        localStorage.removeItem("currentUser");
      }
    },
    isStudent: user?.role === "student",
    isTutor: user?.role === "tutor",
    isAdmin: user?.role === "admin",
    switchRole,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
}

export function useUser() {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
}
