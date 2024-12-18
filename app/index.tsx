import React, { useState, useEffect } from "react";
import { Redirect } from "expo-router";
import { hasCompletedOnboarding } from "../src/utils/onboardingStorage"; // Relative path
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppRedirector = () => {
  const [isLoading, setIsLoading] = useState(true); // State to handle loading
  const [hasCompleted, setHasCompleted] = useState(false); // Onboarding status
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login status

  // Check onboarding and login status
  useEffect(() => {
    const checkStatus = async () => {
      try {
        const onboardingStatus = await hasCompletedOnboarding();
        const userToken = await AsyncStorage.getItem("userToken"); // Replace "userToken" with your login token key
        setHasCompleted(onboardingStatus);
        setIsLoggedIn(!!userToken); // Check if the token exists
      } catch (error) {
        console.error("Error checking status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkStatus();
  }, []);

  // Show nothing while loading
  if (isLoading) {
    return null; // You can replace this with a loading spinner if needed
  }

  // Conditional redirects based on onboarding and login status
  if (!hasCompleted) {
    return <Redirect href="/onboarding/screen1" />;
  }

  if (isLoggedIn) {
    return <Redirect href="/auth/dashboard" />;
  }

  // If not logged in but onboarding is complete, redirect to a different page
  return <Redirect href="/page/coursepage" />;
};

export default AppRedirector;
