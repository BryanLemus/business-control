// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtu5Z0wex-9T93TIXICJmOTKkHLu6zuJo",
  authDomain: "lfec-4d298.firebaseapp.com",
  projectId: "lfec-4d298",
  storageBucket: "lfec-4d298.appspot.com",
  messagingSenderId: "850558840967",
  appId: "1:850558840967:web:c6a4428f0d0c2b2103c822",
};
// Initialize Firebase

const app = initializeApp(firebaseConfig);
// Export firestore database
// It will be imported into your react app whenever it is needed
export const db = getFirestore(app);
