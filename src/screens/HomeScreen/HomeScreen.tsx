// src/screens/HomeScreen/HomeScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { BookSummary } from '../../types/bookTypes';
import { getBooks } from '../../api/bookApi';
import BookCard from '../../components/BookCard/BookCard';
import styles from './HomeScreen.styles';
import { useAbonnements } from '../../contexts/AbonnementsContext';
import SearchBar from '../../components/SearchBar/SearchBar';
import { RootStackParamList } from '../../types/navigation';
import { useAuth } from '../../contexts/AuthContext';

type HomeScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Home'>;

interface HomeScreenProps {
  navigation: HomeScreenNavigationProp;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [books, setBooks] = useState<BookSummary[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [filteredBooks, setFilteredBooks] = useState<BookSummary[]>([]);
  
  // Utiliser le contexte pour accéder aux abonnements
  const { subscribedBooks, subscribeToBook } = useAbonnements();
  const { user } = useAuth();

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await getBooks();
      setBooks(data);
      setFilteredBooks(data);
    };

    fetchBooks();
  }, []);

  // Fonction pour naviguer vers les détails d'un livre
  const handleBookSelect = (bookId: string) => {
    navigation.navigate('BookDetails', { id: bookId });
  };

  

  const renderBookCard = (book: BookSummary) => {
    const isSubscribed = subscribedBooks.some(subscribedBook => subscribedBook.id === book.id);

    return (
      <BookCard
        key={book.id}
        title={book.title}
        image={book.photo}
        note={book.note}
        onPress={() => navigation.push('BookDetails', { id: book.id })}
        showPlusButton={!isSubscribed} // Affiche le bouton "plus" si non abonné
        onPlusPress={() => subscribeToBook(book)} // Gérer l'abonnement avec la limite
      />
    );
  };

  return (
    <ScrollView style={styles.container}>
      <Text>Bonjour {user?.pseudo}</Text>
      <SearchBar onBookSelect={handleBookSelect} />

      {/* Livres abonnés */}
      {subscribedBooks.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Mes abonnements</Text>
          <View style={styles.bookList}>
            {subscribedBooks.map(renderBookCard)}
          </View>
        </>
      )}

      {/* Nouveautés */}
      {filteredBooks.length > 0 && (
        <>
          <Text style={styles.sectionTitle}>Nouveautés</Text>
          <View style={styles.bookList}>
            {filteredBooks
              .filter((book) => !subscribedBooks.some(subscribedBook => subscribedBook.id === book.id))
              .map(renderBookCard)}
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default HomeScreen;
