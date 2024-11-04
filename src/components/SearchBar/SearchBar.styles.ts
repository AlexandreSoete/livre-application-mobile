// src/components/SearchBar/SearchBar.styles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'relative', // Le conteneur principal doit être en position relative
    zIndex: 1, // Assurez-vous que la recherche est au-dessus des autres éléments
  },
  searchInput: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  resultsContainer: {
    position: 'absolute',
    top: 50, // Positionner sous le champ de recherche
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    maxHeight: 300, // Limiter la hauteur pour ne pas dépasser l'écran
    zIndex: 999, // Assurer que la liste soit toujours visible
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5, // Pour Android
  },
  bookCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  bookImage: {
    width: 50,
    height: 75,
    marginRight: 10,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  header: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
  },
  footer: {
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 10,
  },
});

export default styles;
