// src/navigation/BottomTabNavigator.tsx

import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStack from './HomeStack'; // Stack contenant toutes les pages de Home
import MonProfilStack from './MonProfilStack'; // Utiliser le nouveau stack pour Mon Profil
import AntDesign from 'react-native-vector-icons/AntDesign';
import FriendStack from './FriendStack';

const Tab = createBottomTabNavigator();

const BottomTabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'HomeStack') {
            iconName = 'home';
          } else if (route.name === 'MonProfilStack') {
            iconName = 'user';
          } else if (route.name === 'FriendSuggest') {
            iconName = 'adduser';
          }

          return <AntDesign name={iconName} size={size} color={color} />;
        },
        headerShown: false, // Pas besoin de header dans les tabs
      })}
    >
      <Tab.Screen name="HomeStack" component={HomeStack} options={{ title: 'Accueil' }} />
      <Tab.Screen
        name="FriendSuggest"
        component={FriendStack}
        options={{ title: 'Amis suggérés' }}
      />
      <Tab.Screen name="MonProfilStack" component={MonProfilStack} options={{ title: 'Mon Profil' }} />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;
