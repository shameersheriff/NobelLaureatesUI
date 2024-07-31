import React, { createContext, useState, useEffect, ReactNode } from 'react';
import AuthService from '../services/auth.service';
import { jwtDecode } from 'jwt-decode';

interface AuthContextProps {
  user: any;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true); // Add loading state

  useEffect(() => {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        setUser(decoded);
      } catch (error) {
        console.error('Invalid token', error);
      }
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string) => {
    const response = await AuthService.login(username, password);
    const decoded = jwtDecode(response.accessToken);
    setUser(decoded);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null);
  };

  const refreshToken = async () => {
    const accessToken = await AuthService.refreshToken();
    const decoded = jwtDecode(accessToken);
    setUser(decoded);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, refreshToken }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
