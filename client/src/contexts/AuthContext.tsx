'use client';

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from 'react';
import { useRouter } from 'next/navigation';
import { loginUser, logoutUser, getCurrentUser, registerUser } from '@/lib/api';
import { User, LoginResponse } from '@/types';

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  register: (
    name: string,
    email: string,
    password: string
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const isAuthenticated = !!user;

  // Check if user is authenticated on app load
  const checkAuth = async () => {
    try {
      setIsLoading(true);
      const userData = await getCurrentUser();
      setUser(userData);
    } catch (error) {
      console.warn(
        'Auth check failed - backend server may not be running:',
        error
      );
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  // Login function
  const login = async (
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      const response = await loginUser({ email, password });

      if (response && response.user) {
        setUser(response.user);

        // Redirect based on user role
        if (response.user.role === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/'); // Regular users go to home page
        }

        return { success: true };
      } else {
        return { success: false, error: 'Invalid credentials' };
      }
    } catch (error) {
      console.error('Login error:', error);
      return {
        success: false,
        error: 'Login failed. Please make sure the backend server is running.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (
    name: string,
    email: string,
    password: string
  ): Promise<{ success: boolean; error?: string }> => {
    try {
      setIsLoading(true);
      const response = await registerUser({ name, email, password });

      if (response && response.user) {
        setUser(response.user);

        // Redirect based on user role (new users are typically regular users)
        if (response.user.role === 'ADMIN') {
          router.push('/admin');
        } else {
          router.push('/'); // Regular users go to home page
        }

        return { success: true };
      } else {
        return { success: false, error: 'Registration failed' };
      }
    } catch (error) {
      console.error('Registration error:', error);
      return {
        success: false,
        error:
          'Registration failed. Please make sure the backend server is running.',
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    try {
      setIsLoading(true);
      await logoutUser();
      setUser(null);
      router.push('/');
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout API fails, clear local state
      setUser(null);
      router.push('/');
    } finally {
      setIsLoading(false);
    }
  };

  // Check authentication on mount
  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated,
    login,
    register,
    logout,
    checkAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
