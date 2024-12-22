import React, { useState, useEffect } from "react";
import DashboardScreen from "@/screens/auth/DashboardScreen";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "@firebaseConfig";
import { useRouter } from "expo-router"; // Import the router

const DashboardTab = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Logged-in state
  const router = useRouter(); // Get router instance

  useEffect(() => {
    // Check if the user is logged in or not
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true); // If user is logged in, set the state to true
      } else {
        router.replace("/"); // Redirect to home if not logged in
      }
    });
  }, [router]); // Include router in the dependency array

  // Render the DashboardScreen only if the user is logged in
  return isLoggedIn ? <DashboardScreen /> : null; // Return null while waiting for auth check
};

export default DashboardTab;
