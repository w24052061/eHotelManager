import { initializeApp } from "firebase/app";
import {
  getAuth,
  initializeAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut as firebaseSignOut,
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
  push,
  remove,
} from "firebase/database";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDWELdHJnpLqMWGIZoBiCiuOQFpZukAqQ4",
  authDomain: "e-hotel-manager.firebaseapp.com",
  databaseURL: "https://e-hotel-manager-default-rtdb.firebaseio.com",
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

const updateRoomDetails = async (roomId, data) => {
  const roomRef = ref(database, `rooms/${roomId}`);
  await update(roomRef, data);
};

// **Updated getBookings to fetch all bookings**
const getAllBookings = async () => {
  const bookingsRef = ref(database, "bookings/");
  const snapshot = await get(bookingsRef);
  if (snapshot.exists()) {
    return Object.keys(snapshot.val()).map((key) => ({
      id: key,
      ...snapshot.val()[key],
    }));
  } else {
    return [];
  }
};

// Optional: Keep original getBookings for user-specific bookings
const getBookingsByUser = async (userId) => {
  if (!userId) {
    throw new Error("User ID is undefined");
  }
  const bookingsRef = query(
    ref(database, "bookings"),
    orderByChild("userId"),
    equalTo(userId)
  );
  const snapshot = await get(bookingsRef);
  if (snapshot.exists()) {
    return Object.keys(snapshot.val()).map((key) => ({
      id: key,
      ...snapshot.val()[key],
    }));
  } else {
    return [];
  }
};

// Fetch all complaints sorted by createdAt descending
const getAllComplaints = async (): Promise<Complaint[]> => {
  const complaintsRef = query(
    ref(database, "complaints"),
    orderByChild("createdAt")
  );
  const snapshot = await get(complaintsRef);
  if (snapshot.exists()) {
    const complaintsObj = snapshot.val();
    const complaintsArray: Complaint[] = Object.keys(complaintsObj).map(
      (key) => ({
        id: key,
        ...complaintsObj[key],
      })
    );
    // Sort descending by createdAt
    complaintsArray.sort((b, a) => b.createdAt - a.createdAt);
    return complaintsArray;
  } else {
    return [];
  }
};

// Delete a complaint by ID
const deleteComplaint = async (complaintId: string): Promise<void> => {
  try {
    const complaintRef = ref(database, `complaints/${complaintId}`);
    await remove(complaintRef);
  } catch (error) {
    throw new Error("Failed to delete complaint: " + error);
  }
};

// Delete a User by ID
const deleteUser = async (UserId: string): Promise<void> => {
  try {
    const UserRef = ref(database, `users/${UserId}`);
    await remove(UserRef);
  } catch (error) {
    throw new Error("Failed to delete User: " + error);
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
  updateRoomDetails,
  getBookingsByUser,
  getAllBookings,
  getAllComplaints,
  deleteComplaint,
  deleteUser,
};
