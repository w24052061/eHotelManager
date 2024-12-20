import React, { useState, useEffect } from "react";
import { Redirect } from "expo-router";
import { hasCompletedOnboarding } from "@/utils/onboardingStorage"; // Using alias
import AsyncStorage from "@react-native-async-storage/async-storage";

const AppRedirector = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasCompleted, setHasCompleted] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkStatus = async () => {
      try {
        const onboardingStatus = await hasCompletedOnboarding();
        const userToken = await AsyncStorage.getItem("userToken");
        setHasCompleted(onboardingStatus);
        setIsLoggedIn(!!userToken);
      } catch (error) {
        console.error("Error checking status:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkStatus();
  }, []);

  // While loading
  if (isLoading) {
    return <></>; // Optionally show a loading spinner
  }

  // Redirect based on status

  if (!hasCompleted) {
    return <Redirect href="/onboarding/onBoardingScreen1" />;
  }

  if (isLoggedIn) {
    return <Redirect href="/Dashboard" />;
  }

  return <Redirect href="/page/HomePage" />;
  // return <Redirect href="/onboarding/onBoardingScreen1" />;
};


export default AppRedirector;