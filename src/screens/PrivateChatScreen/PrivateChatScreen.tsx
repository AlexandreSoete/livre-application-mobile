// src/screens/PrivateChatScreen/PrivateChatScreen.tsx

import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import { Message } from '../../types/messageTypes';
import MessageThread from '../../components/MessageThread/MessageThread';
import { getMessagesPrive, sendMessagePrive } from '../../api/messageriePrive';
import { User } from '@/src/types/userTypes';
import { getUser } from '../../api/user';
import { useAuth } from '../../contexts/AuthContext';
import { useSocket } from '../../contexts/SocketContext';

type PrivateChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'PrivateChat'>;
type PrivateChatScreenRouteProp = RouteProp<RootStackParamList, 'PrivateChat'>;

interface PrivateChatScreenProps {
  navigation: PrivateChatScreenNavigationProp;
  route: PrivateChatScreenRouteProp;
}

const PrivateChatScreen: React.FC<PrivateChatScreenProps> = ({ route, navigation }) => {
  const { userId } = route.params;
  const [userMessage, setUserMessage] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const { socket } = useSocket();

  useEffect(() => {
    // Écouter les messages privés via le socket
    if (socket) {
      socket.on('private_message_received', (message: Message) => {
        console.log(message)
        setMessages((prevMessages) => [...prevMessages, message]); // Ajouter le message au state
      });

      return () => {
        socket.off('private_message'); // Nettoyer l'écouteur quand le composant est démonté
      };
    }
  }, [socket]);

  const handleSendMessage = (message: string) => {
    if(user){
      const newMsg: Message = {
        text: message,
        user: user,
        date: new Date().toLocaleString(),
      };
      setMessages([...messages, newMsg]);
      // Émettre l'événement de message privé via le socket
      socket?.emit('private_message', { userId: userId, message: message });

      sendMessagePrive(message, userId);
    }
  };


  useEffect(() => {
    const fetchMessages = async () => {
      const response = await getMessagesPrive(userId)
      setMessages(response)
      const userData = await getUser(userId);
      setUserMessage(userData);
      setLoading(false);
    };

    fetchMessages();
        
  }, [])

  const handleProfileClick = (userId: string) => {
    navigation.push('Profil', { userId });
  };

  if(userMessage){
    return (
      <MessageThread
        messages={messages}
        onSendMessage={handleSendMessage}
        title={`Discussion avec ${userMessage.username}`}
        onProfileClick={handleProfileClick}
      />
    );
  }
  
};

export default PrivateChatScreen;
