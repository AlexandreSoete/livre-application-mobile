// src/screens/LoginScreen/LoginScreen.tsx

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground} from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import styles from './AccueilScreen.styles';
import LinearGradient from "react-native-linear-gradient"
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '@/src/types/navigation';
import image from "../../assets/images/accueil.jpg";


type AccueilScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Accueil'>;

interface AccueilScreenProps {
  navigation: AccueilScreenNavigationProp;
}

const LoginScreen: React.FC<AccueilScreenProps> = ({navigation}) => {
  const { login, loadingRefresh } = useAuth();

  return (
    <ImageBackground source={image} resizeMode="cover" style={{height: "100%", flex:1, justifyContent: "flex-end"}}>
        <LinearGradient colors={['#00000000', '#000000']} style={{height : '100%', width : '100%'}}>
        <View style={{height: "100%", flex:1, justifyContent: "flex-end", paddingVertical: 50 }}>
            <TouchableOpacity style={styles.button} onPress={() => navigation.push("Login")}>
                <Text style={{color: "white"}}>Se connecter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.push("Register")}>
                <Text style={{color: "white"}}>S'inscirerrrrr</Text>
            </TouchableOpacity>
        </View>
      </LinearGradient>
    </ImageBackground>
  );
};

export default LoginScreen;
