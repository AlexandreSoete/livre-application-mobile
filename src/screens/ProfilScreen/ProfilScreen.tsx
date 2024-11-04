// src/screens/ProfilScreen/ProfilScreen.tsx

import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { getUser, sendInvitFriend, acceptInvitFriend, refuseInvitFriend } from '../../api/user';
import { User } from '../../types/userTypes';
import BookCard from '../../components/BookCard/BookCard';
import Icon from 'react-native-vector-icons/Ionicons'; // Importer les icônes
import styles from './ProfilScreen.styles';

type ProfilScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Profil'>;
type ProfilScreenRouteProp = RouteProp<RootStackParamList, 'Profil'>;

interface ProfilScreenProps {
  navigation: ProfilScreenNavigationProp;
  route: ProfilScreenRouteProp;
}

const ProfilScreen: React.FC<ProfilScreenProps> = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserBooks = async () => {
      const user = await getUser(userId);
      setUser(user);
      setLoading(false);
    };

    fetchUserBooks();
  }, [userId]);

  const handleAddFriend =  async () => {
    await sendInvitFriend(userId);
    if(user){
      setUser({...user, relationStatus: -1})
    }
  };

  const handleAcceptFriend = async () => {
    await acceptInvitFriend(userId)
    if(user){
      setUser({...user, relationStatus: 2})
    }
  };

  const handleRejectFriend = async () => {
    await refuseInvitFriend(userId)
    if(user){
      setUser({...user, relationStatus: 0})
    }
  };

  const handleStartChat = () => {
    if(user){
      navigation.push('PrivateChat',  {userId : user.id});
    }
    
  };

  if (loading || !user) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007BFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image source={{ uri: user.avatar }} style={styles.avatar} />
        <Text style={styles.username}>{user.pseudo}</Text>
        <Text style={styles.info}>ID utilisateur : {user.id}</Text>

        {typeof user.relationStatus != "undefined" && user.relationStatus === -1 &&
          <Text style={styles.pendingText}>Votre demande d'ami est en attente</Text>
        }

        {typeof user.relationStatus != "undefined" && user.relationStatus === 1  &&
          <View style={styles.friendRequestActions}>
            <TouchableOpacity style={styles.acceptButton} onPress={handleAcceptFriend}>
              <Icon name="checkmark" size={20} color="#fff" />
              <Text style={styles.buttonText}>Accepter</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.rejectButton} onPress={handleRejectFriend}>
              <Icon name="close" size={20} color="#fff" />
              <Text style={styles.buttonText}>Refuser</Text>
            </TouchableOpacity>
          </View>
        }

        {typeof user.relationStatus != "undefined" && user.relationStatus === 2 && 
          <TouchableOpacity style={styles.chatButton} onPress={handleStartChat}>
            <Icon name="chatbubble-ellipses" size={20} color="#fff" />
            <Text style={styles.buttonText}>Ouvrir une discussion</Text>
          </TouchableOpacity>
        }

        {
          (typeof user.relationStatus == "undefined" || user.relationStatus === 0 ) &&
          <TouchableOpacity style={styles.addButton} onPress={handleAddFriend}>
            <Icon name="person-add" size={20} color="#fff" />
            <Text style={styles.buttonText}>Ajouter à mes amis</Text>
          </TouchableOpacity>
        }
          
      </View>

      <Text style={styles.sectionTitle}>Ses abonnements</Text>
      {loading ? (
        <Text>Chargement des abonnements...</Text>
      ) : (typeof user.subscribedBooks != "undefined" && user.subscribedBooks.length > 0) ? (
        <View style={styles.bookList}>
          {user.subscribedBooks.map((book) => (
            <View key={book.id} style={styles.bookCardWrapper}>
              <BookCard
                title={book.title}
                image={book.photo}
                note={book.note}
                onPress={() => navigation.push('BookDetails', { id: book.id })}
                showPlusButton={false}
              />
            </View>
          ))}
        </View>
      ) : (
        <Text>L'utilisateur n'a rejoint aucun livre.</Text>
      )}
    </ScrollView>
  );
};

export default ProfilScreen;
