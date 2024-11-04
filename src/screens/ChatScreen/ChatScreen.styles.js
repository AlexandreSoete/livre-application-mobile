// src/screens/ChatScreen/ChatScreen.styles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f8f8f8',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  messageRow: {
    flexDirection: 'row',
    marginVertical: 10,
    alignItems: 'flex-start',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  username: {
    fontWeight: 'bold',
    fontSize: 14,
    color: '#333',
  },
  date: {
    fontSize: 12,
    color: '#666',
  },
  messageText: {
    fontSize: 16,
    color: '#333',
    backgroundColor: '#e1f5fe',
    padding: 10,
    borderRadius: 10,
  },
  emptyChat: {
    fontSize: 16,
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
    marginTop: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderColor: '#ccc',
  },
  textInput: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
  },
  sendButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
    marginLeft: 10,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default styles;
