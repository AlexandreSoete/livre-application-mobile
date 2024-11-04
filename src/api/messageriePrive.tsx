import { Message } from '../types/messageTypes';
import axios from '../utils/axios';

// S"abonner à un livre
export const getMessagesPrive = async (id: string): Promise<Message[]> => {
    try {
      const response = await axios.get<Message[]>(`/api/private-chats/${id}/messages`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des messages de la conversation privée', error);
      throw error;
    }
  };


// S"abonner à un livre
export const sendMessagePrive = async (message: string, id: string): Promise<void> => {
try {
    const response = await axios.post<void>(`/api/private-chats/${id}/messages`, {text: message});
    return response.data;
} catch (error) {
    console.error('Erreur lors de la récupération des messages de la conversation privée', error);
    throw error;
}
};