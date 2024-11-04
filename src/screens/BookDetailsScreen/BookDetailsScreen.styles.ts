// src/screens/BookDetailsScreen/BookDetailsScreen.styles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f8f8',
  },
  bookImage: {
    width: '100%',
    height: 200,
    borderRadius: 10,
    marginBottom: 20,
  },
  bookInfoContainer: {
    marginBottom: 20,
  },
  bookTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookAuthor: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
  },
  bookDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  salonsContainer: {
    marginBottom: 20,
  },
  salonsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  salonButton: {
    padding: 12,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  salonButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  usersContainer: {
    marginTop: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2, // Pour Android
  },
  userAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 15,
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
