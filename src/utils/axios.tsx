console.log("Axios instance créée");
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

// Créer une instance axios
const axiosInstance = axios.create({
    baseURL: 'https://livres.alexandre-soete.fr', // URL de base de votre API
    //baseURL: 'https://127.0.0.1:8000', // URL de base de votre API
  });

  //axiosInstance.defaults.headers.common['authorization'] = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE3MjkzNTY4NjgsImV4cCI6MTcyOTM2MDQ2OCwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoiY29udGFjdEBhbGV4YW5kcmUtc29ldGUuZnIifQ.YWzT99jFdG2npgwZgMrZbB7HDDv0MD_EtZgouiMdDUj3QjTNHZ97rmOAsEZwLv9gb3O1A8pjfus4UIv_xVLIOZRcZ2Rak-VD8Kx2qYjsoFCDPB4B8pQwUeps0pQUo4BGeZcIBD390Ykfc-ksc_V5z9jqvI9WUCtsX-Ps6f9oG3qIolkHyD8-FhporRQ8V-6qVWliNyylOuLnii8mouveGclx6TUPxYKV4HkUJueGpCaI1U6heRxkQGBYh4aJuN1ZfZlC9dA_B_x7OeiAzIWDGhfStFlSnPC8HlGSfU-NmiVM5aFeMb9sR4FmfgVAuf9aOj4pNGbImKk6e_WCHFbAug';
  
  // Intercepteur pour logger les requêtes
  axiosInstance.interceptors.request.use(
    async (config) => {
      if(!config.headers['authorization']){
        const token = await AsyncStorage.getItem('token'); // si on le trouve pas dans le stats, on regarde dans storage
        if(token){
          config.headers.Authorization = "Bearer " + token;
        }
      }
      return config;
    },
    (error) => {
      console.error('Request error:', error);
      return Promise.reject(error);
    }
  );
  
  // Intercepteur pour logger les réponses
  axiosInstance.interceptors.response.use(
    (response) => {
      console.log("Données de la réponse :", response.data);
      //console.log('Response:', response); // Log de la réponse
      return response;
    },
    (error) => {
      if (error.response) {
        // Si l'API a renvoyé une réponse (même en erreur)
        //console.log("Erreur de la réponse API :", error.response);
        console.log("Code d'erreur :", error.response.status);  // Par exemple 401
        console.log("Données de la réponse d'erreur :", error.response.data);  // Détails de l'erreur (message)
        console.log("En-têtes de la réponse d'erreur :", error.response.headers);
      } else if (error.request) {
        // Si la requête a été envoyée mais aucune réponse n'a été reçue
        console.log("Aucune réponse reçue :", error.request);
      } else {
        // Erreur lors de la configuration de la requête
        console.log("Erreur lors de la requête :", error.message);
      }
      return Promise.reject(error);
    }
  );

  export const setAuthToken = (token: string | null) => {
    console.log(`Bearer ${token}`)
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
    }
  };
  
  export default axiosInstance;