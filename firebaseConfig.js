import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from "firebase/auth";
import {
  getDatabase,
  ref,
  set,
  get,
  update,
  query,
  orderByChild,
  equalTo,
} from "firebase/database";
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
  auth = getAuth(app);
} else {
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
}

// Get Database instance
const database = getDatabase(app);

// Authentication methods
const signIn = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);
const signUp = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);
const resetPassword = (email) => auth.sendPasswordResetEmail(email);
const signOut = () => auth.signOut();

// Realtime Database methods
const getRooms = async () => {
  const roomsRef = ref(database, "rooms/");
  const snapshot = await get(roomsRef);
  if (snapshot.exists()) {
    return Object.keys(snapshot.val()).map((key) => ({
      id: key,
      ...snapshot.val()[key],
    }));
  } else {
    return []; // Return an empty array if no rooms found
  }
};

const getRoomById = async (id) => {
  const roomRef = ref(database, `rooms/${id}`);
  const snapshot = await get(roomRef);
  return snapshot.val();
};

const bookRoom = async (id, data) => {
  const bookingRef = ref(database, `rooms/${id}`);
  await update(bookingRef, data);
};

const getBookings = async (userId) => {
  const bookingsRef = query(
    ref(database, "bookings"),
    orderByChild("userId"),
    equalTo(userId)
  );
  const snapshot = await get(bookingsRef);
  return snapshot.val();
};

const submitComplaint = async (data) => {
  const newComplaintRef = ref(database, "complaints/");
  const newComplaintKey = push(newComplaintRef).key;
  await set(ref(database, `complaints/${newComplaintKey}`), data);
  return newComplaintKey;
};

const getComplaints = async () => {
  const complaintsRef = ref(database, "complaints/");
  const snapshot = await get(complaintsRef);
  return snapshot.val();
};

const updateComplaintStatus = async (id, status) => {
  const complaintRef = ref(database, `complaints/${id}`);
  await update(complaintRef, { status });
};

const updateRoomStatus = async (roomId, newStatus) => {
  const roomStatusRef = ref(database, `rooms/${roomId}/status`);
  try {
    await update(roomStatusRef, { status: newStatus });
    return { success: true };
  } catch (error) {
    console.error("Error updating room status:", error);
    return { success: false, error: error.message };
  }
};

export {
  app,
  auth,
  database,
  signIn,
  signUp,
  resetPassword,
  signOut,
  getRooms,
  getRoomById,
  bookRoom,
  getBookings,
  submitComplaint,
  getComplaints,
  updateComplaintStatus,
  updateRoomStatus,
};
