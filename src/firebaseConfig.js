import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, doc, setDoc, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBESlKEdOzPYoo2YUmYZAn3qolyYRO6PIc",
  authDomain: "fitness-tracker-3200c.firebaseapp.com",
  projectId: "fitness-tracker-3200c",
  storageBucket: "fitness-tracker-3200c.firebasestorage.app",
  messagingSenderId: "507309626830",
  appId: "1:507309626830:web:b4521393a5f616edaa879f",
  measurementId: "G-C0J4MQ455F"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, doc, setDoc, getDoc };
