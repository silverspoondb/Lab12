// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyARbiPdY4OQVzgIJbKbnX8J5tr8IMKoZK0",
  authDomain: "week7-zhengran.firebaseapp.com",
  projectId: "week7-zhengran",
  storageBucket: "week7-zhengran.firebasestorage.app",
  messagingSenderId: "398484151508",
  appId: "1:398484151508:web:e741b3993737a4034d2f41"
};

initializeApp(firebaseConfig);
const db = getFirestore();
export default db;