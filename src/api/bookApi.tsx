// src/api/bookApi.js
import axios from '../utils/axios';
import { BookSummary, Book } from '../types/bookTypes';

// Récupérer la liste légère des livres
export const getBooks = async (): Promise<BookSummary[]> => {
  try {
    const response = await axios.get<BookSummary[]>(`/api/book/`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des livres', error);
    throw error;
  }
};

// Récupérer les détails complets d'un livre
export const getBookDetails = async (id: string): Promise<Book> => {
  try {
    const response = await axios.get<Book>(`/api/book/${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du livre', error);
    throw error;
  }
};

// S"abonner à un livre
export const subscribeToBook = async (id: string): Promise<string> => {
  try {
    const response = await axios.post<string>(`/api/book/${id}/join`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du livre', error);
    throw error;
  }
};

// S"abonner à un livre
export const leaveBook = async (id: string): Promise<string> => {
  try {
    const response = await axios.post<string>(`/api/book/${id}/leave`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du livre', error);
    throw error;
  }
};

// Rechercher un livre
export const searchBooks = async (id: string): Promise<BookSummary[]> => {
  try {
    const response = await axios.get<BookSummary[]>(`/api/book/?search=${id}`);
    return response.data;
  } catch (error) {
    console.error('Erreur lors de la récupération des détails du livre', error);
    throw error;
  }
};

/*export const getUserBooks = async (userId: string): Promise<BookSummary[]> => {
  // Appel à ton API pour récupérer les livres auxquels l'utilisateur s'est abonné
  const response = await fetch(`${API_URL}/livres.json`);
  const data = await response.json();
  return data; // Doit être un tableau de BookSummary
};

// Fonction pour effectuer la recherche de livres
export const searchBooks = async (query: string): Promise<BookSummary[]> => {
  const response = await fetch(`${API_URL}/livres.json`);
  const data = await response.json();
  return data; // Assume que l'API retourne un tableau de BookSummary
};

// Fonction pour effectuer la recherche de livres
export const getUserFavoriteBooks = async (query: string): Promise<BookSummary[]> => {
  const response = await fetch(`${API_URL}/livres.json`);
  const data = await response.json();
  return data; // Assume que l'API retourne un tableau de BookSummary
};*/

