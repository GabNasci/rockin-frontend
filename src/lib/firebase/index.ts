// lib/firebase.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Config do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDCEzwmLKD7d3EsuDFPMHQ8NzJXaKcNTGQ",
  authDomain: "rockin-f8344.firebaseapp.com",
  projectId: "rockin-f8344",
  storageBucket: "rockin-f8344.firebasestorage.app",
  messagingSenderId: "1031867961899",
  appId: "1:1031867961899:web:0be90134514e2a62c5d06e",
  measurementId: "G-LYEZS8BP4W",
};

// Garantir que o app só é inicializado uma vez
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

export { app, db };
