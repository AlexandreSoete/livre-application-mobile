// src/screens/EditProfileScreen/EditProfileScreen.tsx

import React, { useState } from 'react';
import { View, TextInput, Button, Text, FlatList, TouchableOpacity, Alert } from 'react-native';
import { BookSummary } from '../../types/bookTypes';
import { searchBooks } from '../../api/bookApi'; // Importer l'API pour rechercher des livres
import BookCard from '../../components/BookCard/BookCard';
import styles from './EditProfilScreen.styles';

const EditProfileScreen: React.FC = () => {
  const [username, setUsername] = useState<string>('JohnDoe');
  const [description, setDescription] = useState<string>('Développeur passionné de livres.');
  const [favoriteBooks, setFavoriteBooks] = useState<BookSummary[]>([
    { id: '1', title: 'Livre 1', photo: 'url1', note: '4.5' },
    { id: '2', title: 'Livre 2', photo: 'url2', note: '4.0' },
  ]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [bookResults, setBookResults] = useState<BookSummary[]>([]);

  const handleSearch = async () => {
    const results = await searchBooks(searchQuery); // Appel API pour rechercher des livres
    setBookResults(results);
  };

  const handleAddBook = (book: BookSummary) => {
    if (favoriteBooks.find((b) => b.id === book.id)) {
      Alert.alert('Erreur', 'Ce livre est déjà dans vos favoris.');
    } else {
      setFavoriteBooks([...favoriteBooks, book]);
    }
  };

  const handleRemoveBook = (bookId: string) => {
    setFavoriteBooks(favoriteBooks.filter((book) => book.id !== bookId));
  };

  const handleSave = () => {
    // Logique de sauvegarde des informations
    console.log('Informations sauvegardées:', { username, description, favoriteBooks });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Nom d'utilisateur</Text>
      <TextInput
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.input}
        value={description}
        onChangeText={setDescription}
        multiline
      />

      {/*<Text style={styles.sectionTitle}>Mes livres préférés</Text>
      <FlatList
        data={favoriteBooks}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <BookCard
              title={item.title}
              image={item.photo}
              note={item.note}
              onPress={() => {}}
              showPlusButton={false}
            />
            <Button title="Supprimer" onPress={() => handleRemoveBook(item.id)} />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />

      <Text style={styles.sectionTitle}>Ajouter des livres</Text>
      <TextInput
        style={styles.input}
        placeholder="Rechercher un livre..."
        value={searchQuery}
        onChangeText={setSearchQuery}
      />
      <Button title="Rechercher" onPress={handleSearch} />

      <FlatList
        data={bookResults}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <BookCard
              title={item.title}
              image={item.photo}
              note={item.note}
              onPress={() => handleAddBook(item)}
              showPlusButton={true}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
      />*/}

      <Button title="Sauvegarder" onPress={handleSave} />
    </View>
  );
};

export default EditProfileScreen;
