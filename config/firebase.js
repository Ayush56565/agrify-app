import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDeTP52ASiHEAupnQaROzgktwk_Z-4DJ9o",
    authDomain: "react-native-65379.firebaseapp.com",
    projectId: "react-native-65379",
    storageBucket: "react-native-65379.appspot.com",
    messagingSenderId: "88506030798",
    appId: "1:88506030798:web:5b19a06da9b1914568ce9f",
    measurementId: "G-PKNH2L2V37"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
export { app, auth }


// https://react-native-65379.firebaseapp.com/__/auth/handler
