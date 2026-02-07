"use client";

import React, {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from "react";
import { User } from "@/types/user";

interface UserContextType {
  user: User | null;
  signup: (user: User) => boolean;
  login: (email: string, password: string) => boolean;
  logout: () => void;
  updateUser: (user: User) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Load logged-in user on mount
  useEffect(() => {
    const savedUser = localStorage.getItem("loggedInUser");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  const signup = (newUser: User) => {
    // Load existing users array or empty
    const storedUsers = localStorage.getItem("registeredUsers");
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];

    // Add new user
    users.push(newUser);

    // Save updated array
    localStorage.setItem("registeredUsers", JSON.stringify(users));

    // Set as logged in
    setUser(newUser);
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    return true;
  };

  const login = (email: string, password: string) => {
    const storedUsers = localStorage.getItem("registeredUsers");
    if (!storedUsers) return false;

    const users: User[] = JSON.parse(storedUsers);
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );

    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("loggedInUser", JSON.stringify(foundUser));
      return true;
    }

    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("loggedInUser");
  };

  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));

    // Update in registeredUsers array
    const storedUsers = localStorage.getItem("registeredUsers");
    const users: User[] = storedUsers ? JSON.parse(storedUsers) : [];
    const index = users.findIndex((u) => u.id === updatedUser.id);
    if (index !== -1) {
      users[index] = updatedUser;
      localStorage.setItem("registeredUsers", JSON.stringify(users));
    }
  };

  return (
    <UserContext.Provider value={{ user, signup, login, logout, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) throw new Error("useUser must be used within UserProvider");
  return context;
};
