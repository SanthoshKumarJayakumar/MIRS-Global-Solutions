import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { supabase } from '../lib/supabase';
import bcrypt from 'bcryptjs';
import { SESSION_DURATION, WARNING_TIME, isSessionValid, getSessionTimeLeft } from '../utils/sessionUtils';

interface User {
  id: string;
  username: string;
  email: string;
  loginTime: number;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  loading: boolean;
  sessionTimeLeft: number;
  isSessionExpiring: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};


export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionTimeLeft, setSessionTimeLeft] = useState(0);
  const [isSessionExpiring, setIsSessionExpiring] = useState(false);
  const sessionTimerRef = useRef<NodeJS.Timeout | null>(null);
  const warningTimerRef = useRef<NodeJS.Timeout | null>(null);

  const clearTimers = () => {
    if (sessionTimerRef.current) {
      clearTimeout(sessionTimerRef.current);
      sessionTimerRef.current = null;
    }
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
  };

  const startSessionTimer = (loginTime: number) => {
    clearTimers();
    
    const updateTimer = () => {
      const timeLeft = getSessionTimeLeft(loginTime);
      
      if (timeLeft <= 0) {
        setSessionTimeLeft(0);
        setIsSessionExpiring(false);
        logout();
        return;
      }
      
      setSessionTimeLeft(timeLeft);
      
      // Show warning when 1 minute left
      if (timeLeft <= WARNING_TIME && !isSessionExpiring) {
        setIsSessionExpiring(true);
      }
      
      // Schedule next update
      sessionTimerRef.current = setTimeout(updateTimer, 1000);
    };
    
    updateTimer();
  };

  useEffect(() => {
    // Check if user is logged in from localStorage
    const savedUser = localStorage.getItem('mirs_admin_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      
      // Check if session is still valid
      if (isSessionValid(userData.loginTime)) {
        setUser(userData);
        startSessionTimer(userData.loginTime);
      } else {
        // Session expired, clear storage
        localStorage.removeItem('mirs_admin_user');
      }
    }
    setLoading(false);
    
    // Cleanup timers on unmount
    return () => {
      clearTimers();
    };
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    try {
      // Query admin_users table from Supabase
      const { data, error } = await supabase
        .from('admin_users')
        .select('id, username, email, password_hash')
        .eq('username', username)
        .single();

      if (error || !data) {
        console.error('Database error:', error);
        return false;
      }

      // Verify password using bcrypt
      const isValidPassword = await bcrypt.compare(password, data.password_hash);
      
      if (!isValidPassword) {
        return false;
      }

      const loginTime = Date.now();
      const userData = {
        id: data.id,
        username: data.username,
        email: data.email,
        loginTime: loginTime,
      };

      setUser(userData);
      localStorage.setItem('mirs_admin_user', JSON.stringify(userData));
      startSessionTimer(loginTime);
      return true;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    clearTimers();
    setUser(null);
    setSessionTimeLeft(0);
    setIsSessionExpiring(false);
    localStorage.removeItem('mirs_admin_user');
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      login, 
      logout, 
      loading, 
      sessionTimeLeft, 
      isSessionExpiring 
    }}>
      {children}
    </AuthContext.Provider>
  );
};