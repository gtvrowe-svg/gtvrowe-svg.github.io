// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyAlFzxCuBlLMbvc8tA9oyE3cuab48kcY5Y",
  authDomain: "balanco-financeiro-sr-sra-rowe.firebaseapp.com",
  projectId: "balanco-financeiro-sr-sra-rowe",
  storageBucket: "balanco-financeiro-sr-sra-rowe.firebasestorage.app",
  messagingSenderId: "504501207280",
  appId: "1:504501207280:web:d6e28d95ef274ce41c8235",
  measurementId: "G-56WPVR4J1F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
