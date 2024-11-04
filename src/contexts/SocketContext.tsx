// src/contexts/SocketContext.tsx
import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import io, { Socket } from 'socket.io-client';
import { useAuth } from './AuthContext'; // Importer le contexte Auth pour récupérer le token JWT

interface SocketContextProps {
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
}

const SocketContext = createContext<SocketContextProps | undefined>(undefined);

export const SocketProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { user, token } = useAuth(); // Récupérer l'utilisateur et le token JWT depuis le contexte Auth
  const [socket, setSocket] = useState<Socket | null>(null);

  useEffect(() => {
    // Si l'utilisateur est connecté, on établit la connexion socket
    if (user && token) {
      const socketInstance = io('http://192.168.1.33:3000', {
        auth: {
          token: `${token}`, // Envoyer le token JWT avec la connexion
        },
      });

      setSocket(socketInstance);

      socketInstance.on('connect', () => {
        console.log('Socket connecté:', socketInstance.id);
      });

      socketInstance.on('disconnect', () => {
        console.log('Socket déconnecté');
      });

      socketInstance.on('connect_error', (err: any) => {
        console.error('Erreur de connexion Socket:', err);
      });

      // Nettoyage : déconnecter le socket lorsque le composant est démonté ou que l'utilisateur se déconnecte
      return () => {
        socketInstance.disconnect();
        setSocket(null);
      };
    }
  }, [user, token]); // Ce useEffect s'exécute à chaque fois que l'utilisateur ou le token change

  return (
    <SocketContext.Provider value={{ socket, connectSocket: () => {}, disconnectSocket: () => {} }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return context;
};
