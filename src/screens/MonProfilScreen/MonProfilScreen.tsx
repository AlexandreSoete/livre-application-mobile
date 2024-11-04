// src/screens/MonProfilScreen/MonProfilScreen.tsx

import React, { useEffect } from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import Icon from 'react-native-vector-icons/Ionicons'; // Importer Ionicons pour le bouton d'édition
import BookCard from '../../components/BookCard/BookCard'; // Importer BookCard pour les livres
import styles from './MonProfilScreen.styles';

type MonProfilScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MonProfil'>;

interface MonProfilScreenProps {
  navigation: MonProfilScreenNavigationProp;
}

const MonProfilScreen: React.FC<MonProfilScreenProps> = ({ navigation }) => {
  const { user, logout } = useAuth(); // Utiliser les données utilisateur du contexte

  useEffect(() => {
    // Ajouter le bouton "Éditer" dans le header
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity onPress={() => navigation.navigate('EditProfil')}>
          <Icon name="create-outline" size={25} color="#007BFF" />
        </TouchableOpacity>
      ),
      headerRight: () => {
        return <TouchableOpacity onPress={() => logout()}>
          <Icon name="log-out-outline" size={25} color="#007BFF" />
        </TouchableOpacity>;
      }
    });
  }, [navigation]);

  if (!user) {
    return <Text>Pas de données utilisateur.</Text>;
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        {/* Photo de profil */}
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{user.pseudo}</Text>
        <Text style={styles.description}>{user.description}</Text>
      </View>

      {/* Liste des 3 livres préférés */}
      <Text style={styles.sectionTitle}>Mes 3 livres préférés</Text>
      <View style={styles.bookList}>
        {user.favoriteBooks?.map((book) => (
          <View key={book.id} style={styles.bookCardWrapper}>
            <BookCard
              title={book.title}
              image={book.photo}
              note={book.note}
              onPress={() => navigation.navigate('BookDetails', { id: book.id })}
              showPlusButton={false}
            />
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default MonProfilScreen;
