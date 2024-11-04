// src/components/BookCard/BookCard.tsx

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import styles from './BookCard.styles';

interface BookCardProps {
  title: string;
  image: string;
  note: string;
  onPress: () => void;
  showPlusButton?: boolean; // Nouveau prop pour afficher le bouton "plus"
  onPlusPress?: () => void; // Fonction lorsque le bouton "plus" est cliqué
}

const BookCard: React.FC<BookCardProps> = ({ title, image, note, onPress, showPlusButton, onPlusPress }) => {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image source={{ uri: image }} style={styles.bookImage} />
      <View style={styles.cardContent}>
        <Text style={styles.bookTitle}>{title}</Text>
        <Text style={styles.bookNote}>Note : {note}/10</Text>
        {showPlusButton && (
          <TouchableOpacity style={styles.plusButton} onPress={onPlusPress}>
            <Text style={styles.plusButtonText}>+</Text>
          </TouchableOpacity>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default BookCard;
