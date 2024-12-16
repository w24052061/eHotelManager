import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import { getDatabase } from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWELdHJnpLqMWGIZoBiCiuOQFpZukAqQ4",
  authDomain: "e-hotel-manager.firebaseapp.com",
  projectId: "e-hotel-manager",
  storageBucket: "e-hotel-manager.firebasestorage.app",
  messagingSenderId: "301876089939",
  appId: "1:301876089939:web:0c0e6182688f57041622a6",
  measurementId: "G-9T07MC283C",
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Auth
let auth;

if (Platform.OS === "web") {
  // On web, use default persistence
  auth = getAuth(app);
} else {
  // On mobile, use AsyncStorage for persistence
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Get Database instance
const database = getDatabase(app);

export { app, auth, database };
