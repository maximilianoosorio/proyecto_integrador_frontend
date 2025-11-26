'use client'

import { createContext, useContext, useState } from "react";
import { User } from "../types/user";
import * as auth from "../services/authService";

type AuthValue = { user: User | null; login: (email: string, password: string) => Promise<void>; logout: () => void };

const AuthContext = createContext<AuthValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  async function login(email: string, password: string) {
    const u = await auth.login(email, password);
    setUser(u);
  }

  function logout() {
    setUser(null);
  }

  return <AuthContext.Provider value={{ user, login, logout }}>{children}</AuthContext.Provider>;
}

export function useAuthContext() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("AuthContext not found");
  return ctx;
}
