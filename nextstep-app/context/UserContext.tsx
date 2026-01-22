"use client";

import React, { createContext, useContext, ReactNode, useState, useEffect } from "react";

interface User {
  username: string;
  email: string;
  password: string;
}

interface UserContextType {
  user: User | null;
  signup: (user: User) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signup = (newUser: User) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
    return true; // success
  };

  const login = (email: string, password: string) => {
    if (user && user.email === email && user.password === password) {
      return true; // success
    }
    return false; // failed
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={{ user, signup, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
