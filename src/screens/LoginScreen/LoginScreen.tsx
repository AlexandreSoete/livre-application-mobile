// src/screens/LoginScreen/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import styles from './LoginScreen.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/types/navigation';


type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Login'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const { login, loadingRefresh } = useAuth();
  const [email, setEmail] = useState('contact@alexandre-soete.fr');
  const [password, setPassword] = useState('Alexandre59');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    try {
      await login(email, password, rememberMe);
    } catch (error) {
      console.error('Login failed', error);
    }
  };

  if(loadingRefresh){
    return(
      <View>
        <Text>Chargement...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenue sur BookTalk</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {/* Case à cocher pour "Se souvenir de moi" */}
      <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
        <Text style={styles.rememberMe}>
          {rememberMe ? '☑ Se souvenir de moi' : '☐ Se souvenir de moi'}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Connexion</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.push("Register")}>
        <Text style={styles.buttonText}>S'inscire</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LoginScreen;
