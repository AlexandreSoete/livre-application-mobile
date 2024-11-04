// src/App.tsx

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BottomTabNavigator from './navigation/BottomTabNavigator'; // Onglets en bas
import LoginScreen from './screens/LoginScreen/LoginScreen'; // Importer la page de login
import { AbonnementsProvider } from './contexts/AbonnementsContext';
import { AuthProvider, useAuth } from './contexts/AuthContext'; // Importer AuthProvider et useAuth
import { SocketProvider } from './contexts/SocketContext';
import RegisterScreen from './screens/RegisterScreen/RegisterScreen';
import AccueilScreen from './screens/AccueilScreen/AccueilScreen';

const Stack = createNativeStackNavigator();

const AppNavigator: React.FC = () => {
  const { user } = useAuth(); // Utiliser useAuth pour vérifier si l'utilisateur est connecté

  return (
    <Stack.Navigator>
      {user ? ( // Si l'utilisateur est connecté, afficher les onglets en bas
        <Stack.Screen name="MainTabs" component={BottomTabNavigator} options={{ headerShown: false }} />
      ) : ( // Si l'utilisateur n'est pas connecté, afficher la page de login
        <>
          <Stack.Screen name="Accueil" options={{ headerShown: false }} component={AccueilScreen} />
          <Stack.Screen name="Login" options={{ headerShown: false }} component={LoginScreen} />
          <Stack.Screen name="Register" options={{ headerShown: false }} component={RegisterScreen} />
        </>
      )}
    </Stack.Navigator>
  );
};

const App: React.FC = () => {
  return (
    <AuthProvider> 
      <SocketProvider>
        <AbonnementsProvider>
          <NavigationContainer>
            <AppNavigator /> 
          </NavigationContainer>
        </AbonnementsProvider>
      </SocketProvider>
    </AuthProvider>
  );
};

export default App;
