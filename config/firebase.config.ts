// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCbnhEgSxV8VWiOV6cmwPgG_TNQTu1OMQ0",
    authDomain: "e-vote-7f4d6.firebaseapp.com",
    projectId: "e-vote-7f4d6",
    storageBucket: "e-vote-7f4d6.appspot.com",
    messagingSenderId: "178509730006",
    appId: "1:178509730006:web:5383a4d290524812857977",
    measurementId: "G-KKN5WN5GVT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export { app }