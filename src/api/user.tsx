// src/api/authApi.ts

import { User } from '../types/userTypes';
import axios from '../utils/axios';

// Fonction pour l'appel API de connexion
export const loginApi = async (email: string, password: string) => {
  const response = await axios.post('/api/login', { email, password });
  return response.data; // Cela inclut le token, l'utilisateur et le refresh_token
};

// Fonction pour l'appel API de rafraîchissement de token
export const refreshTokenApi = async (refreshToken: string) => {
  const response = await axios.post('/api/token/refresh', { refresh_token: refreshToken });
  return response.data; // Cela retourne un nouveau token
};

// S"abonner à un livre
export const register = async (email: string, pseudo:string, password: string, description: string): Promise<User> => {
  try {
    const response = await axios.post<User>(`/api/register`, {
      email: email,
      password: password,
      //pseudo: pseudo,
      description: description
    });
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du livre', error);
    throw error;
  }
};

// Fonction pour l'appel API de rafraîchissement de token
export const user = async (refreshToken: string) => {
  const response = await axios.post('/api/refresh/token', { refresh_token: refreshToken });
  return response.data; // Cela retourne un nouveau token
};

// S"abonner à un livre
export const getUser = async (id: string): Promise<User> => {
  try {
    const response = await axios.get<User>(`/api/users/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du livre', error);
    throw error;
  }
};

// S"abonner à un livre
export const sendInvitFriend = async (id: string): Promise<User> => {
  try {
    const response = await axios.post<User>(`/api/friends/${id}/add`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du livre', error);
    throw error;
  }
};

// S"abonner à un livre
export const acceptInvitFriend = async (id: string): Promise<User> => {
  try {
    const response = await axios.post<User>(`/api/friends/${id}/accept`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du livre', error);
    throw error;
  }
};

// S"abonner à un livre
export const refuseInvitFriend = async (id: string): Promise<User> => {
  try {
    const response = await axios.post<User>(`/api/friends/${id}/refuse`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du livre', error);
    throw error;
  }
};

// S"abonner à un livre
export const getSuggestedFriends = async (): Promise<User[]> => {
  try {
    const response = await axios.get<User[]>(`/api/friends/friend-suggestions`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du livre', error);
    throw error;
  }
};
