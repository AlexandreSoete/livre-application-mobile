// src/navigation/MonProfilStack.tsx

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MonProfilScreen from '../screens/MonProfilScreen/MonProfilScreen';
import EditProfilScreen from '../screens/EditProfilScreen/EditProfilScreen';
import { RootStackParamList } from '../types/navigation'; // Assure que RootStackParamList contient ces routes
import LoginScreen from '../screens/LoginScreen/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen/RegisterScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

const LoginStack: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Login" 
        component={LoginScreen} 
        options={{ headerShown: true, title: 'Mon Profil' }} 
      />
      <Stack.Screen 
        name="Register" 
        component={RegisterScreen} 
        options={{ headerShown: true, title: 'Créais un Profil' }} 
      />
    </Stack.Navigator>
  );
};

export default LoginStack;
