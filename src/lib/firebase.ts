
// src/lib/firebase.ts
import { initializeApp, getApps, getApp, type FirebaseOptions } from "firebase/app";
import { getAuth, connectAuthEmulator } from "firebase/auth";
import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { getStorage, connectStorageEmulator } from "firebase/storage";

const firebaseConfig: FirebaseOptions = {
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "demo-project",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789:web:abcdef",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "demo-project.appspot.com",
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDemo_Key_For_Development",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "demo-project.firebaseapp.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789",
};

// Check if we have valid Firebase config
const hasValidConfig = process.env.NEXT_PUBLIC_FIREBASE_API_KEY && 
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "your_api_key_here" &&
  process.env.NEXT_PUBLIC_FIREBASE_API_KEY !== "AIzaSyDemo_Key_For_Development";

const isDemoMode = !hasValidConfig;

if (isDemoMode) {
  console.warn("⚠️  Using demo Firebase config. Please set up your Firebase project in .env.local");
}


// Initialize Firebase
let app: any;
let auth: any;
let db: any;
let storage: any;

if (isDemoMode) {
  // Create mock Firebase services for demo mode
  console.log("🚀 Running in demo mode - Firebase calls will be mocked");
  
  // Mock auth service
  auth = {
    currentUser: null,
    onAuthStateChanged: (callback: (user: any) => void) => {
      callback(null);
      return () => {}; // unsubscribe function
    },
    signOut: () => Promise.resolve(),
    signInWithEmailAndPassword: () => Promise.reject(new Error("Demo mode - please configure Firebase")),
    createUserWithEmailAndPassword: () => Promise.reject(new Error("Demo mode - please configure Firebase")),
  };
  
  // Mock Firestore service
  db = {
    collection: () => ({
      getDocs: () => Promise.resolve({ docs: [] }),
      doc: () => ({
        get: () => Promise.resolve({ exists: false, data: () => null }),
        set: () => Promise.reject(new Error("Demo mode - please configure Firebase")),
        update: () => Promise.reject(new Error("Demo mode - please configure Firebase")),
      }),
    }),
  };
  
  // Mock Storage service
  storage = {
    ref: () => ({
      put: () => Promise.reject(new Error("Demo mode - please configure Firebase")),
      getDownloadURL: () => Promise.reject(new Error("Demo mode - please configure Firebase")),
    }),
  };
} else {
  try {
    app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
    auth = getAuth(app);
    db = getFirestore(app);
    storage = getStorage(app);
  } catch (error) {
    console.error("❌ Firebase initialization failed:", error);
    // Fallback to null objects
    auth = null;
    db = null;
    storage = null;
  }
}

export { auth, db, storage, isDemoMode };
