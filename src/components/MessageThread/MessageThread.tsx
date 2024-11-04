// src/components/MessageThread/MessageThread.tsx

import React, { useRef, useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import styles from './MessageThread.styles';
import { Message } from '../../types/messageTypes';
import { useHeaderHeight } from '@react-navigation/elements';

interface MessageThreadProps {
  messages: Message[];
  onSendMessage: (message: string) => void;
  title: string;
  onProfileClick?: (userId: string) => void;  // Nouvelle prop pour gérer les clics de profil
}

const MessageThread: React.FC<MessageThreadProps> = ({ messages, onSendMessage, title, onProfileClick }) => {
  const [newMessage, setNewMessage] = useState<string>('');
  const scrollViewRef = useRef<ScrollView | null>(null);
  const [keyboardHeight, setKeyboardHeight] = useState(0);
  const headerHeight = useHeaderHeight();

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      onSendMessage(newMessage); // Appeler la fonction pour envoyer le message
      setNewMessage(''); // Réinitialiser le champ après envoi
    }
  };

  useEffect(() => {
    // Listener pour le clavier
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', (event) => {
      setKeyboardHeight(event.endCoordinates.height);
      scrollToEnd(); // Scroller jusqu'à la fin quand le clavier apparaît
    });
    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardHeight(0);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const scrollToEnd = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={headerHeight}
    >
      <Text style={styles.title}>{title}</Text>

      {/* Fil de discussion */}
      <ScrollView 
        ref={scrollViewRef}
        style={styles.chatContainer} 
        onContentSizeChange={scrollToEnd}
      >
        {messages.length > 0 ? (
          messages.map((message, index) => (
            <View key={index} style={styles.messageRow}>
              <TouchableOpacity onPress={() => onProfileClick && onProfileClick(message.user.id)}>
                <Image source={{ uri: message.user.avatar }} style={styles.avatar} />
              </TouchableOpacity>
              <View style={styles.messageContent}>
                <View style={styles.messageHeader}>
                  <Text style={styles.username}>{message.user.pseudo}</Text>
                  <Text style={styles.date}>{message.date}</Text>
                </View>
                <Text style={styles.messageText}>{message.text}</Text>
              </View>
            </View>
          ))
        ) : (
          <Text style={styles.emptyChat}>Aucun message pour l'instant</Text>
        )}
      </ScrollView>

      {/* Champ de message et bouton envoyer */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Écrire un message..."
          value={newMessage}
          onChangeText={setNewMessage}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Envoyer</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default MessageThread;
