// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; // Solo si usas analytics

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_FzL5ZitFQtszjM8Dw7FTgbUdGhQdCF4",
  authDomain: "tutoriallogin-9aa16.firebaseapp.com",
  projectId: "tutoriallogin-9aa16",
  storageBucket: "tutoriallogin-9aa16.appspot.com", // ← CORREGIDO
  messagingSenderId: "950649252639",
  appId: "1:950649252639:web:2c081f4c7018dcdea7de2a",
  measurementId: "G-MZZKJYPXCN"
};

// Initialize Firebase
const appFireBase = initializeApp(firebaseConfig);
export default appFireBase;
