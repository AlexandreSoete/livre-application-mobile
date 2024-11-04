// src/screens/BookDetailsScreen/BookDetailsScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Book } from '../../types/bookTypes';
import { getBookDetails } from '../../api/bookApi';
import { User } from '../../types/userTypes'; // Utiliser le type unifié
import styles from './BookDetailsScreen.styles';
import { useAbonnements } from '../../contexts/AbonnementsContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '@/src/types/navigation';

type BookDetailsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'BookDetails'>;
type BookDetailsScreenRouteProp = RouteProp<RootStackParamList, 'BookDetails'>;

interface BookDetailsScreenProps {
  navigation: BookDetailsScreenNavigationProp;
  route: BookDetailsScreenRouteProp;
}

const BookDetailsScreen: React.FC<BookDetailsScreenProps> = ({ route, navigation }) => {
  const { id } = route.params;
  const [book, setBook] = useState<Book | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const { subscribedBooks, subscribeToBook, leaveBook } = useAbonnements();

  const hasJoined = subscribedBooks.some(subscribedBook => subscribedBook.id === id);

  useEffect(() => {
    const fetchBookDetails = async () => {
      const data = await getBookDetails(id); // L'API renvoie directement le livre et les utilisateurs
      setBook(data); // On suppose que data contient un champ book pour les détails
      setLoading(false);
    };

    fetchBookDetails();
  }, [id]);

  // Fonction pour rejoindre un salon et naviguer vers la page de chat
  const joinSalon = (salonId: string) => {
    // Navigation vers la page de Chat avec le nom du livre et du salon
    navigation.push('Chat', { salonId });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  if (!book) {
    return (
      <View style={styles.errorContainer}>
        <Text>Erreur : aucun détail de livre trouvé.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 40 }} style={styles.container}>
      <Image source={{ uri: book.photo }} style={styles.bookImage} />
      <View style={styles.bookInfoContainer}>
        <Text style={styles.bookTitle}>{book.title}</Text>
        <Text style={styles.bookAuthor}>Auteur : {book.author.name}</Text>
        <Text style={styles.bookDescription}>{book.description}</Text>
      </View>

      {
        !hasJoined &&
          <TouchableOpacity 
            style={styles.salonButton} 
            onPress={() => subscribeToBook(book)} // Logique pour rejoindre le salon
          >
            <Text style={styles.salonButtonText}>S'abonner à ce livre</Text>
          </TouchableOpacity>
      }
      {/* Section des salons */}
      <View style={styles.salonsContainer}>
        <Text style={styles.salonsTitle}>Salons de discussion</Text>
        {
        hasJoined ? (book.salons.map((salon) => (
          <TouchableOpacity 
            key={salon.id} 
            style={styles.salonButton} 
            onPress={() => joinSalon(salon.id)} // Logique pour rejoindre le salon
          >
            <Text style={styles.salonButtonText}>{salon.name}</Text>
          </TouchableOpacity>
        ))) : (
          <Text>Vous devez vous abonner pour voir les salons.</Text>
        )
      }
      </View>

      {/* Section des utilisateurs ayant rejoint le livre */}
      <View style={styles.usersContainer}>
        <Text style={styles.sectionTitle}>Personnes ayant rejoint ce livre</Text>
        {hasJoined ? (
          book.users.length > 0 ? (
            book.users.map((user) => (
              <TouchableOpacity key={user.id} style={styles.userCard} onPress={() => navigation.push('Profil', { userId: user.id }) }>
                <Image source={{ uri: user.avatar }} style={styles.userAvatar} />
                <Text style={styles.username}>{user.pseudo}</Text>
              </TouchableOpacity>
            ))
          ) : (
            <Text>Aucune personne n'a rejoint ce livre.</Text>
          )
        ) : (
          <Text>Il y a {book.users.length} personnes sur ce livre</Text>
        )}
      </View>

      {
        hasJoined &&
          <TouchableOpacity 
            style={styles.salonButton} 
            onPress={() => leaveBook(book)} // Logique pour rejoindre le salon
          >
            <Text style={styles.salonButtonText}>Quitter ce livre</Text>
          </TouchableOpacity>
      }
    </ScrollView>
  );
};

export default BookDetailsScreen;
