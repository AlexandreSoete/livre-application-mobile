// src/types/navigation.ts

export type RootStackParamList = {
  Profil: { userId: string; }; // Page pour voir un autre utilisateur
  Home: undefined;
  BookDetails: { id: string };
  Chat: { salonId: string; };
  Profile: { userId: string; username: string; avatar: string }; // Si besoin de visiter son propre profil
  MonProfil: undefined;
  EditProfil: undefined;
  PrivateChat: { userId: string };
  FriendSuggestions: undefined;
  Login: undefined;
  Register: undefined;
  Accueil: undefined;
};
