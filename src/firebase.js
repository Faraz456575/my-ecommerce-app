/*
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, onSnapshot } from "firebase/firestore";

// Your Firebase config (replace with your own credentials)
const firebaseConfig = {
  apiKey: "AIzaSyDK6DdLHvxegb_IflgFeWXrGIOYl_g_3Zk",
  authDomain: "website-arabian.firebaseapp.com",
  projectId: "website-arabian",
  storageBucket: "website-arabian.firebasestorage.app",
  messagingSenderId: "808485065587",
  appId: "1:808485065587:web:92d686dc02c5d136366b06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection, addDoc, onSnapshot ,  };
*/

/* 2nd
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from "firebase/firestore";  // Add query and orderBy

// Your Firebase config (replace with your own credentials)
const firebaseConfig = {
  apiKey: "AIzaSyDK6DdLHvxegb_IflgFeWXrGIOYl_g_3Zk",
  authDomain: "website-arabian.firebaseapp.com",
  projectId: "website-arabian",
  storageBucket: "website-arabian.firebasestorage.app",
  messagingSenderId: "808485065587",
  appId: "1:808485065587:web:92d686dc02c5d136366b06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db, collection, addDoc, onSnapshot, query, orderBy };  // Export query and orderBy

*/
// Import necessary Firebase SDK components
// firebase.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  onSnapshot, 
  query, 
  orderBy, 
  doc, 
  updateDoc, 
  deleteDoc // Ensure deleteDoc is added if you're using it
} from "firebase/firestore";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyDK6DdLHvxegb_IflgFeWXrGIOYl_g_3Zk",
  authDomain: "website-arabian.firebaseapp.com",
  projectId: "website-arabian",
  storageBucket: "website-arabian.firebasestorage.app",
  messagingSenderId: "808485065587",
  appId: "1:808485065587:web:92d686dc02c5d136366b06"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase Auth instance
const auth = getAuth(app);

// Initialize Firestore
const db = getFirestore(app);

// Export necessary Firebase methods
export { auth, db, collection, getDocs, addDoc, onSnapshot, query, orderBy, doc, updateDoc, deleteDoc };
