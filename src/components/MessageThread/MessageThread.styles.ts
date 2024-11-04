// src/components/MessageThread/MessageThread.styles.ts

import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
  },
  chatContainer: {
    flex: 1,
    marginBottom: 10,
  },
  messageRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  messageContent: {
    flex: 1,
    backgroundColor: '#f1f1f1',
    borderRadius: 10,
    padding: 10,
  },
  messageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  username: {
    fontWeight: 'bold',
  },
  date: {
    fontSize: 12,
    color: '#999',
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderColor: '#ccc',
    paddingTop: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 20,
    padding: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  emptyChat: {
    textAlign: 'center',
    fontSize: 16,
    color: '#999',
    marginTop: 20,
  },
});

export default styles;
