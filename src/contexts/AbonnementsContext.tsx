// src/contexts/AbonnementsContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { BookSummary } from '../types/bookTypes';
import {subscribeToBook as subscribeToBookAPI, leaveBook as leaveBookAPI} from '../api/bookApi';
import { Alert } from 'react-native';

interface AbonnementsContextProps {
  subscribedBooks: BookSummary[];
  subscribeToBook: (book: BookSummary) => void;
  leaveBook: (book : BookSummary) => void;
}

// Typage des props du Provider, qui doivent inclure "children"
interface AbonnementsProviderProps {
  children: ReactNode;
}

const MAX_SUBSCRIBED_BOOKS = 3; // Limite du nombre de livres auxquels on peut s'abonner

const AbonnementsContext = createContext<AbonnementsContextProps | undefined>(undefined);

export const useAbonnements = () => {
  const context = useContext(AbonnementsContext);
  if (!context) {
    throw new Error('useAbonnements must be used within an AbonnementsProvider');
  }
  return context;
};

export const AbonnementsProvider: React.FC<AbonnementsProviderProps> = ({ children }) => {

  const {user} = useAuth();
  const [subscribedBooks, setSubscribedBooks] = useState<BookSummary[]>([]); // IDs initiaux

  const subscribeToBook = async (book: BookSummary) => {
    if (subscribedBooks.some(subscribedBook => subscribedBook.id === book.id)) {
      Alert.alert("Déjà abonné", "Vous êtes déjà abonné à ce livre.");
    } else if (subscribedBooks.length >= MAX_SUBSCRIBED_BOOKS) {
      Alert.alert("Limite atteinte", "Vous devez payer pour vous abonner à plus de livres.");
    } else {
      await subscribeToBookAPI(book.id);
      if (!subscribedBooks.some(subscribedBook => subscribedBook.id === book.id)) {
        setSubscribedBooks([...subscribedBooks, book]);
      }
      Alert.alert("Succès", `Vous êtes maintenant abonné à ${book.title}`);
    }
  };

  const leaveBook = async (book: BookSummary) => {
    await leaveBookAPI(book.id);
    
    const updatedSubscribedBooks = subscribedBooks.filter(subscribedBook => subscribedBook.id !== book.id);
    setSubscribedBooks(updatedSubscribedBooks);
  }


  useEffect(() => {
    if(user){
      setSubscribedBooks(user.subscribedBooks)
    }else{
      setSubscribedBooks([])
    }
    
  }, [user])

  return (
    <AbonnementsContext.Provider value={{ subscribedBooks, subscribeToBook, leaveBook }}>
      {children}
    </AbonnementsContext.Provider>
  );
};
