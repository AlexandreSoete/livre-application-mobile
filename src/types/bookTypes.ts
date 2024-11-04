// src/types/bookTypes.ts
import {User} from "./userTypes";

import {Author } from "./authorTypes";

// Type pour la liste légère des livres (résumé)
export interface BookSummary {
  id: string;
  title: string;
  photo: string;
  note: string;
}

// Type pour les détails complets d'un livre
export interface Book extends BookSummary {
  id: string,
  author: Author;
  description: string;
  salons: { id: string; name: string }[];
  note: string;
  photo: string;
  users: User[];
}
