// src/types/userTypes.ts

import { BookSummary } from "./bookTypes";

export interface User {
    id: string;
    username: string;
    pseudo: string;
    avatar: string;
    description?: string;
    commonPercentage?: number; // Optionnel, utilisé uniquement pour les suggestions d'amis
    subscribedBooks?: BookSummary[];
    favoriteBooks?: BookSummary[];
    relationStatus?: number;
  }
  