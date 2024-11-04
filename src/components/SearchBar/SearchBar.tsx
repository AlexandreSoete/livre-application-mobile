// src/components/SearchBar/SearchBar.tsx

import React, { useState, useEffect } from 'react';
import { View, TextInput, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { searchBooks } from '../../api/bookApi'; // Importer la fonction de recherche
import { BookSummary } from '../../types/bookTypes';
import styles from './SearchBar.styles';

interface SearchBarProps {
  onBookSelect: (bookId: string) => void; // Fonction pour naviguer vers le détail d'un livre
}

const SearchBar: React.FC<SearchBarProps> = ({ onBookSelect }) => {
  const [query, setQuery] = useState<string>(''); // État pour la requête de recherche
  const [books, setBooks] = useState<BookSummary[]>([]); // État pour les résultats de la recherche

  useEffect(() => {
    // Appel API lorsque la requête change
    const fetchBooks = async () => {
      if (query.trim() === '') {
        setBooks([]); // Si la recherche est vide, réinitialiser les résultats
        return;
      }
      const results = await searchBooks(query);
      setBooks(results);
    };

    fetchBooks();
  }, [query]);

  // Fonction pour gérer la saisie dans le champ de recherche
  const handleSearch = (text: string) => {
    setQuery(text);
  };

  return (
    <View style={styles.container}>
      {/* Champ de recherche */}
      <TextInput
        style={styles.searchInput}
        placeholder="Rechercher un livre..."
        value={query}
        onChangeText={handleSearch}
      />

      {/* Affichage des résultats de la recherche */}
      {books.length > 0 && (
        <View style={styles.resultsContainer}>
          <FlatList
            data={books}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity style={styles.bookCard} onPress={() => onBookSelect(item.id)}>
                <Image source={{ uri: item.photo }} style={styles.bookImage} />
                <Text style={styles.bookTitle}>{item.title}</Text>
              </TouchableOpacity>
            )}
            ListHeaderComponent={<Text style={styles.header}>Header</Text>}
            ListFooterComponent={<Text style={styles.footer}>Footer</Text>}
          />
        </View>
      )}
    </View>
  );
};

export default SearchBar;
