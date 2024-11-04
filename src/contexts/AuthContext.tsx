// src/contexts/AuthContext.tsx

import React, { createContext, useState, useEffect, useContext, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode'; // Assurez-vous d'utiliser l'import correct
import { BookSummary } from '../types/bookTypes';
import { loginApi, refreshTokenApi } from '../api/user'; // Import des appels API
import axiosInstance, { setAuthToken } from '../utils/axios';
import {User} from "../types/userTypes";

interface AuthContextProps {
  user: User | null;
  token: string | null;
  login: (email: string, password: string, rememberMe: boolean) => Promise<void>;
  logout: () => void;
  refreshToken: () => Promise<void>;
  loadingRefresh: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loadingRefresh, setLoadingRefresh] = useState<boolean>(true);
  const [subscribedBooks, setSubscribedBooks] = useState<BookSummary[] | []>([]); // IDs initiaux

  const login = async (email: string, password: string, rememberMe: boolean) => {
    try {
      const response = await loginApi(email, password); // Utiliser l'appel API
      saveUser(response);

      if (rememberMe) {
        await AsyncStorage.setItem('remember_me', 'true');
      } else {
        await AsyncStorage.removeItem('remember_me');
      }
    } catch (error) {
      console.error('Login failed', error);
      throw error;
    }
  };

  const logout = async () => {
    setLoadingRefresh(false);
    setToken(null);
    setUser(null);
    setSubscribedBooks([])

    await AsyncStorage.removeItem('token');
    await AsyncStorage.removeItem('refresh_token');
    await AsyncStorage.removeItem('remember_me');
  };

  const refreshToken = async () => {
    try {
      const storedRefreshToken = await AsyncStorage.getItem('refresh_token');
      if (storedRefreshToken) {
        const response = await refreshTokenApi(storedRefreshToken); // Utiliser l'appel API pour rafraîchir le token
        saveUser(response);
      }
    } catch (error) {
      console.error('Token refresh failed', error);
      logout();
    }
  };

  const saveUser = async ({ token, user, refresh_token }: {token: string; user: User; refresh_token: string;}) => {
    setToken(token);
    setAuthToken(token);
    setUser(user);
    if(user.subscribedBooks){
      setSubscribedBooks(user.subscribedBooks)
    }
    
    // Sauvegarder les tokens dans AsyncStorage
    await AsyncStorage.setItem('token', token);
    await AsyncStorage.setItem('refresh_token', refresh_token);
  };

  const checkTokenExpiration = async () => {
    const storedToken = await AsyncStorage.getItem('token');

    if (storedToken) {
      await refreshToken();
    }else{
      logout();
    }
  };
  

  useEffect(() => {
    const initializeAuth = async () => {
      const rememberMe = await AsyncStorage.getItem('remember_me');
      
      if (rememberMe === 'true') {
        setLoadingRefresh(true);
        await checkTokenExpiration();
      } else {
        setLoadingRefresh(false);
        logout();
      }
    };

    initializeAuth();
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, login, logout, refreshToken, loadingRefresh }}>
      {children}
    </AuthContext.Provider>
  );
};