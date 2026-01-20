/**
 * Firebase-konfiguration och initialisering
 */

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Ersätt med dina egna Firebase-konfigurationsvärden
// Skapa ett projekt på https://console.firebase.google.com/
const firebaseConfig = {
  apiKey: "DIN_API_KEY",
  authDomain: "DIN_PROJECT_ID.firebaseapp.com",
  projectId: "DIN_PROJECT_ID",
  storageBucket: "DIN_PROJECT_ID.appspot.com",
  messagingSenderId: "DIN_SENDER_ID",
  appId: "DIN_APP_ID"
};

// Initialisera Firebase
const app = initializeApp(firebaseConfig);

// Exportera auth och firestore instanser
export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
