// src/screens/ChatScreen/ChatScreen.tsx

import React, { useEffect, useState } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../types/navigation';
import MessageThread from '../../components/MessageThread/MessageThread';
import { Message } from '../../types/messageTypes';
import { getMessagesSalon, sendMessageSalon } from '../../api/salonApi';
import { getUser } from '../../api/user';
import { useAuth } from '../../contexts/AuthContext';
import { User } from '../../types/userTypes';
import { useSocket } from '../../contexts/SocketContext';

type ChatScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Chat'>;
type ChatScreenRouteProp = RouteProp<RootStackParamList, 'Chat'>;

interface ChatScreenProps {
  navigation: ChatScreenNavigationProp;
  route: ChatScreenRouteProp;
}

const ChatScreen: React.FC<ChatScreenProps> = ({ route, navigation }) => {
  const { salonId } = route.params;
  const [userMessage, setUserMessage] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[] | []>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { user } = useAuth();
  const { socket } = useSocket();

  useEffect(() => {
    // Écouter les messages privés via le socket
    if (socket) {
      socket.emit("join_salon", salonId)
      socket.on(`salon_${salonId}_message_received`, (message: Message) => {
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
      /*const newMsg: Message = {
        text: message,
        user: user,
        date: new Date().toLocaleString(),
      };
      setMessages([...messages, newMsg]);*/
      // Émettre l'événement de message privé via le socket
      socket?.emit('salon_message', { salonId: salonId, message: message });

    }
  };


  useEffect(() => {
    const fetchMessages = async () => {
      const response = await getMessagesSalon(salonId)
      setMessages(response)
      setLoading(false);
    };

    fetchMessages();
        
  }, [])

  const handleProfileClick = (userId: string) => {
    navigation.push('Profil', { userId });
  };

  if(!loading){
    return (
      <MessageThread
        messages={messages}
        onSendMessage={handleSendMessage}
        title={`Discussion du salon`}
        onProfileClick={handleProfileClick}
      />
    );
  }
};

export default ChatScreen;
