import { Message } from '../types/messageTypes';
import axios from '../utils/axios';

// S"abonner à un livre
export const getMessagesSalon = async (id: string): Promise<Message[]> => {
    try {
      const response = await axios.get<Message[]>(`/api/salons/${id}/messages`);
      return response.data;
    } catch (error) {
      console.error('Erreur lors de la récupération des messages de la conversation privée', error);
      throw error;
    }
  };


// S"abonner à un livre
export const sendMessageSalon = async (message: string, id: string): Promise<void> => {
try {
    const response = await axios.post<void>(`/api/salons/${id}/messages`, {text: message});
    return response.data;
} catch (error) {
    console.error('Erreur lors de la récupération des messages de la conversation privée', error);
    throw error;
}
};