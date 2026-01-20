// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth';
import { getFirestore, serverTimestamp } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyA8LW3otQqPheWUGgasGFnRfo2tD0SgQzM",
    authDomain: "ecoguard-ai-5b602.firebaseapp.com",
    projectId: "ecoguard-ai-5b602",
    storageBucket: "ecoguard-ai-5b602.firebasestorage.app",
    messagingSenderId: "672962245666",
    appId: "1:672962245666:web:2be72f5f2dd0b0dcdb467b",
    measurementId: "G-TZN9S1LMWZ"
};
// Initialize Firebase
let app;
let auth;
let db;
let analytics;

// Hanya initialize di client side (browser)
if (typeof window !== 'undefined') {
    try {
        app = initializeApp(firebaseConfig);
        auth = getAuth(app);
        db = getFirestore(app);
        analytics = getAnalytics(app);
        console.log('✅ Firebase initialized successfully');
    } catch (error) {
        console.error('❌ Firebase initialization error:', error);
    }
}

// Google Auth Provider
const googleProvider = new GoogleAuthProvider();

// Export everything
export {
    auth,
    db,
    googleProvider,
    signInWithPopup,
    signOut,
    serverTimestamp,
    GoogleAuthProvider
};
export default app;