import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthState } from '../types/types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, role?: string) => Promise<boolean>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users for demonstration
const mockUsers: User[] = [
  {
    id: '1',
    email: 'admin@quickdesk.com',
    name: 'Admin User',
    role: 'admin',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    email: 'agent@quickdesk.com',
    name: 'Support Agent',
    role: 'agent',
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    email: 'user@quickdesk.com',
    name: 'End User',
    role: 'user',
    createdAt: new Date('2024-01-01'),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
  });

  useEffect(() => {
    const savedUser = localStorage.getItem('quickdesk_user');
    if (savedUser) {
      setAuthState({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
      });
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Mock authentication
    const user = mockUsers.find(u => u.email === email);
    if (user && password === 'password') {
      setAuthState({
        user,
        isAuthenticated: true,
      });
      localStorage.setItem('quickdesk_user', JSON.stringify(user));
      return true;
    }
    return false;
  };

  const register = async (name: string, email: string, password: string, role: string = 'user'): Promise<boolean> => {
    // Mock registration
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      email,
      name,
      role: role as User['role'],
      createdAt: new Date(),
    };
    
    mockUsers.push(newUser);
    setAuthState({
      user: newUser,
      isAuthenticated: true,
    });
    localStorage.setItem('quickdesk_user', JSON.stringify(newUser));
    return true;
  };

  const logout = () => {
    setAuthState({
      user: null,
      isAuthenticated: false,
    });
    localStorage.removeItem('quickdesk_user');
  };

  return (
    <AuthContext.Provider value={{
      ...authState,
      login,
      register,
      logout,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};