import React, { createContext, useState, useEffect, ReactNode } from "react";
import AuthService from "../services/auth.service";
import { jwtDecode } from "jwt-decode";
import { User } from "../models/user.model";

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => Promise<void>;
  register: (
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken) as User;
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token", error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const response = await AuthService.login(username, password);
    const decoded = jwtDecode(response.accessToken) as User;
    setUser(decoded);
  };

  const register = async (
    username: string,
    password: string,
    firstName: string,
    lastName: string
  ) => {
    const response = await AuthService.register(
      username,
      password,
      firstName,
      lastName
    );
    setUser(new User(response as unknown));
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const refreshToken = async () => {
    const accessToken = await AuthService.refreshToken();
    const decoded = jwtDecode(accessToken) as User;
    setUser(decoded);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, register, logout, refreshToken }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
