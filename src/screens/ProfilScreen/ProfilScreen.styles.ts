// src/screens/ProfilScreen/ProfilScreen.styles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  chatButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  acceptButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    marginRight: 10,
  },
  rejectButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#dc3545',
    padding: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
  friendRequestActions: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 10,
  },
  pendingText: {
    color: '#666',
    fontStyle: 'italic',
    marginTop: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  bookList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bookCardWrapper: {
    width: '48%',
    marginBottom: 15,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default styles;
