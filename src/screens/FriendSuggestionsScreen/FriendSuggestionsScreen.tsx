// src/screens/FriendSuggestionsScreen/FriendSuggestionsScreen.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Image, TouchableOpacity } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { User } from '../../types/userTypes';
import { RootStackParamList } from '../../types/navigation';
import styles from './FriendSuggestionsScreen.styles';
import { getSuggestedFriends } from "../../api/user";


// Typage pour la navigation
type FriendSuggestionsScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FriendSuggestions'>;

interface FriendSuggestionsScreenProps {
  navigation: FriendSuggestionsScreenNavigationProp;
}

const FriendSuggestionsScreen: React.FC<FriendSuggestionsScreenProps> = ({ navigation }) => {
  const [suggestedUsers, setSuggestedUsers] = useState<User[]>([]);

  useEffect(() => {
    // Simuler un appel API pour récupérer les suggestions d'amis
    const fetchSuggestions = async () => {
      const response = await getSuggestedFriends();
      setSuggestedUsers(response);
    };

    fetchSuggestions();
  }, []);

  const handleProfileClick = (userId: string, username: string, avatar: string) => {
    navigation.navigate('Profil', { userId });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suggestions d'amis</Text>
      <FlatList
        data={suggestedUsers}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userCard} onPress={() => handleProfileClick(item.id, item.username, item.avatar)}>
            <Image source={{ uri: item.avatar }} style={styles.userPhoto} />
            <View style={styles.userInfo}>
              <Text style={styles.username}>{item.pseudo}</Text>
              <Text style={styles.commonBooksText}>
                Vous avez {item.commonPercentage?.toString().split(".")[0]} % de livres en commun
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default FriendSuggestionsScreen;
