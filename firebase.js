// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyD3vbrg6RsoxgqOJuXf71w_6bQkdcoUEGg",
    authDomain: "swiftwallet-7f75d.firebaseapp.com",
    projectId: "swiftwallet-7f75d",
    storageBucket: "swiftwallet-7f75d.appspot.com",
    messagingSenderId: "714472722020",
    appId: "1:714472722020:web:abc85b71eadd2613119971",
    measurementId: "G-20KDKBFMKS",
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

export default firebaseApp
export const auth = getAuth(firebaseApp)
export const db = getFirestore(firebaseApp)
