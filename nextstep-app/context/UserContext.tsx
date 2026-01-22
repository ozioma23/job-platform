"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface User {
  id: string;
  name: string;
  email: string;
}

interface UserContextType {
  user: User | null;
  login: (email: string, password: string) => boolean;
  signup: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  isAuthenticated: boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  const login = (email: string, password: string) => {
    // For now, simple mock login
    if (email && password) {
      setUser({ id: "1", name: "Faith Ozioma", email });
      return true;
    }
    return false;
  };

  const signup = (name: string, email: string, password: string) => {
    if (name && email && password) {
      setUser({ id: "1", name, email });
      return true;
    }
    return false;
  };

  const logout = () => setUser(null);

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within a UserProvider");
  return context;
};
