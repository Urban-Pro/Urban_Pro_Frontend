// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB6Xgi55mTqUi4kGIGJp8rDxKOoA4JwsJk",
    authDomain: "urbanproapp.firebaseapp.com",
    projectId: "urbanproapp",
    storageBucket: "urbanproapp.appspot.com",
    messagingSenderId: "735320953841",
    appId: "1:735320953841:web:e7dfa35b12dd042a336a50",
    measurementId: "G-M76BC05VQ5"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { storage, analytics };