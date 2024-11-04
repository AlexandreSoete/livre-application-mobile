// src/navigation/FriendStack.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendSuggestionsScreen from '../screens/FriendSuggestionsScreen/FriendSuggestionsScreen';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import BookDetailsScreen from '../screens/BookDetailsScreen/BookDetailsScreen';
import ChatScreen from '../screens/ChatScreen/ChatScreen';
import PrivateChatScreen from '../screens/PrivateChatScreen/PrivateChatScreen';
import ProfilScreen from '../screens/ProfilScreen/ProfilScreen'; // Importer la page de profil d'un utilisateur
import { RootStackParamList } from '../types/navigation';

const Stack = createNativeStackNavigator<RootStackParamList>();

const FriendStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="FriendSuggestions" 
        component={FriendSuggestionsScreen} 
        options={{ headerShown: true, title: 'Amis suggérés' }} 
      />
      <Stack.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{ headerShown: true, title: 'Accueil' }} 
      />
      <Stack.Screen 
        name="BookDetails" 
        component={BookDetailsScreen} 
        options={{ headerShown: true, title: 'Détails du livre' }} 
      />
      <Stack.Screen 
        name="Chat" 
        component={ChatScreen} 
        options={{ headerShown: true, title: 'Discussion' }} 
      />
      <Stack.Screen 
        name="PrivateChat" 
        component={PrivateChatScreen} 
        options={{ headerShown: true, title: 'Discussion privée' }} 
      />
      <Stack.Screen 
        name="Profil" 
        component={ProfilScreen} 
        options={{ headerShown: true, title: 'Profil de l\'utilisateur' }} // Page pour voir le profil d'un utilisateur
      />
    </Stack.Navigator>
  );
};

export default FriendStack;
