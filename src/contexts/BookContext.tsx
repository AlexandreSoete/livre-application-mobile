// src/contexts/BookContext.tsx
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { getBooks } from '../api/bookApi';
import { BookSummary } from '../types/bookTypes';

// Interface pour les props du BookProvider
interface BookProviderProps {
  children: ReactNode;
}

export interface BookContextProps {
  books: BookSummary[];
  fetchBooks: () => void;
}

// Initialise le contexte avec une valeur par défaut
export const BookContext = createContext<BookContextProps>({
  books: [],
  fetchBooks: () => {},
});

export const BookProvider: React.FC<BookProviderProps> = ({ children }) => {
  const [books, setBooks] = useState<BookSummary[]>([]);

  const fetchBooks = async () => {
    try {
      const data = await getBooks();
      setBooks(data);  // Assigner la liste de livres légers
    } catch (error) {
      console.error('Erreur lors de la récupération des livres', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  return (
    <BookContext.Provider value={{ books, fetchBooks }}>
      {children}
    </BookContext.Provider>
  );
};
