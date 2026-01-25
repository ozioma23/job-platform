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

  // Load logged-in user on app load
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const signup = (newUser: User) => {
    // save registered user
    localStorage.setItem("registeredUser", JSON.stringify(newUser));

    // auto login after signup
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));
    setUser(newUser);

    return true;
  };

  const login = (email: string, password: string) => {
    const storedUser = localStorage.getItem("registeredUser");
    if (!storedUser) return false;

    const parsedUser: User = JSON.parse(storedUser);

    if (parsedUser.email === email && parsedUser.password === password) {
      setUser(parsedUser);
      localStorage.setItem("loggedInUser", JSON.stringify(parsedUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
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
