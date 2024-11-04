// src/navigation/MonProfilStack.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MonProfilScreen from '../screens/MonProfilScreen/MonProfilScreen';
import EditProfilScreen from '../screens/EditProfilScreen/EditProfilScreen';
import { RootStackParamList } from '../types/navigation'; // Assure que RootStackParamList contient ces routes

const Stack = createNativeStackNavigator<RootStackParamList>();

const MonProfilStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="MonProfil" 
        component={MonProfilScreen} 
        options={{ headerShown: true, title: 'Mon Profil' }} 
      />
      <Stack.Screen 
        name="EditProfil" 
        component={EditProfilScreen} 
        options={{ headerShown: true, title: 'Éditer le Profil' }} 
      />
    </Stack.Navigator>
  );
};

export default MonProfilStack;
