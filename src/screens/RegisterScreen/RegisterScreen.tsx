// src/screens/LoginScreen/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import styles from './RegisterScreen.styles';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../types/navigation';
import { register } from '../../api/user';

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Register'>;

interface LoginScreenProps {
  navigation: LoginScreenNavigationProp;
}

const LoginScreen: React.FC<LoginScreenProps> = ({navigation}) => {
  const [email, setEmail] = useState<string>('contact@alexandre-soete.fr');
  const [password, setPassword] = useState<string>('Alexandre59');
  const [pseudo, setPseudo] = useState<string>('Yury');
  const [description, setDescription] = useState<string>('Yury');
  const [rememberMe, setRememberMe] = useState(false);
  const [loading, setLoading] = useState<boolean>(false)
  const [successRegister, setSuccessRegister] = useState<boolean>(false)

  const handleRegister = async () => {
    try {
      setLoading(true)
      setSuccessRegister(false)
      await register(email, password, pseudo, description);
      setLoading(false)
      setEmail("");
      setPassword("");
      setPseudo("");
      setDescription("");
      setSuccessRegister(true)
    } catch (error) {
      console.error('Register failed', error);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={{alignSelf: "flex-start"}} onPress={() => navigation.navigate("Login")}>
          <Text>Retour</Text>
        </TouchableOpacity>
      <Text style={styles.title}>Inscription</Text>

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
        placeholder="Pseudo"
        value={pseudo}
        onChangeText={setPseudo}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mot de passe"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        multiline={true}
        numberOfLines={4}
        style={styles.textarea}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        secureTextEntry
      />

      {
        loading && 
          <View>
            <ActivityIndicator size="large" color="#007BFF" />
          </View>
      }

      {
        !loading &&
        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>S'inscrire</Text>
        </TouchableOpacity>
      }

      {
        successRegister &&
        <Text>Vous êtes maintenant inscrit. Vous pouvez vous connecter</Text>
      }
      
    </View>
  );
};

export default LoginScreen;
