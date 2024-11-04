// src/components/BookCard/bookcard.styles.ts
import { StyleSheet, Dimensions } from 'react-native';

// Calculer la largeur de l'écran pour adapter les cartes
const screenWidth = Dimensions.get('window').width;
const cardWidth = (screenWidth / 2) - 30; // Diviser en 2 colonnes, en prenant en compte la marge

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
    margin: 10,
    width: cardWidth, // Fixer la largeur des cartes à environ 45% de l'écran
    alignItems: 'center',
  },
  bookImage: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  cardContent: {
    padding: 10,
    alignItems: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    textAlign: 'center',
  },
  bookNote: {
    fontSize: 14,
    color: '#666',
  },
  plusButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
    marginTop: 10,
  },
  plusButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default styles;
